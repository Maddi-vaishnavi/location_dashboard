import axios from 'axios';
import { config } from './config.js';
import { getUserTokens, saveUserTokens } from './tokenStore.js';

const TOKEN_ENDPOINT = 'https://oauth2.googleapis.com/token';
const REVOKE_ENDPOINT = 'https://oauth2.googleapis.com/revoke';

export const GBP_SCOPE = 'https://www.googleapis.com/auth/business.manage';

const USERINFO_ENDPOINT = 'https://openidconnect.googleapis.com/v1/userinfo';

export function getOAuthAuthorizationUrl(state) {
  const params = new URLSearchParams({
    client_id: config.googleClientId,
    redirect_uri: config.googleRedirectUri,
    response_type: 'code',
    access_type: 'offline',
    prompt: 'consent',
    scope: [
      'openid',
      'email',
      'profile',
      GBP_SCOPE
    ].join(' '),
    state
  });

  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
}

export async function exchangeCodeForTokens(code) {
  const body = new URLSearchParams({
    code,
    client_id: config.googleClientId,
    client_secret: config.googleClientSecret,
    redirect_uri: config.googleRedirectUri,
    grant_type: 'authorization_code'
  });

  const { data } = await axios.post(TOKEN_ENDPOINT, body.toString(), {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  });

  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    expiryDate: data.expires_in ? Date.now() + data.expires_in * 1000 : null,
    scope: data.scope || ''
  };
}

export async function refreshAccessToken(userId) {
  const existing = getUserTokens(userId);
  if (!existing?.refreshToken) {
    throw new Error('No refresh token available');
  }

  const body = new URLSearchParams({
    client_id: config.googleClientId,
    client_secret: config.googleClientSecret,
    refresh_token: existing.refreshToken,
    grant_type: 'refresh_token'
  });

  const { data } = await axios.post(TOKEN_ENDPOINT, body.toString(), {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  });

  const updated = {
    accessToken: data.access_token,
    refreshToken: existing.refreshToken,
    expiryDate: data.expires_in ? Date.now() + data.expires_in * 1000 : existing.expiryDate,
    scope: data.scope || existing.scope
  };
  saveUserTokens(userId, updated);
  return updated;
}

export async function fetchGoogleUserInfo(accessToken) {
  const { data } = await axios.get(USERINFO_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  // Expected fields include sub, email, email_verified, name, picture, etc.
  return data;
}

export async function revokeTokensForUser(userId) {
  const existing = getUserTokens(userId);
  if (!existing) return;
  try {
    // Revoke by access token; if that fails, fall back to refresh token.
    await axios.post(REVOKE_ENDPOINT, new URLSearchParams({ token: existing.accessToken }).toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
  } catch {
    if (existing.refreshToken) {
      await axios.post(REVOKE_ENDPOINT, new URLSearchParams({ token: existing.refreshToken }).toString(), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });
    }
  }
}

async function getValidAccessToken(userId) {
  const stored = getUserTokens(userId);
  if (!stored) {
    throw new Error('No Google Business Profile authorization for this user');
  }
  if (!stored.expiryDate || stored.expiryDate - Date.now() > 60_000) {
    return stored.accessToken;
  }
  const refreshed = await refreshAccessToken(userId);
  return refreshed.accessToken;
}

export async function callGbpApi({ userId, method, url, params, data }) {
  const accessToken = await getValidAccessToken(userId);
  const base =
    url.startsWith('/accounts') || url.startsWith('/v1/accounts')
      ? config.gbpAccountsApiBaseUrl
      : config.gbpApiBaseUrl;

  const fullUrl = `${base}${url}`;

  const response = await axios.request({
    method,
    url: fullUrl,
    params,
    data,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  });

  return response.data;
}

// NOTE (Compliance):
// All outbound requests from this client go ONLY to official Google OAuth
// endpoints and Google Business Profile APIs. We never call scraping services
// or automate review content, fake engagement, or advertising workflows.
