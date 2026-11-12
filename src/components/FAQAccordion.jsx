import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { api } from '../services/api';

const FAQ_ITEMS = [
  {
    q: 'Do I need a certificate to join?',
    a: 'Not necessarily. BricoTrust can collect work evidence and references, and may arrange a task-specific practical assessment. Some regulated or high-risk work may require additional qualifications or authorisation.'
  },
  {
    q: 'How are skills checked?',
    a: 'Depending on the skill, evidence may include practical assessments by authorised assessors, work samples and corroborated references. Each status explains what was checked.'
  },
  {
    q: 'What does “skill assessed” mean?',
    a: 'It means an authorised assessor evaluated the artisan against a specific task or competency. It does not mean every task in the trade has been assessed.'
  },
  {
    q: 'Can I use BricoTrust without a smartphone?',
    a: 'During the Molyko, Buea pilot, customers without reliable internet or a smartphone can request help by calling or messaging our monitored Pilot Desk directly. USSD and SMS request workflows are planned on our roadmap and are not yet active.'
  },
  {
    q: 'How are prices agreed?',
    a: 'The artisan provides a quote for the described scope. Customers should confirm labour, estimated materials, travel charges and any changes before work begins.'
  },
  {
    q: 'What if I have a problem with a job?',
    a: 'Use the customer support and issue-report route to document what happened. BricoTrust can review platform booking records and refer the case for human handling by our Buea Pilot Desk.'
  }
];

export default function FAQAccordion({ onOpenSupport }) {
  const [openIndex, setOpenIndex] = useState(0);

  const handleToggle = (idx, question) => {
    const next = openIndex === idx ? -1 : idx;
    setOpenIndex(next);
    if (next !== -1) {
      api.trackEvent('faq_opened', { question });
    }
  };

  return (
    <section id="faq" className="section">
      <div className="container">
        <span className="eyebrow">FREQUENT QUESTIONS &amp; LIMITATIONS</span>
        <h2 className="section-heading" style={{ marginTop: '10px' }}>
          Clear answers about verification, pricing and support
        </h2>
        <p className="section-subcopy">
          Know what BricoTrust checks, what each label covers, and how to reach a real person during the pilot.
        </p>

        <div className="faq-list">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            const panelId = `faq-panel-${idx}`;
            const btnId = `faq-btn-${idx}`;
            return (
              <div key={item.q} className="faq-item">
                <h3>
                  <button
                    id={btnId}
                    type="button"
                    className="faq-trigger"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => handleToggle(idx, item.q)}
                  >
                    <span>{item.q}</span>
                    <ChevronDown
                      size={20}
                      aria-hidden="true"
                      style={{
                        flexShrink: 0,
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 150ms ease',
                        color: 'var(--color-teal)'
                      }}
                    />
                  </button>
                </h3>
                {isOpen && (
                  <div id={panelId} role="region" aria-labelledby={btnId} className="faq-answer">
                    <p>{item.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: '24px' }}>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              api.trackEvent('support_clicked', { source: 'faq_section' });
              onOpenSupport();
            }}
          >
            Contact customer support / report an issue
          </button>
        </div>
      </div>
    </section>
  );
}

