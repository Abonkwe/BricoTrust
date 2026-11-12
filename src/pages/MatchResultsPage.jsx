import React, { useEffect, useState, useCallback } from 'react';
import { ArrowLeft, AlertCircle, RotateCcw, MapPin, Phone, Info } from 'lucide-react';
import ArtisanMatchCard from '../components/ArtisanMatchCard';
import { api } from '../services/api';

export default function MatchResultsPage({
  requestRecord,
  onBackToEdit,
  onBackHome,
  onViewPassport,
  onRequestBooking,
  onOpenSupport
}) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const loadMatches = useCallback(async () => {
    if (!requestRecord?.id) return;
    setLoading(true);
    setError('');
    try {
      const data = await api.getMatches(requestRecord.id);
      setResult(data);
      api.trackEvent('match_list_viewed', {
        requestId: requestRecord.id,
        matchCount: (data.matches || []).length
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [requestRecord]);

  useEffect(() => {
    loadMatches();
  }, [loadMatches]);

  return (
    <section className="section">
      <div className="container">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
          <button type="button" className="btn-text-link" onClick={onBackToEdit}>
            <ArrowLeft size={16} aria-hidden="true" />
            Edit request details
          </button>
          <button type="button" className="btn-text-link" onClick={onBackHome}>
            Back to homepage
          </button>
        </div>

        {/* Confirmed Request Summary */}
        {requestRecord && (
          <div className="card" style={{ padding: '20px', marginTop: '12px', backgroundColor: 'var(--color-pale-mint)', borderColor: '#C6E2DC' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
              <div>
                <span className="eyebrow">STEP 2 OF 2 · ELIGIBLE ARTISAN MATCHES</span>
                <h1 style={{ fontSize: '26px', fontWeight: 700, marginTop: '6px' }}>
                  {requestRecord.task} in {requestRecord.location}
                </h1>
                <p style={{ fontSize: '14px', color: 'var(--color-muted-slate)', marginTop: '4px' }}>
                  “{requestRecord.description}” · Timing: {requestRecord.urgency}
                </p>
              </div>
              <span className="badge badge-identity">
                <MapPin size={13} aria-hidden="true" />
                Request ID: {requestRecord.id}
              </span>
            </div>

            {requestRecord.requiresScopeReview && (
              <div className="alert-box alert-warning" style={{ marginTop: '14px' }}>
                <Info size={18} style={{ flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
                <span>{requestRecord.reviewNote}</span>
              </div>
            )}
          </div>
        )}

        {/* Loading state (no fake percentage counters per Section 6.3) */}
        {loading && (
          <div className="card" style={{ padding: '36px', marginTop: '24px', textAlign: 'center' }} role="status" aria-live="polite">
            <h2 style={{ fontSize: '20px', fontWeight: 700 }}>Finding suitable plumbers…</h2>
            <p style={{ marginTop: '8px', color: 'var(--color-muted-slate)', fontSize: '15px' }}>
              Checking task-specific skill assessments and Molyko, Buea area eligibility.
            </p>
          </div>
        )}

        {/* Error / Offline state (preserves request & provides retry + contact fallback) */}
        {!loading && error && (
          <div className="alert-box alert-error" role="alert" style={{ marginTop: '24px', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <AlertCircle size={20} style={{ flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
              <div>
                <strong>Could not load matching artisans</strong>
                <p style={{ marginTop: '4px' }}>{error}</p>
              </div>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              <button type="button" className="btn btn-primary" onClick={loadMatches}>
                <RotateCcw size={15} aria-hidden="true" />
                Retry matching
              </button>
              <button type="button" className="btn btn-secondary" onClick={onOpenSupport}>
                Contact Pilot Desk
              </button>
            </div>
          </div>
        )}

        {/* No match / out-of-area state (Section 6.3) */}
        {!loading && !error && result && (result.matches || []).length === 0 && (
          <div className="card" style={{ padding: '28px', marginTop: '24px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 700 }}>
              {result.noMatchReason === 'out_of_area'
                ? 'Outside current Molyko, Buea pilot area'
                : 'No suitable assessed plumber is currently available'}
            </h2>
            <p style={{ marginTop: '10px', fontSize: '15px', color: 'var(--color-muted-slate)', maxWidth: '640px' }}>
              {result.message ||
                'No suitable assessed plumber is currently available in this area. You can leave a request or contact support.'}
            </p>
            <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              <button type="button" className="btn btn-primary" onClick={onOpenSupport}>
                Leave a request with Pilot Support
              </button>
              <a
                href={`tel:${result.supportContact?.phone || '+237670000000'}`}
                className="btn btn-secondary"
              >
                <Phone size={15} aria-hidden="true" />
                Call Pilot Desk: {result.supportContact?.phone || '+237 670 00 00 00'}
              </a>
              <button type="button" className="btn btn-secondary" onClick={onBackToEdit}>
                Adjust location or task
              </button>
            </div>
          </div>
        )}

        {/* Match results */}
        {!loading && !error && result && (result.matches || []).length > 0 && (
          <div style={{ marginTop: '24px' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
              <p style={{ fontSize: '14px', color: 'var(--color-muted-slate)' }}>
                {result.rankingBasis}
              </p>
              <span className="badge badge-demo">Demo profile / Sample data</span>
            </div>

            <div className="matches-grid">
              {result.matches.map((artisan) => (
                <ArtisanMatchCard
                  key={artisan.id}
                  artisan={artisan}
                  showMatchReasons
                  onViewPassport={onViewPassport}
                  onRequestBooking={onRequestBooking}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

