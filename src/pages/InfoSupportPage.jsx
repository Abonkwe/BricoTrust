import React, { useState } from 'react';
import { ArrowLeft, Phone, Mail, CheckCircle2, AlertCircle } from 'lucide-react';
import { api } from '../services/api';

export default function InfoSupportPage({ mode, initialTopic = 'Customer support', onBack }) {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [topic, setTopic] = useState(initialTopic);
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [ticket, setTicket] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const res = await api.submitSupportInquiry({ name, contact, topic, message });
      setTicket(res);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (mode === 'privacy') {
    return (
      <section className="section">
        <div className="container" style={{ maxWidth: '820px' }}>
          <button type="button" className="btn-text-link" onClick={onBack}>
            <ArrowLeft size={16} aria-hidden="true" />
            Back to homepage
          </button>
          <div className="card" style={{ padding: '28px', marginTop: '12px' }}>
            <span className="eyebrow">PRIVACY NOTICE · MOLYKO PILOT</span>
            <h1 style={{ fontSize: '28px', fontWeight: 700, marginTop: '8px' }}>How BricoTrust handles your data</h1>
            <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '15px', color: 'var(--color-deep-text)' }}>
              <p>
                <strong>Minimal collection during search:</strong> You can describe a plumbing issue and check eligible
                artisans using a neighbourhood or landmark without creating an account or sharing your exact home address.
              </p>
              <p>
                <strong>Booking contact sharing:</strong> Your name and phone/WhatsApp number are only collected when you
                submit a booking request, and are shared only with the artisan you chose.
              </p>
              <p>
                <strong>Artisan &amp; referee privacy:</strong> Identity documents sighted during onboarding and referee
                phone numbers are never displayed on public profiles or Trust Passports.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (mode === 'terms') {
    return (
      <section className="section">
        <div className="container" style={{ maxWidth: '820px' }}>
          <button type="button" className="btn-text-link" onClick={onBack}>
            <ArrowLeft size={16} aria-hidden="true" />
            Back to homepage
          </button>
          <div className="card" style={{ padding: '28px', marginTop: '12px' }}>
            <span className="eyebrow">TERMS OF USE · MOLYKO PILOT</span>
            <h1 style={{ fontSize: '28px', fontWeight: 700, marginTop: '8px' }}>Pilot terms and service boundaries</h1>
            <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '15px', color: 'var(--color-deep-text)' }}>
              <p>
                <strong>Scope of assessments:</strong> A “Skill assessed” badge records that an authorised assessor
                checked a specific plumbing task on a stated date. It is not a universal government licence and does not
                cover tasks outside the stated scope.
              </p>
              <p>
                <strong>Pricing &amp; quotes:</strong> Artisans provide estimates after reviewing job details. Confirm
                labour, materials, and travel charges before work starts.
              </p>
              <p>
                <strong>Disputes &amp; pilot support:</strong> BricoTrust logs booking records and helps refer disputes for
                human review via the Buea Pilot Desk, without promising an automated financial warranty during the pilot.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: '820px' }}>
        <button type="button" className="btn-text-link" onClick={onBack}>
          <ArrowLeft size={16} aria-hidden="true" />
          Back to homepage
        </button>

        <div className="card" style={{ padding: '28px', marginTop: '12px' }}>
          <span className="eyebrow">PILOT DESK SUPPORT &amp; PROPERTY MANAGERS</span>
          <h1 style={{ fontSize: '28px', fontWeight: 700, marginTop: '8px' }}>
            Contact the BricoTrust Buea Pilot Desk
          </h1>
          <p style={{ marginTop: '8px', fontSize: '15px', color: 'var(--color-muted-slate)' }}>
            Reach our team for assisted plumbing requests (including without a smartphone), job dispute reporting, or
            property management pilot inquiries in Molyko, Buea.
          </p>

          <div style={{ marginTop: '16px', display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            <a href="tel:+237670000000" className="btn btn-secondary">
              <Phone size={15} aria-hidden="true" />
              +237 670 00 00 00 (Mon–Sat, 08:00–18:00)
            </a>
            <a href="mailto:pilot-support@bricotrust.cm" className="btn btn-secondary">
              <Mail size={15} aria-hidden="true" />
              pilot-support@bricotrust.cm
            </a>
          </div>

          {ticket ? (
            <div className="alert-box alert-success" style={{ marginTop: '22px' }}>
              <CheckCircle2 size={20} style={{ flexShrink: 0 }} aria-hidden="true" />
              <div>
                <strong>Message recorded ({ticket.ticketId})</strong>
                <p style={{ marginTop: '4px' }}>{ticket.message}</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate style={{ marginTop: '22px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {error && (
                <div className="alert-box alert-error" role="alert">
                  <AlertCircle size={18} aria-hidden="true" />
                  <span>{error}</span>
                </div>
              )}

              <div className="form-field">
                <label htmlFor="sup-topic" className="form-label">Topic</label>
                <select id="sup-topic" className="form-select" value={topic} onChange={(e) => setTopic(e.target.value)}>
                  <option value="Customer support">Customer support / assisted request</option>
                  <option value="Report a job issue">Report a job or booking issue</option>
                  <option value="Property manager / business pilot">Property manager / business maintenance pilot</option>
                  <option value="Artisan verification question">Artisan verification question</option>
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
                <div className="form-field">
                  <label htmlFor="sup-name" className="form-label">Your name</label>
                  <input
                    id="sup-name"
                    type="text"
                    className="form-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Optional"
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="sup-contact" className="form-label">Phone, WhatsApp, or email</label>
                  <input
                    id="sup-contact"
                    type="text"
                    className="form-input"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="e.g. +237 670 00 00 00"
                  />
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="sup-msg" className="form-label">How can we help?</label>
                <textarea
                  id="sup-msg"
                  className="form-textarea"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share your request, booking reference, or maintenance pilot inquiry."
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button type="submit" className="btn btn-primary" disabled={submitting}>
                  {submitting ? 'Sending...' : 'Send message to Pilot Desk'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

