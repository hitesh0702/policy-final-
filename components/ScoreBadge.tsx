import React from 'react';

interface ScoreBadgeProps {
  score: number;
}

const ScoreBadge: React.FC<ScoreBadgeProps> = ({ score }) => {
  const circumference = 2 * Math.PI * 36; // smaller radius
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative w-24 h-24 flex items-center justify-center">
      <svg
        className="w-full h-full transform -rotate-90"
        viewBox="0 0 100 100"
      >
        <circle
          stroke="currentColor"
          className="text-neutral-200"
          strokeWidth="6"
          fill="transparent"
          r="36"
          cx="50"
          cy="50"
        />
        <circle
          stroke="currentColor"
          className="text-neutral-900"
          strokeWidth="6"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="transparent"
          r="36"
          cx="50"
          cy="50"
          style={{
            transition: 'stroke-dashoffset 1.2s ease-out',
          }}
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[9px] text-neutral-400 uppercase tracking-wide">
          Score
        </span>
        <span className="text-2xl font-semibold text-neutral-900 leading-none">
          {score}
        </span>
      </div>
    </div>
  );
};

export default ScoreBadge;
