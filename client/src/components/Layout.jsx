import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Layout({ children }) {
  const location = useLocation();

  return (
    <div className="app-shell">
      <header className="header">
        <div className="header-inner">
          <Link to="/" className="logo">
            <span className="logo-mark">GMB</span>
            <span className="logo-text">Trusted Profile Manager</span>
          </Link>
          <nav className="nav">
            <Link to="/features" className={location.pathname === '/features' ? 'nav-link active' : 'nav-link'}>
              Features
            </Link>
            <Link to="/how-it-works" className={location.pathname === '/how-it-works' ? 'nav-link active' : 'nav-link'}>
              How It Works
            </Link>
            <Link to="/privacy" className={location.pathname === '/privacy' ? 'nav-link active' : 'nav-link'}>
              Privacy
            </Link>
            <Link to="/terms" className={location.pathname === '/terms' ? 'nav-link active' : 'nav-link'}>
              Terms
            </Link>
            <Link to="/contact" className={location.pathname === '/contact' ? 'nav-link active' : 'nav-link'}>
              Contact
            </Link>
          </nav>
          <div className="header-actions">
            <Link to="/dashboard" className="button button-primary">
              Dashboard
            </Link>
          </div>
        </div>
      </header>
      <main className="main">{children}</main>
      <footer className="footer">
        <div className="footer-inner">
          <p className="footer-text">
            This platform helps verified business owners manage their own Google Business Profiles on Google Search and Maps
            using official Google Business Profile APIs only.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Layout;

