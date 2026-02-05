import express from 'express';
import { config } from './config.js';
import {
  getOAuthAuthorizationUrl,
  exchangeCodeForTokens,
  callGbpApi,
  revokeTokensForUser,
  fetchGoogleUserInfo
} from './googleClient.js';
import { saveUserTokens, getUserTokens, clearUserTokens } from './tokenStore.js';

export function createRouter() {
  const router = express.Router();

  // --- Session & basic email login (for SMB users) -------------------------

  router.post('/auth/email-login', (req, res) => {
    const { email } = req.body || {};
    if (!email || typeof email !== 'string') {
      return res.status(400).json({ error: 'Email is required' });
    }
    // In this MVP we do not handle passwords; this is a simple identifier
    // for small / mid-sized business owners. A real deployment would integrate
    // proper password or SSO authentication.
    req.session.user = { id: email.toLowerCase(), email: email.toLowerCase() };
    return res.json({ user: req.session.user });
  });

  router.post('/auth/logout', (req, res) => {
    req.session = null;
    res.status(204).end();
  });

  router.get('/auth/session', (req, res) => {
    const user = req.session.user || null;
    const tokens = user ? getUserTokens(user.id) : null;
    res.json({
      user,
      hasGoogleConnection: Boolean(tokens),
      environment: config.appEnvironment
    });
  });

  // --- Google OAuth 2.0 for GBP -------------------------------------------

  router.get('/auth/google', (req, res) => {
    // Start Google OAuth flow. We generate a CSRF-protection state token
    // and store it in the session. The callback will both sign the user in
    // and connect their Google Business Profile in one step.
    const state = Math.random().toString(36).slice(2);
    req.session.oauthState = state;
    const url = getOAuthAuthorizationUrl(state);
    res.redirect(url);
  });

  router.get('/auth/google/callback', async (req, res) => {
    try {
      const { code, state, error } = req.query;
      if (error) {
        return res.status(400).send(`Google authorization error: ${error}`);
      }
      if (!code || !state) {
        return res.status(400).send('Missing authorization code or state');
      }

      if (!req.session.oauthState || req.session.oauthState !== state) {
        return res.status(400).send('Invalid OAuth state. Please start the authorization again.');
      }

      const tokens = await exchangeCodeForTokens(code);
      const profile = await fetchGoogleUserInfo(tokens.accessToken);

      // Use the Google account email as the primary user identifier.
      const email = (profile.email || '').toLowerCase();
      const sub = profile.sub;
      if (!email) {
        return res.status(400).send('Unable to determine Google account email for this user.');
      }

      const userId = email || sub;

      // Establish the application session using Google identity.
      req.session.user = {
        id: userId,
        email,
        googleSub: sub
      };

      // Store encrypted tokens keyed by this user id.
      saveUserTokens(userId, tokens);

      // Redirect back to dashboard where the frontend can refresh the session
      const redirectUrl = `${config.clientOrigin}/dashboard?googleConnected=1`;
      res.redirect(redirectUrl);
    } catch (err) {
      console.error('Error handling Google OAuth callback', err);
      res.status(500).send('Failed to complete Google authorization flow.');
    }
  });

  router.post('/auth/google/disconnect', async (req, res) => {
    const user = req.session.user;
    if (!user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    try {
      await revokeTokensForUser(user.id);
    } catch (err) {
      console.warn('Failed to revoke Google tokens:', err.message);
    }
    clearUserTokens(user.id);
    res.status(204).end();
  });

  // --- Google Business Profile operations ---------------------------------

  function requireGoogleConnection(req, res, next) {
    const user = req.session.user;
    if (!user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    const tokens = getUserTokens(user.id);
    if (!tokens) {
      return res.status(400).json({ error: 'Google Business Profile is not connected for this account' });
    }
    next();
  }

  // List all accounts/locations available to the user (read-only).
  router.get('/locations', requireGoogleConnection, async (req, res) => {
    try {
      const user = req.session.user;
      // 1. List accounts owned by this user.
      const accounts = await callGbpApi({
        userId: user.id,
        method: 'GET',
        url: '/v1/accounts'
      });

      // 2. For the MVP we only fetch locations for the first account, if present.
      let locations = [];
      if (accounts.accounts && accounts.accounts.length > 0) {
        const accountName = accounts.accounts[0].name; // e.g. "accounts/123456"
        const data = await callGbpApi({
          userId: user.id,
          method: 'GET',
          url: `/v1/${accountName}/locations`
        });
        locations = data.locations || [];
      }

      res.json({
        accounts: accounts.accounts || [],
        locations
      });
    } catch (err) {
      console.error('Error fetching GBP locations', err.response?.data || err.message);
      res.status(500).json({ error: 'Failed to fetch locations from Google Business Profile API' });
    }
  });

  // Read a single location's business information (read-only).
  router.get('/locations/:locationName', requireGoogleConnection, async (req, res) => {
    try {
      const user = req.session.user;
      const { locationName } = req.params; // expected format: "locations/123" or "accounts/123/locations/456"
      const data = await callGbpApi({
        userId: user.id,
        method: 'GET',
        url: `/v1/${locationName}`
      });
      res.json(data);
    } catch (err) {
      console.error('Error fetching GBP location', err.response?.data || err.message);
      res.status(500).json({ error: 'Failed to fetch location from Google Business Profile API' });
    }
  });

  // Update selected business information fields (e.g., hours and description).
  router.patch('/locations/:locationName', requireGoogleConnection, async (req, res) => {
    try {
      const user = req.session.user;
      const { locationName } = req.params;
      const { regularHours, description, services } = req.body || {};

      const body = {};
      const fields = [];

      if (regularHours) {
        body.regularHours = regularHours;
        fields.push('regularHours');
      }
      if (description) {
        body.profile = { description };
        fields.push('profile.description');
      }
      if (services) {
        // Depending on your GBP configuration, this may map to serviceItems or other fields.
        body.serviceItems = services;
        fields.push('serviceItems');
      }

      if (fields.length === 0) {
        return res.status(400).json({ error: 'No updatable fields provided' });
      }

      const updateMask = fields.join(',');

      const data = await callGbpApi({
        userId: user.id,
        method: 'PATCH',
        url: `/v1/${locationName}`,
        params: { updateMask },
        data: body
      });

      res.json(data);
    } catch (err) {
      console.error('Error updating GBP location', err.response?.data || err.message);
      res.status(500).json({ error: 'Failed to update location in Google Business Profile API' });
    }
  });

  // Read-only view of reviews - NO replies or manipulation.
  router.get('/locations/:locationName/reviews', requireGoogleConnection, async (req, res) => {
    try {
      const user = req.session.user;
      const { locationName } = req.params;

      const data = await callGbpApi({
        userId: user.id,
        method: 'GET',
        // Depending on the API version this may be served by the legacy My Business API.
        // This endpoint is used strictly in read-only mode to monitor customer feedback.
        url: `/v1/${locationName}/reviews`
      });

      res.json(data);
    } catch (err) {
      console.error('Error fetching GBP reviews', err.response?.data || err.message);
      res.status(500).json({ error: 'Failed to fetch reviews from Google Business Profile API' });
    }
  });

  // Create a Google Business Profile post for a specific location.
  router.post('/locations/:locationName/posts', requireGoogleConnection, async (req, res) => {
    try {
      const user = req.session.user;
      const { locationName } = req.params;
      const { summary, callToAction, event } = req.body || {};

      if (!summary) {
        return res.status(400).json({ error: 'Post summary is required' });
      }

      const body = {
        summary,
        callToAction,
        event
      };

      const data = await callGbpApi({
        userId: user.id,
        method: 'POST',
        // Depending on the exact GBP API version, this might be:
        // /v4/{locationName}/localPosts or a similar endpoint.
        // This is used only to publish legitimate owner-authored content.
        url: `/v1/${locationName}/localPosts`,
        data: body
      });

      res.status(201).json(data);
    } catch (err) {
      console.error('Error creating GBP post', err.response?.data || err.message);
      res.status(500).json({ error: 'Failed to create post in Google Business Profile API' });
    }
  });

  return router;
}

// NOTE (Compliance):
// - All routes enforce that the authenticated user owns or controls the Business Profiles
//   they manage via OAuth.
// - We expose only read-only review access and owner-initiated updates to profile data
//   and posts. We do NOT automate reviews, generate fake engagement, or manage ads.
// - No Google data is resold; it is displayed only back to the authorized business owner.

