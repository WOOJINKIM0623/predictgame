
import React from 'react';
import { Emoji } from '../types';

interface PredictionOptionsProps {
  choices: Emoji[];
  onPredict: (emoji: Emoji) => void;
  disabled?: boolean;
  correctAnswer?: Emoji | null;
  lastPrediction?: Emoji | null;
}

const PredictionOptions: React.FC<PredictionOptionsProps> = ({ choices, onPredict, disabled, correctAnswer, lastPrediction }) => {
  const getButtonClass = (emoji: Emoji) => {
    let baseClass = "text-3xl sm:text-4xl p-4 rounded-lg shadow-md transition-all duration-150 ease-in-out transform focus:outline-none focus:ring-4";
    if (disabled) {
      if (correctAnswer && emoji === correctAnswer) {
        return `${baseClass} bg-green-500 text-white ring-green-300 scale-110`;
      }
      if (lastPrediction && emoji === lastPrediction && emoji !== correctAnswer) {
        return `${baseClass} bg-red-500 text-white ring-red-300`;
      }
      return `${baseClass} bg-slate-300 text-slate-500 cursor-not-allowed`;
    }
    return `${baseClass} bg-white hover:bg-sky-100 active:bg-sky-200 text-sky-700 hover:scale-105 active:scale-95 ring-sky-300`;
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-6 w-full max-w-md mx-auto">
      {choices.map((emoji) => (
        <button
          key={emoji}
          onClick={() => onPredict(emoji)}
          disabled={disabled}
          className={getButtonClass(emoji)}
        >
          {emoji}
        </button>
      ))}
    </div>
  );
};

export default PredictionOptions;
