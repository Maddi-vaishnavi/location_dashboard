import React from 'react';

function PrivacyPolicyPage() {
  return (
    <div className="page legal-page">
      <section className="section">
        <h1>Privacy Policy</h1>
        <p className="small-note">Last updated: {new Date().getFullYear()}</p>

        <p>
          This Privacy Policy explains how we collect, use, and protect information in connection with our Google Business
          Profile management platform (the &quot;Service&quot;). The Service is designed for small and mid-sized businesses to
          manage their own Google Business Profiles on Google Search and Maps using official Google Business Profile APIs.
        </p>

        <h2>Use of Google Business Profile APIs</h2>
        <p>
          <strong>
            We use Google Business Profile APIs to manage business listings on behalf of authorized business owners. Access is
            granted via Google OAuth and can be revoked at any time. We do not sell, share, or misuse Google user data.
          </strong>
        </p>
        <p>
          All access to Google data is granted directly by you through Google&apos;s OAuth 2.0 consent screen. We request only
          the minimum scopes required to:
        </p>
        <ul>
          <li>Read and update your own business location information (such as hours, description, and services).</li>
          <li>Publish Google Business Profile posts on your behalf.</li>
          <li>Read reviews for your locations for monitoring and analysis (read-only).</li>
        </ul>

        <h2>Information we collect</h2>
        <ul>
          <li>
            <strong>Account information:</strong> When you sign up, we collect basic contact details such as your email
            address.
          </li>
          <li>
            <strong>Google account data:</strong> When you connect your Google Business Profile, we receive OAuth tokens and
            data returned by the Google Business Profile APIs related to your locations.
          </li>
          <li>
            <strong>Usage data:</strong> We may collect basic information about how you use the Service (for example, which
            sections you access) to maintain and improve the platform.
          </li>
        </ul>

        <h2>How we use data</h2>
        <p>We use the data we collect solely to operate and improve the Service, including to:</p>
        <ul>
          <li>Display and manage your Google Business Profile locations and related information.</li>
          <li>Allow you to create or update your business information and posts.</li>
          <li>Show you reviews in a read-only interface.</li>
          <li>Securely maintain your authenticated session.</li>
        </ul>
        <p>
          We do <strong>not</strong> use your Google data for advertising, selling data, review manipulation, or any activity
          that violates Google&apos;s API policies.
        </p>

        <h2>Data storage and security</h2>
        <ul>
          <li>Access and refresh tokens are stored securely and encrypted at rest.</li>
          <li>We do not store Google tokens or sensitive data in plaintext.</li>
          <li>Access can be revoked at any time by disconnecting within the dashboard or via your Google Account settings.</li>
        </ul>

        <h2>Data sharing</h2>
        <p>
          We do not sell or rent your data. We do not provide Google user data to third parties except as required by law or as
          necessary to operate the Service (for example, with infrastructure providers that are bound by appropriate data
          protection obligations).
        </p>

        <h2>Your choices</h2>
        <ul>
          <li>You may disconnect your Google Business Profile at any time from within the Service.</li>
          <li>
            You may revoke our access to your Google account at any time via your Google Account security settings (third-party
            access).
          </li>
          <li>You may contact us via the Contact / Support page with any privacy-related questions.</li>
        </ul>
      </section>
    </div>
  );
}

export default PrivacyPolicyPage;

