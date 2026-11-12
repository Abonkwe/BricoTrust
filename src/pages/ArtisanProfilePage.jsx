import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  ShieldCheck,
  BadgeCheck,
  UserRound,
  Lock,
  AlertCircle,
  CalendarClock,
  ArrowRight,
  RotateCcw
} from 'lucide-react';
import { api } from '../services/api';

export default function ArtisanProfilePage({ artisanId, onBack, onRequestBooking }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [profile, setProfile] = useState(null);
  const [passport, setPassport] = useState(null);

  const loadData = async () => {
    if (!artisanId) return;
    setLoading(true);
    setError('');
    try {
      const [pubRes, passRes] = await Promise.all([
        api.getPublicProfile(artisanId),
        api.getTrustPassport(artisanId)
      ]);
      setProfile(pubRes.artisan);
      setPassport(passRes.passport);
      api.trackEvent('trust_passport_opened', { artisanId });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [artisanId]);

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: '920px' }}>
        <button type="button" className="btn-text-link" onClick={onBack}>
          <ArrowLeft size={16} aria-hidden="true" />
          Back
        </button>

        {loading && (
          <div className="card" style={{ padding: '32px', marginTop: '14px' }} role="status">
            Loading artisan profile and Trust Passport…
          </div>
        )}

        {!loading && error && (
          <div className="alert-box alert-error" role="alert" style={{ marginTop: '14px', flexDirection: 'column' }}>
            <div>{error}</div>
            <button type="button" className="btn btn-secondary" onClick={loadData}>
              <RotateCcw size={15} aria-hidden="true" />
              Retry
            </button>
          </div>
        )}

        {!loading && !error && profile && passport && (
          <div style={{ marginTop: '14px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Header Summary Card */}
            <div className="card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div className="artisan-avatar" style={{ width: '64px', height: '64px', fontSize: '20px' }} aria-hidden="true">
                    {profile.initials}
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                      <h1 style={{ fontSize: '28px', fontWeight: 700 }}>{profile.displayName}</h1>
                      {passport.isDemoData && (
                        <span className="badge badge-demo">
                          {passport.demoLabel || 'Illustrative demo profile'}
                        </span>
                      )}
                    </div>
                    <p style={{ marginTop: '4px', fontSize: '15px', color: 'var(--color-muted-slate)' }}>
                      {profile.trade} · Covers {(profile.serviceAreas || []).join(', ')}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => onRequestBooking(profile)}
                >
                  Request booking
                  <ArrowRight size={16} aria-hidden="true" />
                </button>
              </div>

              <p style={{ marginTop: '16px', fontSize: '15px', color: 'var(--color-deep-text)' }}>
                {profile.bio}
              </p>

              <div className="artisan-details-list" style={{ marginTop: '16px' }}>
                <div>
                  <span style={{ display: 'block', fontSize: '12px', color: 'var(--color-muted-slate)' }}>Availability</span>
                  {profile.availability?.confirmed ? (
                    <strong style={{ color: 'var(--color-success-text)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                      <CalendarClock size={14} aria-hidden="true" />
                      {profile.availability.summary} ({profile.availability.displayTime})
                    </strong>
                  ) : (
                    <span style={{ color: 'var(--color-warning-text)', fontWeight: 600 }}>
                      Availability not confirmed
                    </span>
                  )}
                </div>
                <div>
                  <span style={{ display: 'block', fontSize: '12px', color: 'var(--color-muted-slate)' }}>Pricing &amp; quote</span>
                  <strong>{profile.quotePolicy}</strong>
                </div>
              </div>
            </div>

            {/* Full Trust Passport Details (All 6 UI elements) */}
            <div className="passport-card">
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <div>
                  <span className="eyebrow">TRUST PASSPORT RECORD</span>
                  <h2 style={{ fontSize: '22px', fontWeight: 700, marginTop: '4px' }}>
                    Evidence, origin &amp; scope limitations
                  </h2>
                </div>
                {passport.isDemoData && (
                  <span className="badge badge-demo">Illustrative demo profile</span>
                )}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {/* 1. Identity & contact */}
                <div className="passport-block">
                  <div className="passport-block-label">1. Artisan identity &amp; contact status (separate from skill)</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {passport.identityStatus?.phoneConfirmed && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '8px', fontSize: '14px' }}>
                        <span className="badge badge-identity">
                          <BadgeCheck size={13} aria-hidden="true" />
                          {passport.identityStatus.phoneConfirmed.status}
                        </span>
                        <span style={{ fontSize: '12px', color: 'var(--color-muted-slate)' }}>
                          Checked by {passport.identityStatus.phoneConfirmed.origin.checkedBy} ({passport.identityStatus.phoneConfirmed.origin.checkedAt})
                        </span>
                      </div>
                    )}
                    {passport.identityStatus?.identityChecked ? (
                      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '8px', fontSize: '14px' }}>
                        <span className="badge badge-identity">
                          <BadgeCheck size={13} aria-hidden="true" />
                          {passport.identityStatus.identityChecked.status} — {passport.identityStatus.identityChecked.detail}
                        </span>
                        <span style={{ fontSize: '12px', color: 'var(--color-muted-slate)' }}>
                          Checked by {passport.identityStatus.identityChecked.origin.checkedBy} ({passport.identityStatus.identityChecked.origin.checkedAt})
                        </span>
                      </div>
                    ) : (
                      <span style={{ fontSize: '13px', color: 'var(--color-warning-text)' }}>
                        Identity document check pending — only phone confirmation is complete.
                      </span>
                    )}
                  </div>
                </div>

                {/* 2. Skill Credentials */}
                <div className="passport-block">
                  <div className="passport-block-label">2. Skill credentials (task-scoped)</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {passport.skillCredentials.map((cred) => (
                      <div
                        key={cred.id}
                        style={{
                          background: 'var(--color-white)',
                          border: '1px solid var(--color-border)',
                          borderRadius: '10px',
                          padding: '12px'
                        }}
                      >
                        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '8px' }}>
                          <strong style={{ fontSize: '15px', color: 'var(--color-deep-forest)' }}>
                            {cred.taskName}: {cred.scopeDetail}
                          </strong>
                          <span className="badge badge-evidence">
                            <ShieldCheck size={13} aria-hidden="true" />
                            {cred.credentialStatus}
                          </span>
                        </div>
                        <p style={{ fontSize: '13px', color: 'var(--color-deep-text)', marginTop: '6px' }}>
                          Result: <strong>{cred.result}</strong>
                        </p>
                        <p style={{ fontSize: '12px', color: 'var(--color-muted-slate)', marginTop: '4px' }}>
                          Assessor: {cred.assessorCategory} · Date: {cred.assessedDate} · Method: {cred.origin?.process}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Community References */}
                <div className="passport-block">
                  <div className="passport-block-label">3. Community &amp; past-client references</div>
                  {passport.communityReferences.map((ref) => (
                    <div key={ref.id} style={{ fontSize: '14px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}>
                        <UserRound size={15} color="#159B8B" aria-hidden="true" />
                        <span>{ref.relationship}</span>
                      </div>
                      <p style={{ fontSize: '13px', marginTop: '4px' }}>Scope: {ref.scope}</p>
                      <p style={{ fontSize: '12px', color: 'var(--color-muted-slate)', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Lock size={12} aria-hidden="true" />
                        {ref.privacyNote} · Verified {ref.checkedDate}
                      </p>
                    </div>
                  ))}
                </div>

                {/* 4 & 5. Confirmed Jobs & Review History */}
                <div className="passport-block">
                  <div className="passport-block-label">4 &amp; 5. Platform-confirmed jobs &amp; review history</div>
                  <p style={{ fontSize: '14px', fontWeight: 600 }}>
                    {passport.confirmedJobsCount} platform-confirmed {passport.confirmedJobsCount === 1 ? 'job' : 'jobs'} ·{' '}
                    {passport.reviews.length} {passport.reviews.length === 1 ? 'review' : 'reviews'} attached to confirmed completions
                  </p>
                  <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {passport.reviews.map((rev) => (
                      <div
                        key={rev.id}
                        style={{
                          background: 'var(--color-white)',
                          border: '1px solid var(--color-border)',
                          borderRadius: '10px',
                          padding: '10px 12px',
                          fontSize: '13px'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '6px', color: 'var(--color-muted-slate)', fontSize: '12px' }}>
                          <span>
                            Confirmed booking {rev.bookingRef} · {rev.task} ({rev.area})
                          </span>
                          <span>{rev.confirmedDate}</span>
                        </div>
                        <p style={{ marginTop: '6px', color: 'var(--color-deep-text)' }}>{rev.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 6. Limitations */}
                <div className="passport-limitations">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, marginBottom: '6px' }}>
                    <AlertCircle size={16} aria-hidden="true" />
                    6. Limitations &amp; what has NOT been assessed
                  </div>
                  <ul style={{ margin: 0, paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {passport.limitations.map((lim) => (
                      <li key={lim}>{lim}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

