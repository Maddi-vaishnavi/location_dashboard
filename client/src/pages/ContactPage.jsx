import React from 'react';

function ContactPage() {
  return (
    <div className="page">
      <section className="section">
        <div className="section-header">
          <div>
            <h1 className="section-title">Contact &amp; Support</h1>
            <p className="section-subtitle">
              Questions about the API integration or your listing? Send a message.
            </p>
          </div>
        </div>

        <form className="form">
          <div className="field">
            <label className="field-label" htmlFor="name">
              Your name
            </label>
            <input className="field-input" id="name" name="name" placeholder="Jane Doe" />
          </div>
          <div className="field">
            <label className="field-label" htmlFor="email">
              Professional email
            </label>
            <input className="field-input" id="email" name="email" placeholder="you@business.com" />
          </div>
          <div className="field">
            <label className="field-label" htmlFor="message">
              How can we help?
            </label>
            <textarea
              className="field-textarea"
              id="message"
              name="message"
              placeholder="Tell us what you want to manage."
            />
          </div>
          <button type="button" className="button button-primary">
            Submit (demo only)
          </button>
          <p className="small-note">
            Demo only. Production sends messages to a support inbox.
          </p>
        </form>
      </section>
    </div>
  );
}

export default ContactPage;

