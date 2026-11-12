import React from 'react';
import { ShieldCheck, UserRound, BadgeCheck, CalendarClock, MapPin, ArrowRight, FileText } from 'lucide-react';

export default function ArtisanMatchCard({ artisan, onViewPassport, onRequestBooking, showMatchReasons = false }) {
  const isAvailableConfirmed = Boolean(artisan.availability?.confirmed);

  return (
    <article className="card artisan-card">
      <div className="artisan-card-header">
        <div className="artisan-identity-row">
          <div className="artisan-avatar" aria-hidden="true">
            {artisan.initials || 'DA'}
          </div>
          <div>
            <h3 className="artisan-name">{artisan.displayName}</h3>
            <p className="artisan-meta">
              {artisan.trade} · {artisan.primaryArea}, Buea
            </p>
          </div>
        </div>

        {artisan.isDemoData && (
          <span className="badge badge-demo" title="Simulated record for pilot demonstration">
            {artisan.demoLabel || 'Demo profile / Sample data'}
          </span>
        )}
      </div>

      {/* Strongest skill evidence near the top (Section 06 design rule) */}
      <div className="evidence-chips" aria-label="Verified evidence">
        {(artisan.skillBadges || []).map((skill) => (
          <span key={skill.badgeLabel} className="badge badge-evidence">
            <ShieldCheck size={13} aria-hidden="true" />
            {skill.badgeLabel}
          </span>
        ))}
        {(artisan.referenceSummary || []).map((ref) => (
          <span key={ref.summary} className="badge badge-identity">
            <UserRound size={13} aria-hidden="true" />
            {ref.summary}
          </span>
        ))}
        {(artisan.identityBadges || []).map((idBadge) => (
          <span key={idBadge} className="badge badge-neutral">
            <BadgeCheck size={13} aria-hidden="true" />
            {idBadge}
          </span>
        ))}
      </div>

      {showMatchReasons && artisan.matchReasons && artisan.matchReasons.length > 0 && (
        <div
          style={{
            backgroundColor: 'var(--color-pale-mint)',
            border: '1px solid #C6E2DC',
            borderRadius: '10px',
            padding: '10px 12px',
            fontSize: '13px'
          }}
        >
          <strong style={{ color: 'var(--color-deep-forest)', display: 'block', marginBottom: '4px' }}>
            Why recommended:
          </strong>
          <ul style={{ margin: 0, paddingLeft: '18px', color: 'var(--color-deep-text)' }}>
            {artisan.matchReasons.map((reason) => (
              <li key={reason}>{reason}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="artisan-details-list">
        <div>
          <span style={{ display: 'block', fontSize: '12px', color: 'var(--color-muted-slate)' }}>Work history</span>
          <strong style={{ color: 'var(--color-deep-text)' }}>
            {artisan.confirmedJobsCount} platform-confirmed {artisan.confirmedJobsCount === 1 ? 'job' : 'jobs'}
            {artisan.isDemoData ? ' (sample)' : ''}
          </strong>
        </div>

        <div>
          <span style={{ display: 'block', fontSize: '12px', color: 'var(--color-muted-slate)' }}>Availability</span>
          {isAvailableConfirmed ? (
            <strong style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', color: 'var(--color-success-text)' }}>
              <CalendarClock size={14} aria-hidden="true" />
              {artisan.availability.summary}
            </strong>
          ) : (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', color: 'var(--color-warning-text)', fontWeight: 600 }}>
              <CalendarClock size={14} aria-hidden="true" />
              Availability not confirmed
            </span>
          )}
          {artisan.availability?.displayTime && (
            <span style={{ display: 'block', fontSize: '11px', color: 'var(--color-muted-slate)', marginTop: '2px' }}>
              {artisan.availability.displayTime}
            </span>
          )}
        </div>

        <div>
          <span style={{ display: 'block', fontSize: '12px', color: 'var(--color-muted-slate)' }}>Areas covered</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontWeight: 500 }}>
            <MapPin size={13} color="#159B8B" aria-hidden="true" />
            {(artisan.serviceAreas || []).slice(0, 3).join(', ')}
          </span>
        </div>

        <div>
          <span style={{ display: 'block', fontSize: '12px', color: 'var(--color-muted-slate)' }}>Quote &amp; pricing</span>
          <span style={{ fontWeight: 500 }}>{artisan.quotePolicy || 'Estimate available after job details'}</span>
        </div>
      </div>

      <div className="artisan-card-actions">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => onViewPassport(artisan.id)}
        >
          <FileText size={15} aria-hidden="true" />
          View Trust Passport
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => onRequestBooking(artisan)}
        >
          Request booking
          <ArrowRight size={15} aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}

