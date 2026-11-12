import React, { useState } from 'react';
import { X, AlertCircle, CheckCircle2, CalendarClock, ShieldCheck } from 'lucide-react';
import { api } from '../services/api';

export default function BookingModal({ artisan, requestContext, onClose, onBookingCompleted }) {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [areaDetails, setAreaDetails] = useState(requestContext?.location || 'Molyko, Buea');
  const [preferredWindow, setPreferredWindow] = useState(requestContext?.urgency || 'Today');
  const [notes, setNotes] = useState(requestContext?.description || '');
  const [consentAccepted, setConsentAccepted] = useState(false);

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');
  const [booking, setBooking] = useState(null);

  // One-time completion confirmation & verified review state (Section 10.4 step 6)
  const [completionCode, setCompletionCode] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [completionResult, setCompletionResult] = useState(null);
  const [completionError, setCompletionError] = useState('');
  const [completing, setCompleting] = useState(false);

  if (!artisan) return null;

  const handleSubmitBooking = async (e) => {
    e.preventDefault();
    const nextErrors = {};
    if (!customerName.trim() || customerName.trim().length < 2) {
      nextErrors.customerName = 'Enter your name so the artisan knows who to ask for.';
    }
    if (!customerPhone.trim() || customerPhone.trim().length < 8) {
      nextErrors.customerPhone = 'Enter a phone or WhatsApp number to receive a quote and confirmation.';
    }
    if (!consentAccepted) {
      nextErrors.consentAccepted = 'Confirm consent to share these job details with the selected artisan.';
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setServerError('');
    setSubmitting(true);

    try {
      const res = await api.createBooking({
        requestId: requestContext?.id || null,
        artisanId: artisan.id,
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        areaDetails: areaDetails.trim(),
        preferredWindow,
        notes: notes.trim(),
        consentAccepted
      });
      setBooking(res.booking);
      setCompletionCode(res.booking.completionCode);
      api.trackEvent('artisan_contact_or_booking_requested', {
        artisanId: artisan.id,
        bookingId: res.booking.id
      });
    } catch (err) {
      setServerError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleConfirmCompletion = async (e) => {
    e.preventDefault();
    setCompletionError('');
    setCompleting(true);
    try {
      const res = await api.completeBooking(booking.id, {
        completionCode: completionCode.trim(),
        reviewComment: reviewComment.trim()
      });
      setCompletionResult(res);
      if (onBookingCompleted) {
        onBookingCompleted(artisan.id, res);
      }
    } catch (err) {
      setCompletionError(err.message);
    } finally {
      setCompleting(false);
    }
  };

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="booking-modal-title">
      <div className="modal-panel">
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
          <div>
            <h2 id="booking-modal-title" style={{ fontSize: '22px', fontWeight: 700 }}>
              {booking ? 'Booking request sent' : `Request booking with ${artisan.displayName}`}
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--color-muted-slate)', marginTop: '4px' }}>
              {artisan.trade} · {artisan.primaryArea}, Buea
              {artisan.isDemoData ? ' · Demo profile / Sample data' : ''}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close booking dialog"
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '10px',
              border: '1px solid var(--color-border)',
              background: 'var(--color-white)',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        {!booking ? (
          <form onSubmit={handleSubmitBooking} noValidate style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {serverError && (
              <div className="alert-box alert-error" role="alert">
                <AlertCircle size={18} style={{ flexShrink: 0 }} aria-hidden="true" />
                <span>{serverError}</span>
              </div>
            )}

            <div className="alert-box alert-info">
              <CalendarClock size={18} style={{ flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
              <div>
                <strong>How booking works:</strong> Submitting sends a pending request. Your booking is only confirmed
                once {artisan.displayName} accepts and agrees a quote with you.
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="bk-name" className="form-label">Your name</label>
              <input
                id="bk-name"
                type="text"
                className="form-input"
                placeholder="e.g. Ndi Clovis"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                aria-invalid={Boolean(errors.customerName)}
              />
              {errors.customerName && <span className="form-error">{errors.customerName}</span>}
            </div>

            <div className="form-field">
              <label htmlFor="bk-phone" className="form-label">Phone or WhatsApp number</label>
              <input
                id="bk-phone"
                type="tel"
                className="form-input"
                placeholder="e.g. +237 670 00 00 00"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                aria-invalid={Boolean(errors.customerPhone)}
              />
              {errors.customerPhone ? (
                <span className="form-error">{errors.customerPhone}</span>
              ) : (
                <span className="form-helper">Shared only with this selected artisan to coordinate your quote.</span>
              )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
              <div className="form-field">
                <label htmlFor="bk-area" className="form-label">Area / landmark</label>
                <input
                  id="bk-area"
                  type="text"
                  className="form-input"
                  value={areaDetails}
                  onChange={(e) => setAreaDetails(e.target.value)}
                />
              </div>

              <div className="form-field">
                <label htmlFor="bk-window" className="form-label">Preferred timing</label>
                <select
                  id="bk-window"
                  className="form-select"
                  value={preferredWindow}
                  onChange={(e) => setPreferredWindow(e.target.value)}
                >
                  <option value="Today">Today</option>
                  <option value="Within a few days">Within a few days</option>
                  <option value="Flexible">Flexible</option>
                </select>
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="bk-notes" className="form-label">Job notes for quote</label>
              <textarea
                id="bk-notes"
                className="form-textarea"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Describe visible pipe access or preferred contact hours."
              />
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
                  I consent to BricoTrust sharing my name, phone number, and job summary with {artisan.displayName} so they
                  can respond with a quote.
                </span>
              </label>
              {errors.consentAccepted && <span className="form-error" style={{ marginTop: '6px' }}>{errors.consentAccepted}</span>}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', flexWrap: 'wrap' }}>
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary" disabled={submitting}>
                {submitting ? 'Sending request...' : 'Send booking request'}
              </button>
            </div>
          </form>
        ) : (
          <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="alert-box alert-warning">
              <CalendarClock size={18} style={{ flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
              <div>
                <strong>Status: {booking.statusLabel}</strong>
                <div style={{ marginTop: '4px' }}>
                  Reference: <strong>{booking.id}</strong> · Contact: {booking.customerPhoneMasked}. Do not pay upfront;
                  confirm labour, materials, and travel with the artisan before work begins.
                </div>
              </div>
            </div>

            {/* Demo completion confirmation & verified-review rule (Section 10.4 step 6) */}
            {!completionResult ? (
              <form
                onSubmit={handleConfirmCompletion}
                style={{
                  border: '1px solid var(--color-border)',
                  borderRadius: '14px',
                  padding: '16px',
                  backgroundColor: 'var(--color-off-white)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                  <strong style={{ fontSize: '15px', color: 'var(--color-deep-forest)' }}>
                    Demo: One-time completion confirmation &amp; verified review
                  </strong>
                  <span className="badge badge-demo">Demo workflow</span>
                </div>
                <p style={{ fontSize: '13px', color: 'var(--color-muted-slate)' }}>
                  Reviews on BricoTrust are locked until the completed job is confirmed using a one-time code
                  (demo code for {booking.id}: <strong>{booking.completionCode}</strong>).
                </p>

                {completionError && <div className="alert-box alert-error">{completionError}</div>}

                <div className="form-field">
                  <label htmlFor="bk-code" className="form-label">One-time completion code</label>
                  <input
                    id="bk-code"
                    type="text"
                    className="form-input"
                    value={completionCode}
                    onChange={(e) => setCompletionCode(e.target.value)}
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="bk-review" className="form-label">Verified job review (optional)</label>
                  <textarea
                    id="bk-review"
                    className="form-textarea"
                    placeholder="e.g. Fixed the under-sink leak cleanly and explained the spare pipe cost."
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                  />
                </div>

                <button type="submit" className="btn btn-secondary" disabled={completing}>
                  <ShieldCheck size={16} aria-hidden="true" />
                  {completing ? 'Confirming...' : 'Confirm job completed & unlock review'}
                </button>
              </form>
            ) : (
              <div className="alert-box alert-success">
                <CheckCircle2 size={18} style={{ flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
                <div>
                  <strong>Job confirmed complete ({completionResult.booking.id})</strong>
                  <div style={{ marginTop: '4px' }}>
                    {artisan.displayName} now has {completionResult.updatedConfirmedJobsCount} platform-confirmed jobs
                    {completionResult.booking.reviewSubmitted ? ' and your verified review is attached.' : '.'}
                  </div>
                </div>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button type="button" className="btn btn-primary" onClick={onClose}>
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

