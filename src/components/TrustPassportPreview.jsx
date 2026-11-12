import React from 'react';
import { ShieldCheck, BadgeCheck, UserRound, Lock, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';

export default function TrustPassportPreview({ onOpenFullPassport }) {
  return (
    <section id="trust-passport" className="section">
      <div className="container">
        <div className="split-section">
          {/* Copy side */}
          <div>
            <span className="eyebrow">ARTISAN TRUST PASSPORT</span>
            <h2 className="section-heading" style={{ marginTop: '10px' }}>
              Trust should be earned, not claimed.
            </h2>
            <p className="section-subcopy">
              Each artisan profile can show what has been checked, who assessed it, which skill was demonstrated and
              which jobs have been confirmed. Customers can inspect the evidence behind a recommendation.
            </p>

            <ul
              style={{
                marginTop: '24px',
                paddingLeft: 0,
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                fontSize: '15px',
                color: 'var(--color-deep-text)'
              }}
            >
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <CheckCircle2 size={18} color="#159B8B" style={{ flexShrink: 0, marginTop: '3px' }} aria-hidden="true" />
                <span>
                  <strong>Identity &amp; skill stay separate:</strong> phone confirmation or ID checks never imply technical plumbing competence.
                </span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <CheckCircle2 size={18} color="#159B8B" style={{ flexShrink: 0, marginTop: '3px' }} aria-hidden="true" />
                <span>
                  <strong>Every skill badge names its exact scope:</strong> you see the specific task tested, the assessor category and the date.
                </span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <CheckCircle2 size={18} color="#159B8B" style={{ flexShrink: 0, marginTop: '3px' }} aria-hidden="true" />
                <span>
                  <strong>Clear limitations:</strong> every Trust Passport lists what has not been assessed so you never assume a universal licence.
                </span>
              </li>
            </ul>

            <div style={{ marginTop: '24px' }}>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => onOpenFullPassport('artisan-demo-a')}
              >
                Inspect sample Trust Passport
                <ArrowRight size={15} aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Large interactive Trust Passport product mockup */}
          <div className="passport-card" role="region" aria-label="Illustrative demo Trust Passport">
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '10px',
                paddingBottom: '16px',
                borderBottom: '1px solid var(--color-border)'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <h3 style={{ fontSize: '20px', fontWeight: 700 }}>Sample Plumber A</h3>
                  <span className="badge badge-demo">Illustrative demo profile</span>
                </div>
                <p style={{ fontSize: '13px', color: 'var(--color-muted-slate)', marginTop: '4px' }}>
                  Plumbing · Molyko, Buea (UB Junction, Dirty South)
                </p>
              </div>
              <span className="badge badge-evidence">
                <ShieldCheck size={14} aria-hidden="true" />
                2 task assessments
              </span>
            </div>

            <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {/* 1. Identity / contact status */}
              <div className="passport-block">
                <div className="passport-block-label">1. Identity &amp; contact status (separate from skill)</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  <span className="badge badge-identity">
                    <BadgeCheck size={13} aria-hidden="true" />
                    Phone confirmed (OTP)
                  </span>
                  <span className="badge badge-identity">
                    <BadgeCheck size={13} aria-hidden="true" />
                    Identity checked — National ID sighted 14 Oct 2026
                  </span>
                </div>
              </div>

              {/* 2. Skill credential */}
              <div className="passport-block">
                <div className="passport-block-label">2. Skill credential (task-scoped)</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                  <strong style={{ fontSize: '14px', color: 'var(--color-deep-forest)' }}>
                    Leak repair — under-sink traps &amp; supply joints
                  </strong>
                  <span className="badge badge-evidence">Active — task-scoped</span>
                </div>
                <p style={{ fontSize: '13px', color: 'var(--color-muted-slate)', marginTop: '6px' }}>
                  Result: Practical assessment passed · Assessed by Authorised local trade assessor (Buea) on 18 Oct 2026
                </p>
              </div>

              {/* 3. Community reference */}
              <div className="passport-block">
                <div className="passport-block-label">3. Community reference</div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13px' }}>
                  <UserRound size={16} color="#159B8B" style={{ flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
                  <div>
                    <strong>Former residential landlord, Molyko</strong> — Kitchen sink trap replacement &amp; leak repairs (3 visits).
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--color-muted-slate)', marginTop: '4px' }}>
                      <Lock size={12} aria-hidden="true" />
                      Referee contact details kept private
                    </div>
                  </div>
                </div>
              </div>

              {/* 4 & 5. Confirmed jobs & review history */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '12px' }}>
                <div className="passport-block">
                  <div className="passport-block-label">4. Confirmed jobs</div>
                  <strong style={{ fontSize: '15px' }}>3 platform-confirmed jobs</strong>
                  <p style={{ fontSize: '12px', color: 'var(--color-muted-slate)', marginTop: '4px' }}>
                    Counted only from completed BricoTrust bookings
                  </p>
                </div>
                <div className="passport-block">
                  <div className="passport-block-label">5. Review history</div>
                  <strong style={{ fontSize: '15px' }}>2 reviews (sample size: 3 jobs)</strong>
                  <p style={{ fontSize: '12px', color: 'var(--color-muted-slate)', marginTop: '4px' }}>
                    Attached only to confirmed completions
                  </p>
                </div>
              </div>

              {/* 6. Limitations */}
              <div className="passport-limitations">
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, marginBottom: '4px' }}>
                  <AlertCircle size={15} aria-hidden="true" />
                  6. Assessment limitations (what has not been checked)
                </div>
                <p>
                  Not assessed for commercial boilers, deep sewer excavation, or electrical water heaters. Not a
                  government trade licence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

