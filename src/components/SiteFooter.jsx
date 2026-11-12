import React from 'react';
import { Phone, Mail, MapPin, Building2 } from 'lucide-react';
import { api } from '../services/api';

export default function SiteFooter({ onNavigate }) {
  const handleSupportNav = (topic = 'Customer support') => {
    api.trackEvent('support_clicked', { source: 'footer', topic });
    onNavigate({ page: 'support', topic });
  };

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 800, color: '#FFFFFF' }}>
              BricoTrust<span style={{ color: '#B5D83D' }}>.</span>
            </div>
            <p style={{ marginTop: '12px', fontSize: '14px', lineHeight: 1.6, color: '#CFE2DE' }}>
              Evidence-backed local artisan discovery and booking. Starting with verified plumbing tasks in Molyko, Buea.
            </p>
            <div
              style={{
                marginTop: '16px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 12px',
                borderRadius: '10px',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                fontSize: '13px',
                color: '#E8F3F1'
              }}
            >
              <MapPin size={15} color="#B5D83D" aria-hidden="true" />
              <span>Pilot locality: Molyko, Buea (Plumbing only)</span>
            </div>
          </div>

          <div>
            <h3 className="footer-heading">Platform</h3>
            <ul className="footer-link-list">
              <li>
                <button
                  type="button"
                  className="footer-link"
                  onClick={() => onNavigate({ page: 'landing', section: 'how-it-works' })}
                >
                  About BricoTrust
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="footer-link"
                  onClick={() => onNavigate({ page: 'landing', section: 'trust-passport' })}
                >
                  How verification works
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="footer-link"
                  onClick={() => onNavigate({ page: 'artisan-join' })}
                >
                  For artisans
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="footer-link"
                  onClick={() => handleSupportNav('Property manager / business pilot')}
                >
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <Building2 size={14} aria-hidden="true" />
                    For property managers
                  </span>
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="footer-heading">Policies &amp; Help</h3>
            <ul className="footer-link-list">
              <li>
                <button type="button" className="footer-link" onClick={() => handleSupportNav('Customer support')}>
                  Customer support
                </button>
              </li>
              <li>
                <button type="button" className="footer-link" onClick={() => onNavigate({ page: 'privacy' })}>
                  Privacy notice
                </button>
              </li>
              <li>
                <button type="button" className="footer-link" onClick={() => onNavigate({ page: 'terms' })}>
                  Terms of use
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="footer-heading">Pilot Desk Contact</h3>
            <p style={{ fontSize: '13px', color: '#CFE2DE', lineHeight: 1.55 }}>
              Monitored during the Buea pilot (Mon–Sat, 08:00–18:00 WAT) for assisted requests and dispute handling:
            </p>
            <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px' }}>
              <a
                href="tel:+237670000000"
                className="footer-link"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: 0 }}
              >
                <Phone size={15} color="#B5D83D" aria-hidden="true" />
                +237 670 00 00 00 (Phone / WhatsApp)
              </a>
              <a
                href="mailto:pilot-support@bricotrust.cm"
                className="footer-link"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: 0 }}
              >
                <Mail size={15} color="#B5D83D" aria-hidden="true" />
                pilot-support@bricotrust.cm
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 BricoTrust · Silicon Mountain Hackathon Pilot (Molyko, Buea)</span>
          <span>Sample records shown during demo are clearly labelled “Demo profile / Sample data”.</span>
        </div>
      </div>
    </footer>
  );
}

