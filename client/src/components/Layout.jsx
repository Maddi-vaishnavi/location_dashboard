import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Layout({ children }) {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);
    return () => document.body.classList.remove('menu-open');
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  return (
    <div className={`app-shell ${menuOpen ? 'menu-open' : ''}`}>
      <header className="header">
        <div className="header-inner">
          <Link to="/" className="logo">
            <span className="logo-mark">GMB</span>
            <span className="logo-text">Trusted Profile Manager</span>
          </Link>
          <nav className="nav" id="site-nav" aria-label="Primary">
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
          <div className="header-right">
            <button
              type="button"
              className="nav-toggle"
              aria-controls="site-nav"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((o) => !o)}
            >
              <span className="nav-toggle-bar" />
              <span className="nav-toggle-bar" />
              <span className="nav-toggle-bar" />
            </button>
            <div className="header-actions">
              <Link to="/dashboard" className="button button-primary">
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </header>
      {menuOpen && <div className="nav-backdrop" onClick={() => setMenuOpen(false)} aria-hidden="true" />}
      <main className="main">{children}</main>
      <footer className="footer">
        <div className="footer-inner">
          <p className="footer-text">
            This platform helps verified healthcare professionals manage their own Google Business Profiles on Google Search
            and Maps using official Google Business Profile APIs only.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Layout;

