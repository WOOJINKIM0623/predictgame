
import React from 'react';
import { Emoji, PatternData } from '../types';
import PatternDisplay from './PatternDisplay';
import PredictionOptions from './PredictionOptions';
import StatusBar from './StatusBar';
import FeedbackDisplay from './FeedbackDisplay';

interface GameScreenProps {
  level: number;
  score: number;
  lives: number;
  patternData: PatternData | null;
  onPredict: (emoji: Emoji) => void;
  feedbackMessage: string | null;
  isCorrectFeedback: boolean | null;
  isDisplayingFeedback: boolean;
  lastPrediction: Emoji | null;
}

const GameScreen: React.FC<GameScreenProps> = ({
  level,
  score,
  lives,
  patternData,
  onPredict,
  feedbackMessage,
  isCorrectFeedback,
  isDisplayingFeedback,
  lastPrediction
}) => {
  if (!patternData) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-4 bg-slate-50">
        <p className="text-2xl text-slate-600">레벨 불러오는 중...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full max-w-3xl mx-auto bg-white shadow-2xl rounded-lg overflow-hidden">
      <StatusBar level={level} score={score} lives={lives} />
      <div className="p-4 sm:p-8 flex-grow w-full flex flex-col items-center">
        <h2 className="text-xl sm:text-2xl font-semibold text-slate-700 mb-2 text-center">{patternData.description}</h2>
        <PatternDisplay sequence={patternData.sequence} showPlaceholder={!isDisplayingFeedback} />
        
        {isDisplayingFeedback && feedbackMessage && (
           <FeedbackDisplay message={feedbackMessage} isCorrect={isCorrectFeedback} />
        )}

        {!isDisplayingFeedback && (
            <p className="text-lg text-slate-600 mb-4">다음 이모티콘을 예측하세요:</p>
        )}
        
        <PredictionOptions
          choices={patternData.choices}
          onPredict={onPredict}
          disabled={isDisplayingFeedback}
          correctAnswer={isDisplayingFeedback && isCorrectFeedback === false ? patternData.next : (isCorrectFeedback ? patternData.next : null) }
          lastPrediction={isDisplayingFeedback ? lastPrediction : null}
        />
      </div>
    </div>
  );
};

export default GameScreen;
