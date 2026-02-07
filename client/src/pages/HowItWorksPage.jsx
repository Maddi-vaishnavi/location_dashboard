import React from 'react';

function HowItWorksPage() {
  return (
    <div className="page">
      <section className="section">
        <div className="section-header">
          <div>
            <h1 className="section-title">How it works</h1>
            <p className="section-subtitle">
              A simple flow to manage your own Business Profile with full control.
            </p>
          </div>
        </div>

        <div className="section-columns">
          <ol className="list" style={{ counterReset: 'step' }}>
            <li className="list-item">
              <span className="list-bullet">1</span>
              <div>
                <strong>Business signs up</strong>
                <p className="small-note">
                  Create an account using your professional email.
                </p>
              </div>
            </li>
            <li className="list-item">
              <span className="list-bullet">2</span>
              <div>
                <strong>Authorize Google access with OAuth 2.0</strong>
                <p className="small-note">
                  Approve access on Google&apos;s consent screen.
                </p>
              </div>
            </li>
            <li className="list-item">
              <span className="list-bullet">3</span>
              <div>
                <strong>Select your locations</strong>
                <p className="small-note">
                  Choose locations returned by the official APIs.
                </p>
              </div>
            </li>
            <li className="list-item">
              <span className="list-bullet">4</span>
              <div>
                <strong>Manage profile data</strong>
                <p className="small-note">
                  Update hours, descriptions, and posts via the APIs.
                </p>
              </div>
            </li>
            <li className="list-item">
              <span className="list-bullet">5</span>
              <div>
                <strong>Monitor reviews (read-only)</strong>
                <p className="small-note">
                  View reviews in one place, read-only.
                </p>
              </div>
            </li>
          </ol>

          <div className="card">
            <div className="card-title">Control &amp; revocability</div>
            <p className="card-subtitle">
              You stay in control. The platform is a management tool only.
            </p>
            <ul className="list">
              <li className="list-item">
                <span className="list-bullet">✓</span>
                <span>Revoke access anytime in Google Account.</span>
              </li>
              <li className="list-item">
                <span className="list-bullet">✓</span>
                <span>Disconnecting stops API access.</span>
              </li>
              <li className="list-item">
                <span className="list-bullet">✓</span>
                <span>No access without consent.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HowItWorksPage;

