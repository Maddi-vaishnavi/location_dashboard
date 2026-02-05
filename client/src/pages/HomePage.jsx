import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="page">
      <section className="page-hero">
        <div>
          <span className="eyebrow">
            <span className="eyebrow-dot" />
            Google Business Profile Management for SMBs
          </span>
          <h1 className="hero-title">
            <span className="hero-gradient">Trusted Google Business Profile manager</span> for Search &amp; Maps.
          </h1>
          <p className="hero-subtitle">
            A focused platform for <strong>small and mid-sized businesses</strong> to securely manage their own{' '}
            <strong>Google Business Profiles</strong> on Google Search and Maps using the{' '}
            <strong>official Google Business Profile APIs</strong>. No scraping, no tricks – just policy-aligned profile
            management.
          </p>
          <div className="hero-actions">
            <Link to="/dashboard" className="button button-primary">
              Open secure dashboard
            </Link>
            <Link to="/features" className="button button-ghost">
              View all features
            </Link>
          </div>
          <p className="hero-footnote">
            <strong>Compliance first:</strong> access is granted via Google OAuth 2.0 only, can be revoked at any time, and is
            used solely to help you manage your own listings.
          </p>
        </div>
        <div className="hero-card">
          <div className="hero-card-header">
            <div>
              <div className="hero-card-title">Google Business Profile overview</div>
              <div style={{ fontSize: '0.8rem', color: '#9ca3af' }}>Example of location data managed through the API</div>
            </div>
            <span className="hero-card-chip">Official GBP API only</span>
          </div>
          <div className="hero-card-body">
            <div className="card">
              <div className="card-title">Maps &amp; Search listing</div>
              <div className="card-subtitle">Key information kept in sync with your business.</div>
              <ul className="list">
                <li className="list-item">
                  <span className="list-bullet">✓</span>
                  <div>
                    <strong>Business hours</strong> – keep opening and special hours up to date.
                  </div>
                </li>
                <li className="list-item">
                  <span className="list-bullet">✓</span>
                  <div>
                    <strong>Description &amp; services</strong> – clarify what you offer in your own words.
                  </div>
                </li>
                <li className="list-item">
                  <span className="list-bullet">✓</span>
                  <div>
                    <strong>Google posts</strong> – share timely updates about your business.
                  </div>
                </li>
              </ul>
            </div>
            <div className="card">
              <div className="card-title">Trust &amp; compliance</div>
              <div className="card-subtitle">
                Built for Google&apos;s Business Profile API review with clear boundaries on data use.
              </div>
              <div className="pill">
                <span className="pill-dot" />
                Client-authorized access only
              </div>
              <div className="hero-meta">
                <span>• No review manipulation or fake engagement</span>
                <span>• No resale of Google data</span>
                <span>• No automation of ads or spam</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <div>
            <h2 className="section-title">Purpose-built for small and mid-sized businesses</h2>
            <p className="section-subtitle">
              We act only as a <strong>management tool</strong>. You keep full ownership of your Business Profile data while we
              help you keep it accurate and up to date.
            </p>
          </div>
        </div>
        <div className="grid-3">
          <div className="card">
            <div className="card-title">Connect via Google OAuth</div>
            <p className="card-subtitle">
              Securely connect your Google Business Profile using Google OAuth 2.0. You can revoke access at any time from your
              Google Account.
            </p>
          </div>
          <div className="card">
            <div className="card-title">Manage essential profile data</div>
            <p className="card-subtitle">
              Adjust hours, descriptions, and services from a single dashboard. Changes are sent to Google via the official
              Business Profile APIs.
            </p>
          </div>
          <div className="card">
            <div className="card-title">Monitor reviews (read-only)</div>
            <p className="card-subtitle">
              View your latest reviews in one place to understand customer feedback. We do not automate replies or manipulate
              reviews in any way.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;

