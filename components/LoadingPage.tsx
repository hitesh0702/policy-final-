
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const LoadingPage: React.FC = () => {
  const location = useLocation();
  const { sourceValue } = location.state || { sourceValue: 'Content' };
  
  const [status, setStatus] = useState('Initializing Audit');
  const [progress, setProgress] = useState(0);

  const steps = [
    'Deconstructing clauses...',
    'Scanning risk vectors...',
    'Synthesizing intelligence...',
    'Finalizing verification...'
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
    }, 2000);

    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] max-w-lg mx-auto text-center px-6">
      <div className="relative mb-20">
        <div className="w-16 h-16 border-[2px] border-neutral-100 rounded-full absolute inset-0"></div>
        <div className="w-16 h-16 border-[2px] border-neutral-900 rounded-full border-t-transparent animate-spin"></div>
      </div>

      <h1 className="text-4xl font-extrabold text-neutral-900 tracking-tighter">Analyzing</h1>
      <p className="mt-3 text-neutral-400 font-bold text-sm truncate max-w-xs uppercase tracking-widest">{sourceValue}</p>
      
      <div className="w-full h-[2px] bg-neutral-100 rounded-full mt-16 overflow-hidden max-w-xs mx-auto">
        <div 
          className="bg-neutral-900 h-full transition-all duration-1000 ease-in-out" 
          style={{ width: `${progress}%` }}>
        </div>
      </div>

      <p className="mt-12 text-[10px] font-black text-neutral-300 uppercase tracking-[0.4em] animate-pulse">
        {status}
      </p>
    </div>
  );
};

export default LoadingPage;
