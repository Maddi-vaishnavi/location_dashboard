import React from 'react';

function TermsPage() {
  return (
    <div className="page legal-page">
      <section className="section">
        <h1>Terms of Service</h1>
        <p className="small-note">Last updated: {new Date().getFullYear()}</p>

        <p>
          These Terms govern your use of the Service. By using it, you agree to these Terms.
        </p>

        <h2>1. Service description</h2>
        <p>
          The Service helps healthcare professionals manage their own Business Profiles using official APIs.
        </p>

        <h2>2. Google Business Profile overview</h2>
        <p>
          Google Business Profile lets you manage your presence on Search and Maps.
        </p>

        <h2>3. Key GBP functions you control</h2>
        <ul>
          <li>Update core info like hours and contact details.</li>
          <li>Share services, photos, and posts.</li>
          <li>View reviews and insights.</li>
        </ul>

        <h2>4. Ownership of data</h2>
        <p>
          <strong>
            Users retain ownership of all profile data, content, and business information associated with their Google Business
            Profiles.
          </strong>
        </p>
        <p>
          We act only on your instructions and only through official APIs.
        </p>

        <h2>5. Use of Google Business Profile APIs</h2>
        <p>
          <strong>
            The platform provides profile management tools only and is designed to comply with Google Business Profile API
            policies.
          </strong>
        </p>
        <ul>
          <li>Access is via OAuth 2.0 and can be revoked.</li>
          <li>Minimum scopes only.</li>
          <li>No scraping, fake engagement, or ad automation.</li>
        </ul>

        <h2>6. Acceptable use</h2>
        <p>You agree that you will not use the Service to:</p>
        <ul>
          <li>Create fraudulent or misleading listings.</li>
          <li>Manipulate reviews or engagement.</li>
          <li>Automate ads or misuse the Service.</li>
          <li>Violate Google&apos;s policies.</li>
        </ul>

        <h2>7. No resale of Google data</h2>
        <p>
          We do not resell or redistribute Google data. Data is used only to provide the Service to you.
        </p>

        <h2>8. Termination</h2>
        <p>
          We may suspend or terminate access for misuse or policy violations.
        </p>

        <h2>9. Contact</h2>
        <p>
          Contact Support with questions about these Terms or the Service.
        </p>

        <h2>10. Third-party management and authorization</h2>
        <p>
          If you manage profiles for clients, you must have explicit authorization and allow revocation.
        </p>

        <h2>11. Intellectual property and content rights</h2>
        <p>
          You are responsible for rights to any content you upload.
        </p>
      </section>
    </div>
  );
}

export default TermsPage;

