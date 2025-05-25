
import React from 'react';

interface StatusBarProps {
  level: number;
  score: number;
  lives: number;
}

const HeartIcon: React.FC<{ filled: boolean }> = ({ filled }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={`w-6 h-6 sm:w-8 sm:h-8 ${filled ? 'text-red-500 animate-pulseSlow' : 'text-slate-300'}`}
  >
    <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
  </svg>
);


const StatusBar: React.FC<StatusBarProps> = ({ level, score, lives }) => {
  return (
    <div className="flex justify-between items-center w-full p-4 bg-slate-700 text-white rounded-t-lg shadow">
      <div className="text-lg sm:text-xl font-semibold">레벨: <span className="text-yellow-400">{level}</span></div>
      <div className="text-lg sm:text-xl font-semibold">점수: <span className="text-green-400">{score}</span></div>
      <div className="flex items-center space-x-1">
        {Array.from({ length: 3 }).map((_, index) => (
          <HeartIcon key={index} filled={index < lives} />
        ))}
      </div>
    </div>
  );
};

// Add this to index.html <style> or Tailwind config if possible
// @keyframes pulseSlow { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.1); } }
// .animate-pulseSlow { animation: pulseSlow 2s infinite ease-in-out; }

export default StatusBar;
