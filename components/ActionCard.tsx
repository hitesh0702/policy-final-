import React from 'react';
import ShieldCheckIcon from './icons/ShieldCheckIcon';

interface ActionCardProps {
  title: string;
  description: string;
}

const ActionCard: React.FC<ActionCardProps> = ({ title, description }) => {
  return (
    <div className="bg-white border border-neutral-200 rounded-2xl p-4 flex gap-3 hover:border-neutral-400 transition">
      
      {/* Icon */}
      <div className="bg-neutral-900 w-8 h-8 rounded-xl flex items-center justify-center shrink-0">
        <ShieldCheckIcon className="w-4 h-4 text-white" />
      </div>

      {/* Content */}
      <div>
        <h4 className="text-sm font-semibold text-neutral-900 leading-tight">
          {title}
        </h4>
        <p className="text-sm text-neutral-600 mt-1 leading-snug">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ActionCard;
