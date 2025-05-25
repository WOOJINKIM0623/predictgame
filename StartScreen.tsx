
import React from 'react';

interface StartScreenProps {
  onStartGame: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStartGame }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-sky-400 to-blue-600 text-white p-8">
      <h1 className="text-5xl font-bold mb-6 animate-pulse">예측하는 뇌 게임</h1>
      <p className="text-xl mb-4 text-center max-w-2xl">
        (Predictive Brain Game)
      </p>
      <p className="text-lg mb-8 text-center max-w-2xl">
        환영합니다! 이 게임은 제프 호킨스의 '천 개의 뇌'에서 탐구된 예측 학습 개념에서 영감을 받았습니다.
        여러분의 뇌는 다음에 무엇을 감지할지 끊임없이 예측합니다. 패턴을 식별하고 순서대로 다음 요소를 예측하여 자신의 예측 능력을 시험해보세요!
      </p>
      <button
        onClick={onStartGame}
        className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold py-4 px-8 rounded-lg text-2xl shadow-lg transform hover:scale-105 transition-transform duration-150 ease-in-out"
      >
        게임 시작
      </button>
    </div>
  );
};

export default StartScreen;
