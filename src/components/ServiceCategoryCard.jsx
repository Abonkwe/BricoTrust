import React from 'react';
import { Wrench, Droplets, CircleAlert, ArrowRight, Info } from 'lucide-react';

const ICON_MAP = {
  'leak-repair': Droplets,
  'tap-fixture-installation': Wrench,
  'drain-blockage': CircleAlert,
  'pipe-installation': Wrench
};

export default function ServiceCategoryCard({ service, onSelectService }) {
  const Icon = ICON_MAP[service.id] || Wrench;

  return (
    <article className="card service-card">
      <div>
        <div className="service-icon-box" aria-hidden="true">
          <Icon size={22} />
        </div>
        <h3 className="service-card-title">{service.name}</h3>
        <p className="service-card-desc">{service.description}</p>
        {service.requiresScopeReview && (
          <p
            style={{
              marginTop: '10px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '6px',
              fontSize: '12px',
              color: 'var(--color-warning-text)',
              backgroundColor: 'var(--color-warning-bg)',
              padding: '8px 10px',
              borderRadius: '8px'
            }}
          >
            <Info size={14} style={{ flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
            <span>{service.reviewNote}</span>
          </p>
        )}
      </div>

      <button
        type="button"
        className="btn btn-secondary"
        onClick={() => onSelectService(service.name)}
      >
        Request this service
        <ArrowRight size={15} aria-hidden="true" />
      </button>
    </article>
  );
}

