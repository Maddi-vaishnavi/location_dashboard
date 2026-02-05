import React, { useEffect, useState } from 'react';

async function apiRequest(path, options = {}) {
  const res = await fetch(path, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    ...options
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Request failed with status ${res.status}`);
  }
  return res.json();
}

function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [locations, setLocations] = useState([]);
  const [selectedLocationName, setSelectedLocationName] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        setLoading(true);
        const data = await apiRequest('/api/auth/session');
        if (!cancelled) {
          setSession(data);
        }
      } catch (e) {
        if (!cancelled) {
          setError('Unable to load session. Is the backend server running on port 4000?');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const data = await apiRequest('/api/auth/email-login', {
        method: 'POST',
        body: JSON.stringify({ email })
      });
      setSession((prev) => ({ ...(prev || {}), user: data.user, hasGoogleConnection: false }));
    } catch (e) {
      setError('Login failed. Please check your email and try again.');
    }
  };

  const handleDisconnectGoogle = async () => {
    setError('');
    try {
      await apiRequest('/api/auth/google/disconnect', { method: 'POST' });
      setSession((prev) => ({ ...(prev || {}), hasGoogleConnection: false }));
      setLocations([]);
      setSelectedLocationName('');
    } catch (e) {
      setError('Failed to disconnect Google Business Profile.');
    }
  };

  const loadLocations = async () => {
    setError('');
    try {
      const data = await apiRequest('/api/locations');
      setLocations(data.locations || []);
      if (data.locations && data.locations.length > 0) {
        setSelectedLocationName(data.locations[0].name);
      }
    } catch (e) {
      setError('Unable to load locations from Google Business Profile API.');
    }
  };

  const handleUpdateLocation = async (e) => {
    e.preventDefault();
    if (!selectedLocationName) return;
    setSaving(true);
    setError('');
    try {
      const form = e.target;
      const description = form.description.value.trim();
      const regularHours = form.regularHours.value
        ? JSON.parse(form.regularHours.value)
        : undefined;

      const body = {};
      if (description) body.description = description;
      if (regularHours) body.regularHours = regularHours;

      if (Object.keys(body).length === 0) {
        setError('Please provide at least one field to update.');
        setSaving(false);
        return;
      }

      await apiRequest(`/api/locations/${encodeURIComponent(selectedLocationName)}`, {
        method: 'PATCH',
        body: JSON.stringify(body)
      });
    } catch (e) {
      setError('Failed to update location. Check field formats and try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!selectedLocationName) return;
    setSaving(true);
    setError('');
    try {
      const form = e.target;
      const summary = form.summary.value.trim();
      if (!summary) {
        setError('Post summary is required.');
        setSaving(false);
        return;
      }
      await apiRequest(`/api/locations/${encodeURIComponent(selectedLocationName)}/posts`, {
        method: 'POST',
        body: JSON.stringify({ summary })
      });
      form.reset();
    } catch (e) {
      setError('Failed to create Google Business Profile post.');
    } finally {
      setSaving(false);
    }
  };

  const user = session?.user || null;
  const hasGoogle = Boolean(session?.hasGoogleConnection);

  return (
    <div className="page">
      <section className="section">
        <h1 className="section-title">Business dashboard</h1>
        <p className="section-subtitle">
          Manage your own Google Business Profile locations on Google Search and Maps using secure, revocable access through
          Google OAuth 2.0. This dashboard is intended for verified business owners only.
        </p>

        {error && (
          <div className="card" style={{ borderColor: 'rgba(248,113,113,0.7)', marginTop: '1rem' }}>
            <p className="small-note">{error}</p>
          </div>
        )}

        <div className="auth-card">
          <div className="auth-panel">
            <h2>Step 1: Sign in to the dashboard</h2>
            <p>
              Sign in with your Google account to authorize access to your own Google Business Profile locations. You can
              revoke this access at any time from your Google Account.
            </p>
            {!user ? (
              <div className="stacked" style={{ marginTop: '0.75rem' }}>
                <a href="/api/auth/google" className="button button-primary">
                  Sign in with Google
                </a>
                <p className="small-note">
                  This uses Google OAuth 2.0 to authenticate you and connect your Google Business Profile in one step. We
                  only request the scopes required to manage your own locations.
                </p>
                <div className="field">
                  <label className="field-label" htmlFor="login-email">
                    (Optional) Business email for reference
                  </label>
                  <input
                    id="login-email"
                    className="field-input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@business.com"
                  />
                </div>
              </div>
            ) : (
              <div style={{ marginTop: '0.75rem' }}>
                <p className="small-note">
                  Signed in as <strong>{user.email}</strong> via Google.
                </p>
                <button
                  type="button"
                  className="button button-ghost"
                  onClick={async () => {
                    await apiRequest('/api/auth/logout', { method: 'POST' });
                    setSession(null);
                    setLocations([]);
                    setSelectedLocationName('');
                  }}
                >
                  Sign out
                </button>
              </div>
            )}
          </div>

          <div className="auth-panel">
            <h2>Step 2: Manage Google Business Profile access</h2>
            <p>
              After you sign in with Google, this section lets you manage and revoke that access. We never use your Google
              account for ads or review manipulation.
            </p>
            <div className="stacked" style={{ marginTop: '0.75rem' }}>
              {!hasGoogle && (
                <p className="small-note">
                  Once you have completed &quot;Sign in with Google&quot; above, your Google Business Profile connection
                  status will appear here.
                </p>
              )}
              {hasGoogle && (
                <>
                  <span className="small-note">
                    Google Business Profile is connected for this account. You can revoke access at any time below.
                  </span>
                  <button type="button" className="button button-ghost" onClick={handleDisconnectGoogle}>
                    Disconnect Google account
                  </button>
                  <button type="button" className="button" onClick={loadLocations}>
                    Load my locations
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="dashboard-layout">
          <aside className="sidebar">
            <h2>Your locations</h2>
            <p className="small-note">
              Only locations returned by the Google Business Profile APIs for your connected account will appear here.
            </p>
            <ul className="sidebar-list">
              {locations.map((loc) => (
                <li
                  key={loc.name}
                  className={
                    selectedLocationName === loc.name ? 'sidebar-item active' : 'sidebar-item'
                  }
                  onClick={() => setSelectedLocationName(loc.name)}
                >
                  <span>{loc.title || loc.locationName || loc.name}</span>
                  <span className="sidebar-badge">GBP</span>
                </li>
              ))}
              {locations.length === 0 && (
                <li className="small-note" style={{ marginTop: '0.5rem' }}>
                  No locations loaded yet. After connecting Google Business Profile, click &quot;Load my locations&quot;.
                </li>
              )}
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

            {!hasGoogle && (
              <p className="small-note">
                To manage your profile, first sign in with your email and connect Google Business Profile above.
              </p>
            )}

            {hasGoogle && selectedLocationName && (
              <div className="stacked">
                <form onSubmit={handleUpdateLocation} className="stacked">
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
                    <button type="submit" className="button button-primary" disabled={saving}>
                      {saving ? 'Saving…' : 'Save changes'}
                    </button>
                    <p className="small-note">
                      Changes are applied only to the selected location and are subject to Google&apos;s standard review and
                      publishing processes.
                    </p>
                  </fieldset>
                </form>

                <form onSubmit={handleCreatePost} className="stacked">
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
                    <button type="submit" className="button" disabled={saving}>
                      {saving ? 'Publishing…' : 'Publish post'}
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
              </div>
            )}
          </section>
        </div>
      </section>
    </div>
  );
}

export default DashboardPage;

