import React from 'react';
import { MessageCircle, Search, ClipboardCheck, ShieldCheck, CalendarClock } from 'lucide-react';

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section">
      <div className="container">
        <span className="eyebrow">HOW BRICOTRUST WORKS</span>
        <h2 className="section-heading" style={{ marginTop: '10px' }}>
          From request to confirmed job in three steps
        </h2>
        <p className="section-subcopy">
          Start with a plain description of your plumbing issue — no account needed until you choose an artisan to contact.
        </p>

        <div className="steps-grid">
          <article className="card step-card">
            <div>
              <span className="step-number">01</span>
              <h3 className="step-title">Describe the job</h3>
              <p className="step-copy">Tell us what needs fixing and where.</p>
            </div>
            <div className="step-mini-ui" aria-hidden="true">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-deep-forest)', fontWeight: 600 }}>
                <MessageCircle size={16} color="#159B8B" />
                <span>“A pipe is leaking under my sink in Molyko.”</span>
              </div>
              <div style={{ marginTop: '8px', fontSize: '12px', color: 'var(--color-muted-slate)' }}>
                Task &amp; area confirmed before matching
              </div>
            </div>
          </article>

          <article className="card step-card">
            <div>
              <span className="step-number">02</span>
              <h3 className="step-title">Get a suitable match</h3>
              <p className="step-copy">
                The matching system filters by service, area, skill evidence and availability.
              </p>
            </div>
            <div className="step-mini-ui" aria-hidden="true">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}>
                <Search size={16} color="#159B8B" />
                <span>Plumbing · Molyko, Buea</span>
              </div>
              <div style={{ marginTop: '8px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                <span className="badge badge-evidence">
                  <ShieldCheck size={12} />
                  Skill assessed - leak repair
                </span>
              </div>
            </div>
          </article>

          <article className="card step-card">
            <div>
              <span className="step-number">03</span>
              <h3 className="step-title">Agree and confirm</h3>
              <p className="step-copy">
                Compare the details, agree the price, then confirm the completed job.
              </p>
            </div>
            <div className="step-mini-ui" aria-hidden="true">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}>
                <CalendarClock size={16} color="#159B8B" />
                <span>Booking request sent (Pending acceptance)</span>
              </div>
              <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-muted-slate)', fontSize: '12px' }}>
                <ClipboardCheck size={14} color="#159B8B" />
                <span>One-time code confirms completion &amp; unlocks review</span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

