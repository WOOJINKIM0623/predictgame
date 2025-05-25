
import React from 'react';

interface FeedbackDisplayProps {
  message: string | null;
  isCorrect: boolean | null;
}

const FeedbackDisplay: React.FC<FeedbackDisplayProps> = ({ message, isCorrect }) => {
  if (!message) return null;

  const baseClasses = "text-center text-xl sm:text-2xl font-semibold p-4 my-4 rounded-lg shadow-md";
  const typeClasses = isCorrect
    ? "bg-green-100 text-green-700 border-2 border-green-500"
    : "bg-red-100 text-red-700 border-2 border-red-500";

  return (
    <div className={`${baseClasses} ${typeClasses} animate-bounceOnce`}>
      {message}
    </div>
  );
};

// Add this to index.html <style> or Tailwind config
// @keyframes bounceOnce { 
//   0%, 20%, 50%, 80%, 100% {transform: translateY(0);} 
//   40% {transform: translateY(-20px);} 
//   60% {transform: translateY(-10px);} 
// }
// .animate-bounceOnce { animation: bounceOnce 0.8s ease-out; }

export default FeedbackDisplay;
