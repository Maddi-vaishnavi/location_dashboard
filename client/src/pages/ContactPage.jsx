import React from 'react';

function ContactPage() {
  return (
    <div className="page">
      <section className="section">
        <div className="section-header">
          <div>
            <h1 className="section-title">Contact &amp; Support</h1>
            <p className="section-subtitle">
              Have questions about how we use the Google Business Profile APIs, or need help managing your listings? Send us a
              message and we&apos;ll get back to you.
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
              Business email
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
              placeholder="Tell us about your business and what you want to manage in Google Business Profile."
            />
          </div>
          <button type="button" className="button button-primary">
            Submit (demo only)
          </button>
          <p className="small-note">
            This contact form is part of the demo. In a production deployment, messages would be sent to a monitored support
            inbox for human review.
          </p>
        </form>
      </section>
    </div>
  );
}

export default ContactPage;

