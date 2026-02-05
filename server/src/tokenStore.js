import crypto from 'node:crypto';
import { config } from './config.js';

// Simple in-memory token store for demo / approval purposes.
// In a production deployment this SHOULD be backed by a database,
// but tokens must still be encrypted at rest and never stored as plaintext.

const userTokens = new Map();

function getCipher() {
  if (!config.tokenEncryptionKey || config.tokenEncryptionKey.length < 32) {
    // For safety, we refuse to operate without a sufficiently long key.
    throw new Error('TOKEN_ENCRYPTION_KEY must be set to a 32+ character random string');
  }
  // Derive a 32-byte key from the provided secret.
  const key = crypto.createHash('sha256').update(config.tokenEncryptionKey).digest();
  return { key };
}

export function encryptToken(raw) {
  const { key } = getCipher();
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  const encrypted = Buffer.concat([cipher.update(raw, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  return Buffer.concat([iv, tag, encrypted]).toString('base64');
}

export function decryptToken(payload) {
  const { key } = getCipher();
  const buf = Buffer.from(payload, 'base64');
  const iv = buf.subarray(0, 12);
  const tag = buf.subarray(12, 28);
  const ciphertext = buf.subarray(28);
  const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
  decipher.setAuthTag(tag);
  const decrypted = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
  return decrypted.toString('utf8');
}

export function saveUserTokens(userId, tokens) {
  // tokens: { accessToken, refreshToken, expiryDate, scope }
  const record = {
    accessToken: encryptToken(tokens.accessToken),
    refreshToken: tokens.refreshToken ? encryptToken(tokens.refreshToken) : null,
    expiryDate: tokens.expiryDate || null,
    scope: tokens.scope || ''
  };
  userTokens.set(userId, record);
}

export function getUserTokens(userId) {
  const stored = userTokens.get(userId);
  if (!stored) return null;
  return {
    accessToken: decryptToken(stored.accessToken),
    refreshToken: stored.refreshToken ? decryptToken(stored.refreshToken) : null,
    expiryDate: stored.expiryDate,
    scope: stored.scope
  };
}

export function clearUserTokens(userId) {
  userTokens.delete(userId);
}

// NOTE (Compliance):
// - Access and refresh tokens are encrypted using AES-256-GCM before storage.
// - Tokens are used ONLY to call official Google Business Profile APIs
//   on behalf of the authenticated business owner.
// - We never persist Google tokens in plaintext or use them for advertising,
//   review manipulation, or any unrelated Google services.
