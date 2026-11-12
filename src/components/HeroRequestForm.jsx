import React, { useState } from 'react';
import { MapPin, ShieldCheck, ArrowRight, AlertCircle, Sparkles } from 'lucide-react';
import heroPlumberLg from '../assets/hero-plumber.webp';
import heroPlumberSm from '../assets/hero-plumber-sm.webp';
import { api } from '../services/api';

const TASK_OPTIONS = [
  'Plumbing — Leak repair',
  'Plumbing — Tap / fixture installation',
  'Plumbing — Drain blockage',
  'Plumbing — Pipe installation',
  'Plumbing — Describe problem below'
];

const TASK_MAP = {
  'Plumbing — Leak repair': 'Leak repair',
  'Plumbing — Tap / fixture installation': 'Tap / fixture installation',
  'Plumbing — Drain blockage': 'Drain blockage',
  'Plumbing — Pipe installation': 'Pipe installation',
  'Plumbing — Describe problem below': ''
};

export default function HeroRequestForm({
  onRequestParsed,
  onHowItWorksClick,
  formInputRef,
  preselectedTask
}) {
  const [selectedTaskOption, setSelectedTaskOption] = useState(
    preselectedTask ? `Plumbing — ${preselectedTask}` : 'Plumbing — Leak repair'
  );
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('Molyko, Buea');
  const [urgency, setUrgency] = useState('Today');
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');

  React.useEffect(() => {
    if (preselectedTask) {
      const matchedOption = `Plumbing — ${preselectedTask}`;
      if (TASK_OPTIONS.includes(matchedOption)) {
        setSelectedTaskOption(matchedOption);
      }
    }
  }, [preselectedTask]);

  const fillDemoExample = () => {
    setSelectedTaskOption('Plumbing — Leak repair');
    setDescription('A pipe is leaking under my sink in Molyko. I need help today.');
    setLocation('Molyko, Buea');
    setUrgency('Today');
    setErrors({});
    setServerError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = {};

    if (!description.trim() || description.trim().length < 5) {
      nextErrors.description = 'Describe what needs fixing (at least 5 characters) so we can match the right skill.';
    }
    if (!location.trim()) {
      nextErrors.location = 'Enter a neighbourhood or landmark near Molyko, Buea (exact home address is not needed).';
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setServerError('');
    setSubmitting(true);
    api.trackEvent('hero_request_started', {
      selectedTask: selectedTaskOption,
      urgency
    });

    try {
      const mappedTask = TASK_MAP[selectedTaskOption] || '';
      const parsePayload = {
        service: 'Plumbing',
        description: mappedTask && !description.toLowerCase().includes(mappedTask.toLowerCase())
          ? `${mappedTask}: ${description.trim()}`
          : description.trim(),
        location: location.trim(),
        urgency
      };
      const parsed = await api.parseRequest(parsePayload);
      onRequestParsed({
        rawDescription: description.trim(),
        selectedTask: mappedTask || parsed.extracted?.task || '',
        location: location.trim(),
        urgency,
        parsed
      });
    } catch (err) {
      setServerError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <section id="hero-request" className="hero-section">
        <div className="container">
          <div className="hero-grid">
            {/* Left column: Headline, supporting copy, request card & reassurance */}
            <div>
              <span className="eyebrow hero-eyebrow">LOCAL SERVICES, BACKED BY EVIDENCE</span>
              <h1 className="hero-title">Find skilled local artisans. Hire with confidence.</h1>
              <p className="hero-subtitle">
                Tell us what needs fixing. BricoTrust helps you discover local plumbers using skill-specific evidence,
                community references and confirmed work history.
              </p>

              <div className="hero-cta-row">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => formInputRef?.current?.focus()}
                >
                  Request a plumbing service
                  <ArrowRight size={16} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className="btn btn-secondary-dark"
                  onClick={onHowItWorksClick}
                >
                  How BricoTrust works
                </button>
              </div>

              <div className="hero-scope-note">
                <MapPin size={15} color="#B5D83D" aria-hidden="true" />
                <span>Pilot service area: Molyko, Buea · Plumbing services only</span>
              </div>

              {/* Hero Request Card (Primary action in hero, no account required) */}
              <form className="hero-request-card" onSubmit={handleSubmit} noValidate aria-label="Request a plumbing service">
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '14px' }}>
                  <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-deep-forest)' }}>
                    Describe your plumbing issue
                  </h2>
                  <button
                    type="button"
                    className="hero-example-btn"
                    onClick={fillDemoExample}
                  >
                    Try example: leaking sink
                  </button>
                </div>

                {serverError && (
                  <div className="alert-box alert-error" role="alert" style={{ marginBottom: '14px' }}>
                    <AlertCircle size={18} style={{ flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
                    <div>
                      <strong>Could not process request:</strong> {serverError}
                    </div>
                  </div>
                )}

                <div className="hero-form-grid">
                  <div className="form-field">
                    <label htmlFor="hero-need" className="form-label">
                      What do you need?
                    </label>
                    <select
                      id="hero-need"
                      className="form-select"
                      value={selectedTaskOption}
                      onChange={(e) => setSelectedTaskOption(e.target.value)}
                    >
                      {TASK_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-field">
                    <label htmlFor="hero-when" className="form-label">
                      When do you need it?
                    </label>
                    <select
                      id="hero-when"
                      className="form-select"
                      value={urgency}
                      onChange={(e) => setUrgency(e.target.value)}
                    >
                      <option value="Today">Today</option>
                      <option value="Within a few days">Within a few days</option>
                      <option value="Flexible">Flexible</option>
                    </select>
                  </div>

                  <div className="form-field hero-form-full">
                    <label htmlFor="hero-description" className="form-label">
                      Describe the problem
                    </label>
                    <textarea
                      ref={formInputRef}
                      id="hero-description"
                      className="form-textarea"
                      placeholder="A pipe is leaking under my kitchen sink."
                      value={description}
                      onChange={(e) => {
                        setDescription(e.target.value);
                        if (errors.description) setErrors((prev) => ({ ...prev, description: '' }));
                      }}
                      aria-invalid={Boolean(errors.description)}
                      aria-describedby={errors.description ? 'hero-description-err' : 'hero-description-help'}
                    />
                    {errors.description ? (
                      <span id="hero-description-err" className="form-error" role="alert">
                        <AlertCircle size={14} aria-hidden="true" />
                        {errors.description}
                      </span>
                    ) : (
                      <span id="hero-description-help" className="form-helper">
                        AI assists by structuring your request — you review and confirm before matching.
                      </span>
                    )}
                  </div>

                  <div className="form-field hero-form-full">
                    <label htmlFor="hero-location" className="form-label">
                      Where do you need help?
                    </label>
                    <input
                      id="hero-location"
                      type="text"
                      className="form-input"
                      placeholder="e.g. Molyko, Buea — near UB Junction or Check Point"
                      value={location}
                      onChange={(e) => {
                        setLocation(e.target.value);
                        if (errors.location) setErrors((prev) => ({ ...prev, location: '' }));
                      }}
                      aria-invalid={Boolean(errors.location)}
                      aria-describedby={errors.location ? 'hero-location-err' : 'hero-location-help'}
                    />
                    {errors.location ? (
                      <span id="hero-location-err" className="form-error" role="alert">
                        <AlertCircle size={14} aria-hidden="true" />
                        {errors.location}
                      </span>
                    ) : (
                      <span id="hero-location-help" className="form-helper">
                        Pilot area: Molyko, Buea. A landmark is enough — no exact home address or GPS required.
                      </span>
                    )}
                  </div>
                </div>

                <div className="hero-form-footer">
                  <span style={{ fontSize: '12px', color: 'var(--color-muted-slate)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <Sparkles size={14} color="#159B8B" aria-hidden="true" />
                    No account required to check matches
                  </span>
                  <button type="submit" className="btn btn-primary" disabled={submitting}>
                    {submitting ? 'Structuring request...' : 'Find a plumber'}
                    <ArrowRight size={16} aria-hidden="true" />
                  </button>
                </div>
              </form>
            </div>

            {/* Right column: Human artisan photo + authentic BricoTrust evidence preview card */}
            <div className="hero-visual-col">
              <div className="hero-photo-frame">
                <img
                  src={heroPlumberLg}
                  srcSet={`${heroPlumberSm} 540w, ${heroPlumberLg} 960w`}
                  sizes="(max-width: 767px) 92vw, 480px"
                  alt="Plumber inspecting an under-sink pipe connection in a home kitchen"
                  className="hero-photo"
                  width="640"
                  height="688"
                />
              </div>

              <div className="hero-layered-card" aria-label="Sample Trust Passport snippet">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '15px', color: 'var(--color-deep-forest)' }}>
                    Evidence-backed recommendation
                  </span>
                  <span className="badge badge-demo">Illustrative sample</span>
                </div>
                <div style={{ marginTop: '10px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  <span className="badge badge-evidence">
                    <ShieldCheck size={13} aria-hidden="true" />
                    Skill assessed - leak repair
                  </span>
                  <span className="badge badge-identity">
                    Phone confirmed
                  </span>
                  <span className="badge badge-neutral">
                    3 platform-confirmed jobs
                  </span>
                </div>
                <p style={{ marginTop: '8px', fontSize: '12px', color: 'var(--color-muted-slate)' }}>
                  Each recommendation explains which task was assessed and what has not been checked.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Single restrained curved transition below hero (Section 2.3) */}
      <div className="hero-curve-wrap" aria-hidden="true">
        <svg className="hero-curve-svg" viewBox="0 0 1440 28" preserveAspectRatio="none">
          <path d="M0,0 C360,28 1080,28 1440,0 L1440,28 L0,28 Z" fill="#EAF4F2" />
        </svg>
      </div>
    </>
  );
}
