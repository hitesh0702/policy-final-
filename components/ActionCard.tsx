
import React from 'react';
import ShieldCheckIcon from './icons/ShieldCheckIcon';

interface ActionCardProps {
  title: string;
  description: string;
}

const ActionCard: React.FC<ActionCardProps> = ({ title, description }) => {
  return (
    <div className="bg-white p-8 rounded-4xl border border-neutral-100 shadow-sm flex flex-col gap-6 hover:shadow-lg transition-all">
      <div className="bg-neutral-900 w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg shadow-neutral-200">
        <ShieldCheckIcon className="w-6 h-6 text-white" />
      </div>
      <div>
        <h4 className="font-black text-xl text-neutral-900 mb-3 tracking-tight">{title}</h4>
        <p className="text-neutral-600 leading-relaxed font-semibold">{description}</p>
      </div>
    </div>
  );
};

export default ActionCard;
