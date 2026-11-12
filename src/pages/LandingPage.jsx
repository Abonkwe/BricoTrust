import React, { useEffect, useState } from 'react';
import HeroRequestForm from '../components/HeroRequestForm';
import TrustProofStrip from '../components/TrustProofStrip';
import HowItWorks from '../components/HowItWorks';
import ServiceCategoryCard from '../components/ServiceCategoryCard';
import ArtisanMatchCard from '../components/ArtisanMatchCard';
import TrustPassportPreview from '../components/TrustPassportPreview';
import AIMatchingExplainer from '../components/AIMatchingExplainer';
import ArtisanJoinCTA from '../components/ArtisanJoinCTA';
import FAQAccordion from '../components/FAQAccordion';
import { api } from '../services/api';

const PILOT_SERVICES = [
  {
    id: 'leak-repair',
    name: 'Leak repair',
    description: 'Under-sink pipes, visible supply joints, toilet cistern drips, and leaking wall connections.',
    requiresScopeReview: false
  },
  {
    id: 'tap-fixture-installation',
    name: 'Tap / fixture installation',
    description: 'Kitchen and bathroom taps, showerheads, basin mixers, and shut-off valve replacements.',
    requiresScopeReview: false
  },
  {
    id: 'drain-blockage',
    name: 'Drain blockage',
    description: 'Blocked kitchen sinks, bathroom floor drains, and slow household waste pipes.',
    requiresScopeReview: false
  },
  {
    id: 'pipe-installation',
    name: 'Pipe installation',
    description: 'Short PVC or PPR household line runs, tank feeds, and new indoor outlet connections.',
    requiresScopeReview: true,
    reviewNote: 'Multi-unit or main-line installations undergo scope review before matching.'
  }
];

export default function LandingPage({
  formInputRef,
  preselectedTask,
  onSelectService,
  onRequestParsed,
  onViewPassport,
  onRequestBooking,
  onJoinArtisan,
  onOpenSupport
}) {
  const [previewArtisans, setPreviewArtisans] = useState([]);
  const [previewError, setPreviewError] = useState('');

  useEffect(() => {
    let active = true;
    api
      .getPreviewArtisans()
      .then((res) => {
        if (active) setPreviewArtisans(res.artisans || []);
      })
      .catch(() => {
        if (active) setPreviewError('Connect the BricoTrust server to inspect live sample artisan previews.');
      });
    return () => {
      active = false;
    };
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* 02. Hero + Request Search */}
      <HeroRequestForm
        formInputRef={formInputRef}
        preselectedTask={preselectedTask}
        onRequestParsed={onRequestParsed}
        onHowItWorksClick={() => scrollToSection('how-it-works')}
      />

      {/* 03. Trust Proof Strip */}
      <TrustProofStrip />

      {/* 04. How It Works */}
      <HowItWorks />

      {/* 05. Service Scope / Category Cards */}
      <section id="service-scope" className="section" style={{ backgroundColor: 'var(--color-white)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <span className="eyebrow">PILOT SERVICE SCOPE · MOLYKO, BUEA</span>
          <h2 className="section-heading" style={{ marginTop: '10px' }}>
            Focused plumbing services we support today
          </h2>
          <p className="section-subcopy">
            During the Molyko pilot, BricoTrust covers four everyday residential plumbing tasks so every listed skill can
            be checked properly.
          </p>

          <div className="services-grid">
            {PILOT_SERVICES.map((service) => (
              <ServiceCategoryCard
                key={service.id}
                service={service}
                onSelectService={onSelectService}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 06. Artisan Match Preview */}
      <section id="match-preview" className="section">
        <div className="container">
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '16px' }}>
            <div>
              <span className="eyebrow">ARTISAN MATCH PREVIEW</span>
              <h2 className="section-heading" style={{ marginTop: '10px' }}>
                What a recommended artisan looks like
              </h2>
              <p className="section-subcopy">
                Instead of generic star ratings alone, each profile puts assessed skills, references, and confirmed
                availability status upfront.
              </p>
            </div>
            <span className="badge badge-demo">Sample data shown for pilot preview</span>
          </div>

          {previewError ? (
            <div className="alert-box alert-info" style={{ marginTop: '24px' }}>
              {previewError}
            </div>
          ) : (
            <div className="matches-grid">
              {previewArtisans.map((artisan) => (
                <ArtisanMatchCard
                  key={artisan.id}
                  artisan={artisan}
                  onViewPassport={onViewPassport}
                  onRequestBooking={onRequestBooking}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 07. Artisan Trust Passport */}
      <TrustPassportPreview onOpenFullPassport={onViewPassport} />

      {/* 08. AI Matching Explanation */}
      <AIMatchingExplainer
        onTryPrompt={() => {
          scrollToSection('hero-request');
          setTimeout(() => formInputRef?.current?.focus(), 250);
        }}
      />

      {/* 09. For Artisans CTA */}
      <ArtisanJoinCTA
        onJoinClick={onJoinArtisan}
        onHowVerificationWorks={() => scrollToSection('trust-passport')}
      />

      {/* 10. FAQ & Contact */}
      <FAQAccordion onOpenSupport={onOpenSupport} />
    </>
  );
}

