import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import artisanWorkshopLg from '../assets/artisan-workshop.webp';
import artisanWorkshopSm from '../assets/artisan-workshop-sm.webp';
import { api } from '../services/api';

export default function ArtisanJoinCTA({ onJoinClick, onHowVerificationWorks }) {
  const handleJoin = () => {
    api.trackEvent('artisan_join_clicked', { source: 'landing_artisan_cta' });
    onJoinClick();
  };

  return (
    <section id="for-artisans" className="section">
      <div className="container">
        <div className="artisan-cta-panel">
          <div>
            <span className="eyebrow">FOR SKILLED ARTISANS IN BUEA</span>
            <h2 className="section-heading" style={{ marginTop: '10px' }}>
              Your skills deserve to be seen.
            </h2>
            <p className="section-subcopy">
              Build a simple professional profile, share evidence of your work and grow a reputation through confirmed
              customer jobs. Basic registration and core verification are free during the pilot.
            </p>

            <ul
              style={{
                marginTop: '20px',
                paddingLeft: 0,
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                fontSize: '14px',
                color: 'var(--color-deep-text)'
              }}
            >
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={16} color="#159B8B" aria-hidden="true" />
                <span>Start with work photos and references — formal certificates are not required for every task.</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={16} color="#159B8B" aria-hidden="true" />
                <span>Reviews only come from platform-confirmed jobs so your reputation stays fair.</span>
              </li>
            </ul>

            <div style={{ marginTop: '24px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '14px' }}>
              <button type="button" className="btn btn-primary" onClick={handleJoin}>
                Join as an artisan
                <ArrowRight size={16} aria-hidden="true" />
              </button>
              <button type="button" className="btn-text-link" onClick={onHowVerificationWorks}>
                See how skill verification works
              </button>
            </div>
          </div>

          <div>
            <img
              src={artisanWorkshopLg}
              srcSet={`${artisanWorkshopSm} 540w, ${artisanWorkshopLg} 960w`}
              sizes="(max-width: 767px) 92vw, 480px"
              alt="Plumbing artisan inspecting pipe fittings and measuring tools on a workbench"
              className="artisan-workshop-photo"
              loading="lazy"
              width="600"
              height="450"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
