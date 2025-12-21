
import React from 'react';
import { Risk } from '../types';

interface RiskCardProps {
  risk: Risk;
}

const RiskCard: React.FC<RiskCardProps> = ({ risk }) => {
  const isHigh = risk.severity === 'high';

  return (
    <div className="bg-white p-8 md:p-10 rounded-4xl border border-neutral-100 shadow-sm transition-all hover:shadow-xl hover:translate-y-[-4px] group">
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <h3 className="text-2xl font-black text-neutral-900 tracking-tight">{risk.risk_label}</h3>
          <span className={`text-[11px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full border ${isHigh ? 'bg-neutral-900 text-white border-neutral-900 shadow-lg shadow-neutral-200' : 'bg-white text-neutral-900 border-neutral-900'}`}>
            {risk.severity} Severity
          </span>
        </div>
        
        <p className="text-neutral-700 font-semibold text-lg leading-relaxed">
          <span className="text-neutral-900 font-black">Recommendation:</span> {risk.suggested_action}
        </p>

        <div className="p-8 bg-neutral-100 rounded-3xl border border-neutral-200 italic text-neutral-700 text-base leading-relaxed font-medium">
          <span className="text-neutral-400 font-black mr-2">“</span>
          {risk.excerpt}
          <span className="text-neutral-400 font-black ml-2">”</span>
        </div>
      </div>
    </div>
  );
};

export default RiskCard;
