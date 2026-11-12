import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, AlertCircle, ShieldCheck } from 'lucide-react';
import { api } from '../services/api';

const PLUMBING_SKILLS = [
  'Leak repair',
  'Tap / fixture installation',
  'Drain blockage',
  'Pipe installation'
];

export default function ArtisanJoinPage({ onBack }) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [primaryArea, setPrimaryArea] = useState('Molyko');
  const [skills, setSkills] = useState(['Leak repair']);
  const [experienceSummary, setExperienceSummary] = useState('');
  const [referenceName, setReferenceName] = useState('');
  const [referenceRelationship, setReferenceRelationship] = useState('');
  const [consentAccepted, setConsentAccepted] = useState(false);

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');
  const [submittedApp, setSubmittedApp] = useState(null);

  const toggleSkill = (skill) => {
    setSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = {};
    if (!fullName.trim() || fullName.trim().length < 2) {
      nextErrors.fullName = 'Enter your full name.';
    }
    if (!phone.trim() || phone.trim().length < 8) {
      nextErrors.phone = 'Enter a valid phone or WhatsApp number.';
    }
    if (skills.length === 0) {
      nextErrors.skills = 'Select at least one plumbing task you want assessed.';
    }
    if (!consentAccepted) {
      nextErrors.consentAccepted = 'Accept the pilot verification consent to submit your profile.';
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setServerError('');
    setSubmitting(true);

    try {
      const res = await api.submitArtisanApplication({
        fullName: fullName.trim(),
        phone: phone.trim(),
        primaryArea,
        skills,
        experienceSummary: experienceSummary.trim(),
        referenceName: referenceName.trim(),
        referenceRelationship: referenceRelationship.trim(),
        consentAccepted
      });
      setSubmittedApp(res);
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
          Back to homepage
        </button>

        <div className="card" style={{ padding: '28px', marginTop: '12px' }}>
          <span className="eyebrow">FREE PILOT ONBOARDING · MOLYKO, BUEA</span>
          <h1 style={{ fontSize: '28px', fontWeight: 700, marginTop: '8px' }}>
            Join BricoTrust as a plumbing artisan
          </h1>
          <p style={{ marginTop: '8px', fontSize: '15px', color: 'var(--color-muted-slate)' }}>
            Basic registration and core task verification are free during the pilot. Submitting this form creates a
            profile request — an authorised local assessor schedules your practical check before any skill badge appears.
          </p>

          {submittedApp ? (
            <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="alert-box alert-success">
                <CheckCircle2 size={20} style={{ flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
                <div>
                  <strong>Profile request received ({submittedApp.application.id})</strong>
                  <p style={{ marginTop: '4px' }}>{submittedApp.message}</p>
                </div>
              </div>

              <div className="passport-block">
                <div className="passport-block-label">Server-controlled verification state</div>
                <span className="badge badge-pending">
                  <ShieldCheck size={13} aria-hidden="true" />
                  {submittedApp.application.verificationStatusLabel}
                </span>
                <p style={{ fontSize: '13px', color: 'var(--color-muted-slate)', marginTop: '8px' }}>
                  Tasks requested for assessment: {submittedApp.application.skills.join(', ')} · Area:{' '}
                  {submittedApp.application.primaryArea}, Buea.
                </p>
              </div>

              <div>
                <button type="button" className="btn btn-primary" onClick={onBack}>
                  Return to homepage
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate style={{ marginTop: '22px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {serverError && (
                <div className="alert-box alert-error" role="alert">
                  <AlertCircle size={18} aria-hidden="true" />
                  <span>{serverError}</span>
                </div>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                <div className="form-field">
                  <label htmlFor="art-name" className="form-label">Full name</label>
                  <input
                    id="art-name"
                    type="text"
                    className="form-input"
                    placeholder="e.g. Tanyi Emmanuel"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    aria-invalid={Boolean(errors.fullName)}
                  />
                  {errors.fullName && <span className="form-error">{errors.fullName}</span>}
                </div>

                <div className="form-field">
                  <label htmlFor="art-phone" className="form-label">Phone / WhatsApp number</label>
                  <input
                    id="art-phone"
                    type="tel"
                    className="form-input"
                    placeholder="e.g. +237 670 00 00 00"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    aria-invalid={Boolean(errors.phone)}
                  />
                  {errors.phone && <span className="form-error">{errors.phone}</span>}
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="art-area" className="form-label">Primary service area in Buea</label>
                <select
                  id="art-area"
                  className="form-select"
                  value={primaryArea}
                  onChange={(e) => setPrimaryArea(e.target.value)}
                >
                  <option value="Molyko">Molyko (UB Junction / Dirty South / Check Point)</option>
                  <option value="Bonduma">Bonduma</option>
                  <option value="Mile 17">Mile 17</option>
                  <option value="Great Soppo">Great Soppo</option>
                  <option value="Muea">Muea</option>
                </select>
              </div>

              <fieldset style={{ border: '1px solid var(--color-border)', borderRadius: '12px', padding: '14px' }}>
                <legend className="form-label" style={{ padding: '0 6px' }}>
                  Plumbing tasks you perform (select for assessment)
                </legend>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '10px', marginTop: '6px' }}>
                  {PLUMBING_SKILLS.map((skill) => (
                    <label key={skill} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', cursor: 'pointer', minHeight: '36px' }}>
                      <input
                        type="checkbox"
                        checked={skills.includes(skill)}
                        onChange={() => toggleSkill(skill)}
                        style={{ width: '18px', height: '18px' }}
                      />
                      <span>{skill}</span>
                    </label>
                  ))}
                </div>
                {errors.skills && <span className="form-error" style={{ marginTop: '6px' }}>{errors.skills}</span>}
              </fieldset>

              <div className="form-field">
                <label htmlFor="art-exp" className="form-label">Work background &amp; tools (optional)</label>
                <textarea
                  id="art-exp"
                  className="form-textarea"
                  placeholder="Describe the plumbing jobs you handle regularly and whether you carry your own pipe wrench, cutter, or testing tools."
                  value={experienceSummary}
                  onChange={(e) => setExperienceSummary(e.target.value)}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                <div className="form-field">
                  <label htmlFor="art-ref-name" className="form-label">Past client or community referee (optional)</label>
                  <input
                    id="art-ref-name"
                    type="text"
                    className="form-input"
                    placeholder="Name or role (phone checked later by Pilot Desk)"
                    value={referenceName}
                    onChange={(e) => setReferenceName(e.target.value)}
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="art-ref-rel" className="form-label">Referee relationship (optional)</label>
                  <input
                    id="art-ref-rel"
                    type="text"
                    className="form-input"
                    placeholder="e.g. Hostel caretaker in Check Point"
                    value={referenceRelationship}
                    onChange={(e) => setReferenceRelationship(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={consentAccepted}
                    onChange={(e) => setConsentAccepted(e.target.checked)}
                    style={{ width: '18px', height: '18px', marginTop: '2px' }}
                  />
                  <span>
                    I understand BricoTrust does not guarantee work or income, and that verification badges are issued
                    only after phone confirmation and task-specific assessment.
                  </span>
                </label>
                {errors.consentAccepted && <span className="form-error" style={{ marginTop: '6px' }}>{errors.consentAccepted}</span>}
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button type="button" className="btn btn-secondary" onClick={onBack}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={submitting}>
                  {submitting ? 'Submitting...' : 'Submit free artisan profile'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

