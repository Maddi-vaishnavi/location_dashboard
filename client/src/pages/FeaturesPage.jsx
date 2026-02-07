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
              Manage your own profile with official APIs. No scraping, no review or ads automation.
            </p>
          </div>
        </div>
        <div className="grid-3">
          <div className="card">
            <div className="card-title">Secure Google OAuth 2.0 connection</div>
            <p className="card-subtitle">
              Connect using Google&apos;s OAuth 2.0 flow with revocable access.
            </p>
            <ul className="list">
              <li className="list-item">
                <span className="list-bullet">✓</span>
                <span>Client-authorized access only.</span>
              </li>
              <li className="list-item">
                <span className="list-bullet">✓</span>
                <span>Minimum required scopes.</span>
              </li>
            </ul>
          </div>
          <div className="card">
            <div className="card-title">Business information management</div>
            <p className="card-subtitle">
              Update hours, description, and services in one place.
            </p>
            <ul className="list">
              <li className="list-item">
                <span className="list-bullet">✓</span>
                <span>Regular and special hours.</span>
              </li>
              <li className="list-item">
                <span className="list-bullet">✓</span>
                <span>Description and services.</span>
              </li>
            </ul>
          </div>
          <div className="card">
            <div className="card-title">Posts &amp; review monitoring</div>
            <p className="card-subtitle">
              Publish legitimate posts and monitor reviews (read-only).
            </p>
            <ul className="list">
              <li className="list-item">
                <span className="list-bullet">✓</span>
                <span>Owner-authored posts.</span>
              </li>
              <li className="list-item">
                <span className="list-bullet">!</span>
                <span>No fake engagement or gating.</span>
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
              Intentionally scoped for transparent, policy-aligned use.
            </p>
            <p className="small-note">
              No payments, ad automation, bulk posting, or review manipulation.
            </p>
          </div>
          <div className="card">
            <div className="card-title">Key constraints</div>
            <ul className="list">
              <li className="list-item">
                <span className="list-bullet">•</span>
                <span>No resale of Google data.</span>
              </li>
              <li className="list-item">
                <span className="list-bullet">•</span>
                <span>No scraping or bypassing restrictions.</span>
              </li>
              <li className="list-item">
                <span className="list-bullet">•</span>
                <span>No automated review replies.</span>
              </li>
              <li className="list-item">
                <span className="list-bullet">•</span>
                <span>Access is consented and revocable.</span>
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

