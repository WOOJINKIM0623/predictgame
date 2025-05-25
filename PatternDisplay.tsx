
import React from 'react';
import { Emoji } from '../types';

interface PatternDisplayProps {
  sequence: Emoji[];
  showPlaceholder?: boolean;
}

const PatternDisplay: React.FC<PatternDisplayProps> = ({ sequence, showPlaceholder = true }) => {
  return (
    <div className="flex justify-center items-center space-x-3 sm:space-x-4 my-8 p-4 bg-slate-100 rounded-lg shadow-inner min-h-[80px]">
      {sequence.map((emoji, index) => (
        <span key={index} className="text-4xl sm:text-6xl p-2 animate-fadeIn">
          {emoji}
        </span>
      ))}
      {showPlaceholder && (
        <span className="text-4xl sm:text-6xl p-2 text-slate-400 animate-pulse">?</span>
      )}
    </div>
  );
};

// Add a simple fadeIn animation to Tailwind config if you could, or use a style tag here.
// For now, just adding a class, assuming Tailwind JIT might pick up simple animations.
// Or define it in index.html <style>
// @keyframes fadeIn { 0% { opacity: 0; transform: scale(0.8); } 100% { opacity: 1; transform: scale(1); } }
// .animate-fadeIn { animation: fadeIn 0.5s ease-out forwards; }

export default PatternDisplay;
