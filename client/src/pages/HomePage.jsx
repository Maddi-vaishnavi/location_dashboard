import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="page">
      <section className="page-hero">
        <div>
          <span className="eyebrow">
            <span className="eyebrow-dot" />
            Google Business Profile for Healthcare
          </span>
          <h1 className="hero-title">
            <span className="hero-gradient">Trusted Google Business Profile manager</span> for Search &amp; Maps.
          </h1>
          <p className="hero-subtitle">
            Securely manage your own Google Business Profile on Search and Maps using official APIs. No scraping or review
            manipulation.
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
            <strong>Compliance first:</strong> OAuth 2.0 access only, revocable anytime.
          </p>
        </div>
        <div className="hero-card">
          <div className="hero-card-header">
            <div>
              <div className="hero-card-title">Google Business Profile overview</div>
              <div style={{ fontSize: '0.8rem', color: '#9ca3af' }}>Example data managed through the API</div>
            </div>
            <span className="hero-card-chip">Official GBP API only</span>
          </div>
          <div className="hero-card-body">
            <div className="card">
              <div className="card-title">Maps &amp; Search listing</div>
              <div className="card-subtitle">Keep key info accurate.</div>
              <ul className="list">
                <li className="list-item">
                  <span className="list-bullet">✓</span>
                  <div>
                    <strong>Business hours</strong> – keep hours current.
                  </div>
                </li>
                <li className="list-item">
                  <span className="list-bullet">✓</span>
                  <div>
                    <strong>Description &amp; services</strong> – concise, accurate details.
                  </div>
                </li>
                <li className="list-item">
                  <span className="list-bullet">✓</span>
                  <div>
                    <strong>Google posts</strong> – publish legitimate updates.
                  </div>
                </li>
              </ul>
            </div>
            <div className="card">
              <div className="card-title">Trust &amp; compliance</div>
              <div className="card-subtitle">Policy-aligned usage only.</div>
              <div className="pill">
                <span className="pill-dot" />
                Client-authorized access only
              </div>
              <div className="hero-meta">
                <span>• No review manipulation</span>
                <span>• No data resale</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <div>
            <h2 className="section-title">Purpose-built for healthcare professionals</h2>
            <p className="section-subtitle">
              A lightweight management tool. You keep ownership while we help keep listings accurate.
            </p>
          </div>
        </div>
        <div className="grid-3">
          <div className="card">
            <div className="card-title">Connect via Google OAuth</div>
            <p className="card-subtitle">
              Secure OAuth 2.0 connection with revocable access.
            </p>
          </div>
          <div className="card">
            <div className="card-title">Manage essential profile data</div>
            <p className="card-subtitle">
              Update hours, descriptions, and services via official APIs.
            </p>
          </div>
          <div className="card">
            <div className="card-title">Monitor reviews (read-only)</div>
            <p className="card-subtitle">
              View reviews in one place. No automated replies.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;

