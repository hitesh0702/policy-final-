
import React from 'react';

interface ScoreBadgeProps {
  score: number;
}

const ScoreBadge: React.FC<ScoreBadgeProps> = ({ score }) => {
  const getScoreColor = (s: number) => {
    if (s >= 75) return 'text-neutral-900'; // Pure neutral
    if (s >= 40) return 'text-neutral-600';
    return 'text-neutral-400';
  };

  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center relative w-44 h-44">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
        <circle
          className="text-neutral-100"
          strokeWidth="4"
          stroke="currentColor"
          fill="transparent"
          r="45"
          cx="50"
          cy="50"
        />
        <circle
          className="text-neutral-900"
          strokeWidth="4"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r="45"
          cx="50"
          cy="50"
          style={{ transition: 'stroke-dashoffset 2s cubic-bezier(0.65, 0, 0.35, 1)' }}
        />
      </svg>
      
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[10px] font-black text-neutral-300 uppercase tracking-[0.3em] mb-1">Safety Score</span>
        <span className="text-6xl font-extrabold text-neutral-900 tracking-tighter">{score}</span>
      </div>
    </div>
  );
};

export default ScoreBadge;
