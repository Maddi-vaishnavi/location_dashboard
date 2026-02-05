import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Load a single shared .env file from the repository root so that
// both frontend (via Vite proxy) and backend use the same configuration.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, '../../.env')
});

export const config = {
  port: process.env.PORT ? Number(process.env.PORT) : 4000,
  clientOrigin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  sessionSecret: process.env.SESSION_SECRET || 'change-me-in-production',
  googleClientId: process.env.GOOGLE_CLIENT_ID || '',
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  googleRedirectUri: process.env.GOOGLE_REDIRECT_URI || 'http://localhost:4000/api/auth/google/callback',
  gbpApiBaseUrl: process.env.GBP_API_BASE_URL || 'https://mybusinessbusinessinformation.googleapis.com',
  gbpAccountsApiBaseUrl:
    process.env.GBP_ACCOUNTS_API_BASE_URL || 'https://mybusinessaccountmanagement.googleapis.com',
  tokenEncryptionKey: process.env.TOKEN_ENCRYPTION_KEY || '',
  appEnvironment: process.env.APP_ENVIRONMENT || process.env.NODE_ENV || 'development'
};

// NOTE (Compliance):
// This configuration is intentionally minimal and limited to what is required
// for Google Business Profile management. Do NOT add unrelated scopes or
// services here (e.g., Ads APIs, review automation, scraping endpoints).
