
import React from 'react';

interface GameOverScreenProps {
  score: number;
  onRestart: () => void;
  won: boolean;
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({ score, onRestart, won }) => {
  return (
    <div className={`flex flex-col items-center justify-center h-full p-8 text-white ${won ? 'bg-gradient-to-br from-green-400 to-emerald-600' : 'bg-gradient-to-br from-red-500 to-rose-700'}`}>
      <h1 className="text-5xl font-bold mb-6">
        {won ? '축하합니다!' : '게임 종료'}
      </h1>
      {won && <p className="text-2xl mb-4">모든 패턴을 마스터했습니다!</p>}
      <p className="text-3xl mb-8">최종 점수: <span className="font-bold text-yellow-300">{score}</span></p>
      <button
        onClick={onRestart}
        className={`font-bold py-4 px-8 rounded-lg text-2xl shadow-lg transform hover:scale-105 transition-transform duration-150 ease-in-out ${won ? 'bg-sky-500 hover:bg-sky-600 text-white' : 'bg-yellow-400 hover:bg-yellow-500 text-gray-800'}`}
      >
        {won ? '다시 플레이' : '다시 시도'}
      </button>
    </div>
  );
};

export default GameOverScreen;
