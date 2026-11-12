import React from 'react';
import { ClipboardCheck, UserRound, BadgeCheck } from 'lucide-react';

export default function TrustProofStrip() {
  const items = [
    {
      icon: ClipboardCheck,
      title: 'Skill-specific assessments',
      desc: 'Checks record the exact plumbing task tested and who assessed it — not a blanket claim.'
    },
    {
      icon: UserRound,
      title: 'Local references',
      desc: 'Community and past-client references describe real work done, while keeping private numbers hidden.'
    },
    {
      icon: BadgeCheck,
      title: 'Reviews from confirmed jobs',
      desc: 'Reviews unlock only after a booking is confirmed complete through a one-time process.'
    }
  ];

  return (
    <section className="trust-strip" aria-label="How trust evidence is collected">
      <div className="container">
        <div className="trust-strip-grid">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="trust-strip-item">
                <div className="trust-strip-icon" aria-hidden="true">
                  <Icon size={20} />
                </div>
                <div>
                  <h2 className="trust-strip-title">{item.title}</h2>
                  <p className="trust-strip-desc">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
        <p className="trust-strip-rule">
          Platform standard: each artisan card displays only the checks actually completed for that person.
        </p>
      </div>
    </section>
  );
}

