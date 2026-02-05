import express from 'express';
import cors from 'cors';
import cookieSession from 'cookie-session';
import { config } from './config.js';
import { createRouter } from './routes.js';

const app = express();

app.use(
  cors({
    origin: config.clientOrigin,
    credentials: true
  })
);

app.use(express.json());

app.use(
  cookieSession({
    name: 'gmb_session',
    secret: config.sessionSecret,
    httpOnly: true,
    sameSite: 'lax',
    secure: config.appEnvironment === 'production'
  })
);

// Simple health / info endpoint for reviewers.
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Google Business Profile management backend',
    environment: config.appEnvironment,
    notes:
      'This service uses the official Google Business Profile APIs on behalf of authorized business owners. Access is granted via OAuth and can be revoked at any time.'
  });
});

// Attach main application routes under /api
app.use('/api', createRouter());

app.listen(config.port, () => {
  console.log(
    `GBP management backend listening on port ${config.port} (environment=${config.appEnvironment})`
  );
});

// NOTE (Compliance):
// - This backend exists solely to help verified business owners manage their own
//   Google Business Profiles (locations, posts, and basic information).
// - It does not scrape Google, automate reviews, or interact with Ads APIs.
// - All Google access is obtained via OAuth 2.0 and can be revoked at any time.

