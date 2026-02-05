import React, { useState } from 'react';

function DashboardPage() {
  const [demoMode] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState(0);

  // Demo data for static display
  const demoLocations = [
    {
      id: 1,
      name: 'locations/123456789',
      title: 'Main Street Coffee Shop',
      description: 'A cozy neighborhood coffee shop serving premium espresso and fresh pastries.',
      hours: 'Monday-Friday: 7:00 AM - 6:00 PM\nSaturday-Sunday: 8:00 AM - 5:00 PM'
    },
    {
      id: 2,
      name: 'locations/987654321',
      title: 'Downtown Bakery',
      description: 'Artisan bakery specializing in fresh bread and custom cakes.',
      hours: 'Monday-Saturday: 6:00 AM - 4:00 PM\nSunday: Closed'
    }
  ];

  const currentLocation = demoLocations[selectedLocation];

  return (
    <div className="page">
      <section className="section">
        <h1 className="section-title">Business dashboard</h1>
        <p className="section-subtitle">
          Manage your own Google Business Profile locations on Google Search and Maps using secure, revocable access through
          Google OAuth 2.0. This dashboard is intended for verified business owners only.
        </p>

        <div className="card" style={{ borderColor: 'rgba(59,130,246,0.7)', marginTop: '1rem', marginBottom: '1rem' }}>
          <p className="small-note">
            <strong>Demo Mode:</strong> This is a static demonstration of the dashboard interface. In a production deployment with backend services, 
            this would connect to Google Business Profile APIs via OAuth 2.0 authentication.
          </p>
        </div>

        <div className="auth-card">
          <div className="auth-panel">
            <h2>Step 1: Sign in to the dashboard</h2>
            <p>
              Sign in with your Google account to authorize access to your own Google Business Profile locations. You can
              revoke this access at any time from your Google Account.
            </p>
            <div className="stacked" style={{ marginTop: '0.75rem' }}>
              <div className="button button-primary" style={{ opacity: 0.6, cursor: 'not-allowed' }}>
                Sign in with Google (Demo)
              </div>
              <p className="small-note">
                This uses Google OAuth 2.0 to authenticate you and connect your Google Business Profile in one step. We
                only request the scopes required to manage your own locations.
              </p>
              <p className="small-note" style={{ fontStyle: 'italic' }}>
                In demo mode, authentication is simulated. Connect a backend server to enable full functionality.
              </p>
            </div>
          </div>

          <div className="auth-panel">
            <h2>Step 2: Manage Google Business Profile access</h2>
            <p>
              After you sign in with Google, this section lets you manage and revoke that access. We never use your Google
              account for ads or review manipulation.
            </p>
            <div className="stacked" style={{ marginTop: '0.75rem' }}>
              <span className="small-note">
                Google Business Profile connection status will appear here after authentication.
              </span>
              <div className="button" style={{ opacity: 0.6, cursor: 'not-allowed' }}>
                Load my locations (Demo)
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-layout">
          <aside className="sidebar">
            <h2>Your locations</h2>
            <p className="small-note">
              Demo locations shown below. In production, only locations returned by the Google Business Profile APIs for your connected account will appear here.
            </p>
            <ul className="sidebar-list">
              {demoLocations.map((loc, index) => (
                <li
                  key={loc.id}
                  className={
                    selectedLocation === index ? 'sidebar-item active' : 'sidebar-item'
                  }
                  onClick={() => setSelectedLocation(index)}
                  style={{ cursor: 'pointer' }}
                >
                  <span>{loc.title}</span>
                  <span className="sidebar-badge">Demo</span>
                </li>
              ))}
            </ul>
          </aside>

          <section className="dashboard-main">
            <div className="dashboard-main-header">
              <div>
                <h2 className="dashboard-main-title">Manage profile data</h2>
                <p className="tagline">
                  Updates made here are sent only to the selected Google Business Profile location using the official APIs.
                </p>
              </div>
            </div>

            {currentLocation && (
              <div className="stacked">
                <div className="card" style={{ marginBottom: '1.5rem' }}>
                  <h3 style={{ marginBottom: '0.5rem' }}>{currentLocation.title}</h3>
                  <p className="small-note" style={{ marginBottom: '1rem' }}>
                    <strong>Location ID:</strong> {currentLocation.name}
                  </p>
                  <div style={{ marginBottom: '1rem' }}>
                    <strong>Description:</strong>
                    <p style={{ marginTop: '0.25rem' }}>{currentLocation.description}</p>
                  </div>
                  <div>
                    <strong>Hours:</strong>
                    <pre style={{ marginTop: '0.25rem', whiteSpace: 'pre-wrap', fontSize: '0.875rem' }}>
                      {currentLocation.hours}
                    </pre>
                  </div>
                </div>

                <form className="stacked" onSubmit={(e) => { e.preventDefault(); alert('Demo mode: Form submission disabled. Connect backend to enable updates.'); }}>
                  <fieldset className="fieldset">
                    <legend>Business information</legend>
                    <div className="fieldset-grid">
                      <div className="field">
                        <label className="field-label" htmlFor="description">
                          Description
                        </label>
                        <textarea
                          id="description"
                          name="description"
                          className="field-textarea"
                          placeholder="Describe your business in your own words."
                          defaultValue={currentLocation.description}
                        />
                      </div>
                      <div className="field">
                        <label className="field-label" htmlFor="regularHours">
                          Regular hours (JSON)
                        </label>
                        <textarea
                          id="regularHours"
                          name="regularHours"
                          className="field-textarea"
                          placeholder='{"periods":[{"openDay":"MONDAY","openTime":"09:00","closeDay":"MONDAY","closeTime":"17:00"}]}'
                        />
                        <p className="small-note">
                          This field is optional. When provided, it must follow the structure expected by the Google Business
                          Profile API.
                        </p>
                      </div>
                    </div>
                    <button type="submit" className="button button-primary" disabled>
                      Save changes (Demo Mode)
                    </button>
                    <p className="small-note">
                      Changes are applied only to the selected location and are subject to Google&apos;s standard review and
                      publishing processes.
                    </p>
                  </fieldset>
                </form>

                <form className="stacked" onSubmit={(e) => { e.preventDefault(); alert('Demo mode: Post creation disabled. Connect backend to enable posting.'); }}>
                  <fieldset className="fieldset">
                    <legend>Google Business Profile posts</legend>
                    <div className="field">
                      <label className="field-label" htmlFor="summary">
                        Post summary
                      </label>
                      <textarea
                        id="summary"
                        name="summary"
                        className="field-textarea"
                        placeholder="Share a legitimate update about your business (e.g., new hours, new service, special notice)."
                      />
                    </div>
                    <button type="submit" className="button" disabled>
                      Publish post (Demo Mode)
                    </button>
                    <p className="small-note">
                      Posts are created on your behalf for the selected location using the official Google Business Profile
                      APIs. We do not generate spam, fake promotions, or automated ad content.
                    </p>
                  </fieldset>
                </form>

                <div className="pill pill-warning">
                  <span className="pill-dot" />
                  <span>
                    Compliance note: this dashboard is a management tool only. It does not provide review manipulation, fake
                    engagement, or ads automation.
                  </span>
                </div>

                <div className="card" style={{ marginTop: '1.5rem', borderColor: 'rgba(156,163,175,0.5)' }}>
                  <h3 style={{ marginBottom: '0.5rem' }}>About this demo</h3>
                  <p className="small-note">
                    This is a static demonstration of the Google Business Profile management dashboard. To enable full functionality:
                  </p>
                  <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
                    <li className="small-note">Deploy the backend server (Node.js/Express) to handle OAuth and API calls</li>
                    <li className="small-note">Configure Google OAuth credentials in your backend</li>
                    <li className="small-note">Update API endpoints in the frontend to point to your backend URL</li>
                  </ul>
                </div>
              </div>
            )}
          </section>
        </div>
      </section>
    </div>
  );
}

export default DashboardPage;
