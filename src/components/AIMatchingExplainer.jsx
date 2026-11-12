import React from 'react';
import { Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';

export default function AIMatchingExplainer({ onTryPrompt }) {
  return (
    <section className="section" style={{ backgroundColor: 'var(--color-white)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
      <div className="container">
        <span className="eyebrow">EXPLAINABLE AI REQUEST ASSISTANT</span>
        <h2 className="section-heading" style={{ marginTop: '10px' }}>
          From a simple request to a relevant local match.
        </h2>
        <p className="section-subcopy">
          Describe your problem in everyday language. BricoTrust structures the request, checks the service and location,
          then presents eligible artisans with clear reasons for each recommendation.
        </p>

        {/* Three-part UI sequence (Section 08) */}
        <div className="ai-sequence-grid">
          <div className="card ai-stage-card">
            <span className="ai-stage-tag">1. Customer message</span>
            <div className="customer-bubble">
              “A pipe is leaking under my sink in Molyko”
            </div>
            <p style={{ fontSize: '13px', color: 'var(--color-muted-slate)', marginTop: 'auto' }}>
              Write naturally — no technical plumbing terms needed.
            </p>
          </div>

          <div className="card ai-stage-card">
            <span className="ai-stage-tag">2. Structured for your confirmation</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              <span className="badge badge-identity">Service: Plumbing</span>
              <span className="badge badge-evidence">Task: Leak repair</span>
              <span className="badge badge-identity">Area: Molyko</span>
              <span className="badge badge-neutral">When: Today</span>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--color-muted-slate)', marginTop: 'auto' }}>
              You review and edit these fields before any request is sent. If a detail is ambiguous, we ask one short question.
            </p>
          </div>

          <div className="card ai-stage-card">
            <span className="ai-stage-tag">3. Backend match with real reasons</span>
            <div
              style={{
                border: '1px solid var(--color-border)',
                borderRadius: '12px',
                padding: '12px',
                backgroundColor: 'var(--color-off-white)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
                <strong style={{ fontSize: '14px' }}>Sample Plumber A</strong>
                <span className="badge badge-demo">Demo</span>
              </div>
              <div style={{ marginTop: '8px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                <span className="badge badge-evidence">
                  <ShieldCheck size={12} aria-hidden="true" />
                  Skill assessed - leak repair
                </span>
              </div>
              <p style={{ fontSize: '12px', color: 'var(--color-muted-slate)', marginTop: '8px' }}>
                Matched by backend eligibility rules: assessed task + Molyko area + confirmed work history.
              </p>
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: '24px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            padding: '16px 20px',
            borderRadius: '14px',
            backgroundColor: 'var(--color-pale-mint)',
            border: '1px solid #C6E2DC'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', maxWidth: '720px' }}>
            <Sparkles size={18} color="#159B8B" style={{ flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
            <p style={{ fontSize: '14px', color: 'var(--color-deep-text)' }}>
              <strong>Role of AI on BricoTrust:</strong> AI acts solely as a request-understanding assistant. It never certifies
              artisans, invents availability or guarantees work quality — backend rules filter eligible records.
            </p>
          </div>
          <button type="button" className="btn btn-primary" onClick={onTryPrompt}>
            Test with a request
            <ArrowRight size={15} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}

