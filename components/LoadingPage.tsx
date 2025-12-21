import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const LoadingPage: React.FC = () => {
  const location = useLocation();
  const { sourceValue } = location.state || { sourceValue: 'Content' };

  const [status, setStatus] = useState('Starting analysis…');
  const [progress, setProgress] = useState(0);

  const steps = [
    'Parsing policy structure',
    'Identifying risk clauses',
    'Evaluating data practices',
    'Generating final report'
  ];

  useEffect(() => {
    let currentStep = 0;

    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setStatus(steps[currentStep]);
        setProgress(((currentStep + 1) / steps.length) * 100);
        currentStep++;
      } else {
        clearInterval(interval);
      }
    }, 1400); // faster = feels responsive

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      
      {/* Spinner */}
      <div className="relative mb-10">
        <div className="w-10 h-10 border border-neutral-200 rounded-full absolute inset-0" />
        <div className="w-10 h-10 border border-neutral-900 rounded-full border-t-transparent animate-spin" />
      </div>

      {/* Title */}
      <h1 className="text-xl font-semibold text-neutral-900">
        Analyzing policy
      </h1>

      {/* Source */}
      <p className="mt-1 text-xs text-neutral-500 truncate max-w-[240px]">
        {sourceValue}
      </p>

      {/* Progress bar */}
      <div className="w-full max-w-[260px] h-[3px] bg-neutral-100 rounded-full mt-8 overflow-hidden">
        <div
          className="bg-neutral-900 h-full transition-all duration-700 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Status */}
      <p className="mt-6 text-[11px] text-neutral-400 tracking-wide animate-pulse">
        {status}
      </p>

    </div>
  );
};

export default LoadingPage;
