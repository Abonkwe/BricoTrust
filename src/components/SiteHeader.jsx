import React, { useState } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';

export default function SiteHeader({ currentView, onNavigate, onStartRequest }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = (target) => {
    setMobileMenuOpen(false);
    onNavigate(target);
  };

  return (
    <header className="site-header">
      <div className="container site-header-inner">
        <button
          type="button"
          className="wordmark"
          onClick={() => handleLinkClick({ page: 'landing', section: 'top' })}
          aria-label="BricoTrust home"
        >
          BricoTrust<span className="wordmark-dot">.</span>
        </button>

        <nav className="desktop-nav" aria-label="Main navigation">
          <button
            type="button"
            className="nav-link"
            onClick={() => handleLinkClick({ page: 'landing', section: 'hero-request' })}
          >
            Find an artisan
          </button>
          <button
            type="button"
            className="nav-link"
            onClick={() => handleLinkClick({ page: 'landing', section: 'how-it-works' })}
          >
            How it works
          </button>
          <button
            type="button"
            className="nav-link"
            onClick={() => handleLinkClick({ page: 'landing', section: 'trust-passport' })}
          >
            Trust &amp; verification
          </button>
          <button
            type="button"
            className="nav-link"
            onClick={() => handleLinkClick({ page: 'landing', section: 'for-artisans' })}
          >
            For artisans
          </button>
        </nav>

        <div className="header-actions">
          <button
            type="button"
            className="btn btn-primary header-cta-desktop"
            onClick={() => {
              setMobileMenuOpen(false);
              if (currentView.page === 'landing') {
                onStartRequest();
              } else {
                handleLinkClick({ page: 'request' });
              }
            }}
          >
            Request a service
            <ArrowRight size={16} aria-hidden="true" />
          </button>

          <button
            type="button"
            className="mobile-menu-btn"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            {mobileMenuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div id="mobile-nav-drawer" className={`mobile-drawer ${mobileMenuOpen ? 'is-open' : ''}`}>
        <button
          type="button"
          className="nav-link"
          onClick={() => handleLinkClick({ page: 'landing', section: 'hero-request' })}
        >
          Find an artisan
        </button>
        <button
          type="button"
          className="nav-link"
          onClick={() => handleLinkClick({ page: 'landing', section: 'how-it-works' })}
        >
          How it works
        </button>
        <button
          type="button"
          className="nav-link"
          onClick={() => handleLinkClick({ page: 'landing', section: 'trust-passport' })}
        >
          Trust &amp; verification
        </button>
        <button
          type="button"
          className="nav-link"
          onClick={() => handleLinkClick({ page: 'artisan-join' })}
        >
          Join as an artisan
        </button>
        <button
          type="button"
          className="nav-link"
          onClick={() => handleLinkClick({ page: 'support' })}
        >
          Customer support &amp; business inquiries
        </button>
      </div>
    </header>
  );
}

