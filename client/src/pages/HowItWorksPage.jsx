import React from 'react';

function HowItWorksPage() {
  return (
    <div className="page">
      <section className="section">
        <div className="section-header">
          <div>
            <h1 className="section-title">How it works</h1>
            <p className="section-subtitle">
              A simple, transparent flow for business owners to manage their own Google Business Profiles with full control
              over access.
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
                  You create an account in the dashboard using your business email address. This identifies you as the
                  authorized owner or manager.
                </p>
              </div>
            </li>
            <li className="list-item">
              <span className="list-bullet">2</span>
              <div>
                <strong>Authorize Google access with OAuth 2.0</strong>
                <p className="small-note">
                  When you click &quot;Connect Google Business Profile&quot;, you are redirected to Google&apos;s official
                  OAuth consent screen. You can see exactly which permissions are requested and may cancel at any time.
                </p>
              </div>
            </li>
            <li className="list-item">
              <span className="list-bullet">3</span>
              <div>
                <strong>Select your locations</strong>
                <p className="small-note">
                  After successful authorization, we retrieve the list of Business Profile locations that belong to your
                  account via the Google Business Profile APIs. You choose which locations to manage.
                </p>
              </div>
            </li>
            <li className="list-item">
              <span className="list-bullet">4</span>
              <div>
                <strong>Manage profile data</strong>
                <p className="small-note">
                  From the dashboard you can update opening hours, descriptions, and services, and publish posts. All changes
                  are sent directly to Google via the official APIs on your behalf.
                </p>
              </div>
            </li>
            <li className="list-item">
              <span className="list-bullet">5</span>
              <div>
                <strong>Monitor reviews (read-only)</strong>
                <p className="small-note">
                  You can view incoming reviews to understand customer feedback. We do not automate replies, request fake
                  reviews, or attempt to influence ratings.
                </p>
              </div>
            </li>
          </ol>

          <div className="card">
            <div className="card-title">Control &amp; revocability</div>
            <p className="card-subtitle">
              You remain in control of your Google account and Business Profiles at all times. The platform is a management
              tool only.
            </p>
            <ul className="list">
              <li className="list-item">
                <span className="list-bullet">✓</span>
                <span>You can revoke access at any time via your Google Account settings.</span>
              </li>
              <li className="list-item">
                <span className="list-bullet">✓</span>
                <span>Disconnecting in the dashboard also revokes tokens and stops all API access.</span>
              </li>
              <li className="list-item">
                <span className="list-bullet">✓</span>
                <span>We do not keep persistent access without your consent.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HowItWorksPage;

