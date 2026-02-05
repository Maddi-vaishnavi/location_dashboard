import React from 'react';

function TermsPage() {
  return (
    <div className="page legal-page">
      <section className="section">
        <h1>Terms of Service</h1>
        <p className="small-note">Last updated: {new Date().getFullYear()}</p>

        <p>
          These Terms of Service (&quot;Terms&quot;) govern your use of the Google Business Profile management platform (the
          &quot;Service&quot;). By accessing or using the Service, you agree to be bound by these Terms.
        </p>

        <h2>1. Service description</h2>
        <p>
          The Service provides tools for small and mid-sized businesses to manage their own Google Business Profiles on Google
          Search and Maps using the official Google Business Profile APIs. The Service acts only as a management layer between
          you and Google.
        </p>

        <h2>2. Ownership of data</h2>
        <p>
          <strong>
            Users retain ownership of all profile data, content, and business information associated with their Google Business
            Profiles.
          </strong>
        </p>
        <p>
          The platform does not claim any ownership rights over your Google Business Profile listings, posts, or related
          content. We access and modify this information solely on your instructions and only through official Google APIs.
        </p>

        <h2>3. Use of Google Business Profile APIs</h2>
        <p>
          <strong>
            The platform provides profile management tools only and is designed to comply with Google Business Profile API
            policies.
          </strong>
        </p>
        <ul>
          <li>All access to Google data is granted via OAuth 2.0 and can be revoked at any time.</li>
          <li>We request only the minimum scopes necessary to manage your Business Profiles.</li>
          <li>We do not scrape Google services or bypass their technical restrictions.</li>
          <li>We do not provide tools for fake engagement, review manipulation, or ad automation.</li>
        </ul>

        <h2>4. Acceptable use</h2>
        <p>You agree that you will not use the Service to:</p>
        <ul>
          <li>Create or promote fraudulent, misleading, or inauthentic business listings.</li>
          <li>Manipulate reviews, ratings, or engagement metrics.</li>
          <li>Automate advertisements or other actions outside the intended scope of the Service.</li>
          <li>Violate Google&apos;s Google Business Profile terms or policies.</li>
        </ul>

        <h2>5. No resale of Google data</h2>
        <p>
          We do not resell or redistribute Google Business Profile or user data. Data retrieved from Google is used only to
          provide the Service back to you, the authorized business owner.
        </p>

        <h2>6. Termination</h2>
        <p>
          We may suspend or terminate your access to the Service if we reasonably believe that you are misusing the Service,
          violating these Terms, or breaching Google&apos;s API policies.
        </p>

        <h2>7. Contact</h2>
        <p>
          If you have questions about these Terms or about how the Service interacts with Google Business Profile APIs, please
          reach out via the Contact / Support page.
        </p>
      </section>
    </div>
  );
}

export default TermsPage;

