import React from 'react';
import { Risk } from '../types';

interface RiskCardProps {
  risk: Risk;
}

const RiskCard: React.FC<RiskCardProps> = ({ risk }) => {
  const isHigh = risk.severity === 'high';

  return (
    <div className="bg-white border border-neutral-200 rounded-2xl p-4 hover:border-neutral-400 transition">
      
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-sm font-semibold text-neutral-900 leading-snug">
          {risk.risk_label}
        </h3>

        <span
          className={`text-[10px] font-semibold uppercase px-2 py-1 rounded-full border ${
            isHigh
              ? 'bg-neutral-900 text-white border-neutral-900'
              : 'bg-neutral-100 text-neutral-700 border-neutral-300'
          }`}
        >
          {risk.severity}
        </span>
      </div>

      {/* Recommendation */}
      <p className="mt-2 text-sm text-neutral-700">
        <span className="font-semibold text-neutral-900">
          Recommendation:
        </span>{' '}
        {risk.suggested_action}
      </p>

      {/* Excerpt */}
      <div className="mt-3 bg-neutral-50 border border-neutral-200 rounded-xl p-3 text-sm text-neutral-600 leading-relaxed">
        “{risk.excerpt}”
      </div>
    </div>
  );
};

export default RiskCard;
