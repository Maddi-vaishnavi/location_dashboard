import React from 'react';
import { Link } from 'react-router-dom';

function FeaturesPage() {
  return (
    <div className="page">
      <section className="section">
        <div className="section-header">
          <div>
            <h1 className="section-title">Features built for Google Business Profile compliance</h1>
            <p className="section-subtitle">
              This platform helps <strong>small and mid-sized businesses</strong> manage their own Google Business Profiles on
              Google Search and Maps using the <strong>official Google Business Profile APIs</strong>. We never scrape Google
              or automate reviews or ads.
            </p>
          </div>
        </div>
        <div className="grid-3">
          <div className="card">
            <div className="card-title">Secure Google OAuth 2.0 connection</div>
            <p className="card-subtitle">
              Connect your Google Business Profile using Google&apos;s official OAuth 2.0 flow. Access can be revoked at any
              time from your Google Account or from within the dashboard.
            </p>
            <ul className="list">
              <li className="list-item">
                <span className="list-bullet">✓</span>
                <span>Client-authorized access only.</span>
              </li>
              <li className="list-item">
                <span className="list-bullet">✓</span>
                <span>Minimum required scopes for GBP management.</span>
              </li>
            </ul>
          </div>
          <div className="card">
            <div className="card-title">Business information management</div>
            <p className="card-subtitle">
              Keep your Google Maps and Search listing accurate by updating hours, business description, and services from one
              place.
            </p>
            <ul className="list">
              <li className="list-item">
                <span className="list-bullet">✓</span>
                <span>Regular and special opening hours.</span>
              </li>
              <li className="list-item">
                <span className="list-bullet">✓</span>
                <span>Profile description and service list.</span>
              </li>
            </ul>
          </div>
          <div className="card">
            <div className="card-title">Posts &amp; review monitoring</div>
            <p className="card-subtitle">
              Publish legitimate posts to your profile and monitor incoming reviews. Review data is read-only – no automated
              replies or manipulation.
            </p>
            <ul className="list">
              <li className="list-item">
                <span className="list-bullet">✓</span>
                <span>Owner-authored Google Business Profile posts.</span>
              </li>
              <li className="list-item">
                <span className="list-bullet">!</span>
                <span>Strictly no fake engagement or review gating.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-columns">
          <div>
            <h2 className="section-title">Designed for Google API policy review</h2>
            <p className="section-subtitle">
              This application is intentionally scoped to demonstrate <strong>legitimate business intent</strong>, transparent
              data usage, and strict alignment with Google Business Profile API policies.
            </p>
            <p className="small-note">
              We do <strong>not</strong> provide payments, ad automation, bulk posting, or any features that could be used to
              manipulate rankings or reviews.
            </p>
          </div>
          <div className="card">
            <div className="card-title">Key constraints</div>
            <ul className="list">
              <li className="list-item">
                <span className="list-bullet">•</span>
                <span>No resale or sharing of Google data.</span>
              </li>
              <li className="list-item">
                <span className="list-bullet">•</span>
                <span>No scraping or bypassing Google restrictions.</span>
              </li>
              <li className="list-item">
                <span className="list-bullet">•</span>
                <span>No automated review replies or fake activity.</span>
              </li>
              <li className="list-item">
                <span className="list-bullet">•</span>
                <span>Access is always consented and revocable.</span>
              </li>
            </ul>
          </div>
        </div>
        <div style={{ marginTop: '1.25rem' }}>
          <Link to="/dashboard" className="button button-primary">
            Go to dashboard
          </Link>
        </div>
      </section>
    </div>
  );
}

export default FeaturesPage;

