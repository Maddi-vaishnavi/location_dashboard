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
        <h1 className="section-title">Practice dashboard</h1>
        <p className="section-subtitle">
          Manage your own Google Business Profile locations with secure, revocable OAuth 2.0 access.
        </p>

        <div className="card" style={{ borderColor: 'rgba(59,130,246,0.7)', marginTop: '1rem', marginBottom: '1rem' }}>
          <p className="small-note">
            <strong>Demo Mode:</strong> Static UI only. Connect a backend to enable live API access.
          </p>
        </div>

        <div className="full-bleed">
          <div className="auth-card">
            <div className="auth-panel">
              <h2>Step 1: Sign in to the dashboard</h2>
              <p>
                Sign in with Google to authorize access to your own locations.
              </p>
              <div className="stacked" style={{ marginTop: '0.75rem' }}>
                <div className="button button-primary" style={{ opacity: 0.6, cursor: 'not-allowed' }}>
                  Sign in with Google (Demo)
                </div>
                <p className="small-note">
                  OAuth 2.0 with minimum required scopes.
                </p>
                <p className="small-note" style={{ fontStyle: 'italic' }}>
                  Demo mode simulates authentication.
                </p>
              </div>
            </div>

            <div className="auth-panel">
              <h2>Step 2: Manage Google Business Profile access</h2>
              <p>
                Manage and revoke access after sign-in.
              </p>
              <div className="stacked" style={{ marginTop: '0.75rem' }}>
                <span className="small-note">
                  Connection status appears after authentication.
                </span>
                <div className="button" style={{ opacity: 0.6, cursor: 'not-allowed' }}>
                  Load my locations (Demo)
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-layout">
          <aside className="sidebar">
            <h2>Your locations</h2>
            <p className="small-note">
              Demo locations shown. Production uses your connected account.
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
                  Updates apply only to the selected location via official APIs.
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
                          Optional. Must match the API format.
                        </p>
                      </div>
                    </div>
                    <button type="submit" className="button button-primary" disabled>
                      Save changes (Demo Mode)
                    </button>
                    <p className="small-note">
                      Changes apply to the selected location only.
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
                      Posts are created for the selected location via official APIs.
                    </p>
                  </fieldset>
                </form>

                <div className="pill pill-warning">
                  <span className="pill-dot" />
                  <span>
                    Compliance note: management tool only. No review manipulation or ads automation.
                  </span>
                </div>

                <div className="card" style={{ marginTop: '1.5rem', borderColor: 'rgba(156,163,175,0.5)' }}>
                  <h3 style={{ marginBottom: '0.5rem' }}>About this demo</h3>
                  <p className="small-note">
                    Static demo only. To enable full functionality:
                  </p>
                  <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
                    <li className="small-note">Deploy the backend server for OAuth and API calls</li>
                    <li className="small-note">Configure Google OAuth credentials</li>
                    <li className="small-note">Point the frontend to your backend URL</li>
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
