import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, AlertCircle, Sparkles, Phone, CheckCircle2, HelpCircle } from 'lucide-react';
import { api } from '../services/api';

const SUPPORTED_TASKS = [
  'Leak repair',
  'Tap / fixture installation',
  'Drain blockage',
  'Pipe installation'
];

export default function RequestPage({ initialDraft, onBack, onRequestSubmitted, onOpenSupport }) {
  const parsed = initialDraft?.parsed;
  const extracted = parsed?.extracted || {};

  const [description, setDescription] = useState(initialDraft?.rawDescription || '');
  const [task, setTask] = useState(
    initialDraft?.selectedTask || extracted.task || ''
  );
  const [location, setLocation] = useState(
    extracted.location || initialDraft?.location || 'Molyko, Buea'
  );
  const [urgency, setUrgency] = useState(
    extracted.urgency || initialDraft?.urgency || 'Today'
  );
  const [optionalBudget, setOptionalBudget] = useState(extracted.optionalBudget || '');
  const [contactPreference, setContactPreference] = useState(extracted.contactPreference || 'WhatsApp');

  const [clarificationAnswered, setClarificationAnswered] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');

  const handleClarificationPick = (option) => {
    if (SUPPORTED_TASKS.includes(option)) {
      setTask(option);
    } else {
      setLocation(option);
    }
    setClarificationAnswered(true);
    setErrors({});
    api.trackEvent('request_clarification_answered', { option });
  };

  const handleConfirmSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = {};

    if (!description.trim() || description.trim().length < 5) {
      nextErrors.description = 'Enter a short description of the problem (at least 5 characters).';
    }
    if (!task) {
      nextErrors.task = 'Select the plumbing task that best fits your issue.';
    }
    if (!location.trim()) {
      nextErrors.location = 'Enter a neighbourhood or landmark near Molyko, Buea.';
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setServerError('');
    setSubmitting(true);

    try {
      const res = await api.createRequest({
        service: 'Plumbing',
        task,
        description: description.trim(),
        location: location.trim(),
        urgency,
        optionalBudget: optionalBudget.trim() || null,
        contactPreference,
        consentConfirmed: true
      });
      api.trackEvent('request_submitted', {
        task,
        inPilotArea: res.request.inPilotArea
      });
      onRequestSubmitted(res.request);
    } catch (err) {
      setServerError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: '820px' }}>
        <button type="button" className="btn-text-link" onClick={onBack}>
          <ArrowLeft size={16} aria-hidden="true" />
          Back to landing page
        </button>

        <div className="card" style={{ padding: '28px', marginTop: '12px' }}>
          <span className="eyebrow">
            <Sparkles size={14} aria-hidden="true" />
            STEP 1 OF 2 · REVIEW STRUCTURED REQUEST
          </span>
          <h1 style={{ fontSize: '28px', fontWeight: 700, marginTop: '8px' }}>
            Confirm your plumbing request details
          </h1>
          <p style={{ marginTop: '8px', fontSize: '15px', color: 'var(--color-muted-slate)' }}>
            {parsed?.assistantNotice ||
              'Review and edit the structured fields below before our backend filters eligible plumbers.'}
          </p>

          {/* Emergency / hazardous human-support route (Section 6.2) */}
          {parsed?.emergencyGuidance?.flagged && (
            <div className="alert-box alert-error" role="alert" style={{ marginTop: '18px' }}>
              <AlertCircle size={20} style={{ flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
              <div>
                <strong>Possible urgent or hazardous situation detected</strong>
                <p style={{ marginTop: '4px' }}>{parsed.emergencyGuidance.message}</p>
                <div style={{ marginTop: '10px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  <a href={`tel:${parsed.emergencyGuidance.supportPhone}`} className="btn btn-secondary">
                    <Phone size={15} aria-hidden="true" />
                    Call Pilot Desk: {parsed.emergencyGuidance.supportPhone}
                  </a>
                  <button type="button" className="btn btn-secondary" onClick={onOpenSupport}>
                    Open support contact
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* One concise clarification question when ambiguous (Section 6.2 & 6.3) */}
          {parsed?.clarificationNeeded && !clarificationAnswered && (
            <div className="alert-box alert-warning" style={{ marginTop: '18px' }}>
              <HelpCircle size={20} style={{ flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
              <div style={{ width: '100%' }}>
                <strong>Quick clarification needed:</strong>
                <p style={{ marginTop: '4px' }}>{parsed.clarificationQuestion}</p>
                <div style={{ marginTop: '10px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {(parsed.clarificationOptions || []).map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      className="btn btn-secondary"
                      style={{ minHeight: '38px', padding: '6px 14px', fontSize: '13px' }}
                      onClick={() => handleClarificationPick(opt)}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {clarificationAnswered && (
            <div className="alert-box alert-success" style={{ marginTop: '18px' }}>
              <CheckCircle2 size={18} style={{ flexShrink: 0 }} aria-hidden="true" />
              <span>Clarification recorded. You can still adjust any field below before finding matches.</span>
            </div>
          )}

          {serverError && (
            <div className="alert-box alert-error" role="alert" style={{ marginTop: '18px' }}>
              <AlertCircle size={18} style={{ flexShrink: 0 }} aria-hidden="true" />
              <div>
                <strong>Submission failed:</strong> {serverError}
              </div>
            </div>
          )}

          <form onSubmit={handleConfirmSubmit} noValidate style={{ marginTop: '22px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
              <div className="form-field">
                <label htmlFor="req-service" className="form-label">Service / trade (Pilot scope)</label>
                <input id="req-service" type="text" className="form-input" value="Plumbing" readOnly />
              </div>

              <div className="form-field">
                <label htmlFor="req-task" className="form-label">Specific plumbing task</label>
                <select
                  id="req-task"
                  className="form-select"
                  value={task}
                  onChange={(e) => {
                    setTask(e.target.value);
                    if (errors.task) setErrors((prev) => ({ ...prev, task: '' }));
                  }}
                  aria-invalid={Boolean(errors.task)}
                >
                  <option value="">Select task...</option>
                  {SUPPORTED_TASKS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                {errors.task && <span className="form-error">{errors.task}</span>}
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="req-desc" className="form-label">Problem description</label>
              <textarea
                id="req-desc"
                className="form-textarea"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                aria-invalid={Boolean(errors.description)}
              />
              {errors.description && <span className="form-error">{errors.description}</span>}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
              <div className="form-field">
                <label htmlFor="req-loc" className="form-label">Location / landmark</label>
                <input
                  id="req-loc"
                  type="text"
                  className="form-input"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  aria-invalid={Boolean(errors.location)}
                />
                {errors.location ? (
                  <span className="form-error">{errors.location}</span>
                ) : (
                  <span className="form-helper">Pilot area: Molyko, Buea (landmarks accepted; no exact address needed yet).</span>
                )}
              </div>

              <div className="form-field">
                <label htmlFor="req-urgency" className="form-label">When do you need help?</label>
                <select
                  id="req-urgency"
                  className="form-select"
                  value={urgency}
                  onChange={(e) => setUrgency(e.target.value)}
                >
                  <option value="Today">Today</option>
                  <option value="Within a few days">Within a few days</option>
                  <option value="Flexible">Flexible</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
              <div className="form-field">
                <label htmlFor="req-budget" className="form-label">Optional budget note (not required)</label>
                <input
                  id="req-budget"
                  type="text"
                  className="form-input"
                  placeholder="e.g. Around 10,000 FCFA if parts are minor"
                  value={optionalBudget}
                  onChange={(e) => setOptionalBudget(e.target.value)}
                />
              </div>

              <div className="form-field">
                <label htmlFor="req-contact-pref" className="form-label">Preferred follow-up channel</label>
                <select
                  id="req-contact-pref"
                  className="form-select"
                  value={contactPreference}
                  onChange={(e) => setContactPreference(e.target.value)}
                >
                  <option value="WhatsApp">WhatsApp</option>
                  <option value="Phone call">Phone call</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', paddingTop: '8px' }}>
              <span style={{ fontSize: '13px', color: 'var(--color-muted-slate)' }}>
                No account creation required to view eligible plumbers.
              </span>
              <button type="submit" className="btn btn-primary" disabled={submitting}>
                {submitting ? 'Submitting...' : 'Confirm & view eligible plumbers'}
                <ArrowRight size={16} aria-hidden="true" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

