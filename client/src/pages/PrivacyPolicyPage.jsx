import React from 'react';

function PrivacyPolicyPage() {
  return (
    <div className="page legal-page">
      <section className="section">
        <h1>Privacy Policy</h1>
        <p className="small-note">Last updated: {new Date().getFullYear()}</p>

        <p>
          This Privacy Policy explains how we collect, use, and protect information for the Service, which helps healthcare
          professionals manage their own Google Business Profiles using official APIs.
        </p>

        <h2>Use of Google Business Profile APIs</h2>
        <p>
          <strong>
            We use Google Business Profile APIs only with your OAuth consent. Access is revocable at any time.
          </strong>
        </p>
        <p>We request only the minimum scopes needed to:</p>
        <ul>
          <li>Read and update your location info (hours, description, services).</li>
          <li>Publish posts on your behalf.</li>
          <li>Read reviews for monitoring (read-only).</li>
        </ul>

        <h2>Information we collect</h2>
        <ul>
          <li>
            <strong>Account information:</strong> Basic contact details you provide.
          </li>
          <li>
            <strong>Google account data:</strong> OAuth tokens and location data returned by the APIs.
          </li>
          <li>
            <strong>Usage data:</strong> Basic usage signals to maintain the Service.
          </li>
          <li>
            <strong>Public review content:</strong> Public review text and ratings you view.
          </li>
        </ul>

        <h2>How we use data</h2>
        <p>We use data only to operate the Service, including to:</p>
        <ul>
          <li>Display and manage your Google Business Profile locations and related information.</li>
          <li>Allow you to create or update your business information and posts.</li>
          <li>Show you reviews in a read-only interface.</li>
          <li>Securely maintain your session.</li>
        </ul>
        <p>
          We do <strong>not</strong> use your data for ads, selling data, or review manipulation.
        </p>

        <h2>Automation and AI-assisted content</h2>
        <p>
          If you enable AI-assisted drafts, we use your inputs to draft content for your review. You approve content before
          publishing.
        </p>

        <h2>Data storage and security</h2>
        <ul>
          <li>Tokens are stored securely and encrypted at rest.</li>
          <li>Access can be revoked in the dashboard or Google Account settings.</li>
        </ul>

        <h2>Retention and deletion</h2>
        <p>
          We retain data only as long as needed for the Service and legal obligations. Request deletion or export via Support.
        </p>

        <h2>Data sharing</h2>
        <p>
          We do not sell or rent your data. We share data only as required by law or to operate the Service.
        </p>

        <h2>Your choices</h2>
        <ul>
          <li>Disconnect your Business Profile at any time.</li>
          <li>Revoke access in your Google Account security settings.</li>
          <li>Contact Support with privacy questions.</li>
        </ul>

        <h2>Regional compliance (India)</h2>
        <p>
          If you are in India, we process personal data under the Digital Personal Data Protection Act, 2023.
        </p>
      </section>
    </div>
  );
}

export default PrivacyPolicyPage;

