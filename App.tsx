
import React, { useState, useEffect, useCallback } from 'react';
import { GameState, Emoji, PatternData } from './types';
import { MAX_LEVELS, INITIAL_LIVES, POINTS_PER_CORRECT } from './constants';
import * as patternService from './services/patternService';
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
import GameOverScreen from './components/GameOverScreen';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [currentLevel, setCurrentLevel] = useState<number>(1);
  const [score, setScore] = useState<number>(0);
  const [lives, setLives] = useState<number>(INITIAL_LIVES);
  const [patternData, setPatternData] = useState<PatternData | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [isCorrectFeedback, setIsCorrectFeedback] = useState<boolean | null>(null);
  const [isDisplayingFeedback, setIsDisplayingFeedback] = useState<boolean>(false);
  const [lastPrediction, setLastPrediction] = useState<Emoji | null>(null);


  const loadLevel = useCallback((level: number) => {
    const newPatternData = patternService.generatePatternForLevel(level);
    setPatternData(newPatternData);
    setIsDisplayingFeedback(false);
    setFeedbackMessage(null);
    setLastPrediction(null);
  }, []);

  useEffect(() => {
    if (gameState === 'playing' && !isDisplayingFeedback) {
      loadLevel(currentLevel);
    }
  }, [gameState, currentLevel, isDisplayingFeedback, loadLevel]);

  const handleStartGame = () => {
    setCurrentLevel(1);
    setScore(0);
    setLives(INITIAL_LIVES);
    setGameState('playing');
    setIsDisplayingFeedback(false);
    setFeedbackMessage(null);
  };

  const handlePrediction = (predictedEmoji: Emoji) => {
    if (!patternData || isDisplayingFeedback) return;

    setLastPrediction(predictedEmoji);
    setIsDisplayingFeedback(true);
    const correct = predictedEmoji === patternData.next;

    if (correct) {
      setScore(prevScore => prevScore + POINTS_PER_CORRECT * currentLevel);
      setFeedbackMessage(`정답입니다! 다음 이모티콘은 ${patternData.next}였습니다.`);
      setIsCorrectFeedback(true);
    } else {
      setLives(prevLives => prevLives - 1);
      setFeedbackMessage(`틀렸습니다! 정답은 ${patternData.next}였습니다.`);
      setIsCorrectFeedback(false);
    }

    setTimeout(() => {
      if (correct) {
        if (currentLevel < MAX_LEVELS) {
          setCurrentLevel(prevLevel => prevLevel + 1);
          setIsDisplayingFeedback(false); 
        } else {
          setGameState('gameWon');
        }
      } else { // Incorrect
        if (lives -1 <= 0) {
          setGameState('gameOver');
        } else {
           loadLevel(currentLevel); 
           setIsDisplayingFeedback(false); 
        }
      }
    }, 2500); // Time to display feedback
  };


  const renderContent = () => {
    switch (gameState) {
      case 'idle':
        return <StartScreen onStartGame={handleStartGame} />;
      case 'playing':
      case 'feedback': 
        return (
          <GameScreen
            level={currentLevel}
            score={score}
            lives={lives}
            patternData={patternData}
            onPredict={handlePrediction}
            feedbackMessage={feedbackMessage}
            isCorrectFeedback={isCorrectFeedback}
            isDisplayingFeedback={isDisplayingFeedback}
            lastPrediction={lastPrediction}
          />
        );
      case 'gameOver':
        return <GameOverScreen score={score} onRestart={handleStartGame} won={false} />;
      case 'gameWon':
        return <GameOverScreen score={score} onRestart={handleStartGame} won={true} />;
      default:
        return <StartScreen onStartGame={handleStartGame} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-200 flex flex-col items-center justify-center transition-all duration-500">
      <style>{`
        @keyframes fadeIn { 0% { opacity: 0; transform: scale(0.9); } 100% { opacity: 1; transform: scale(1); } }
        .animate-fadeIn { animation: fadeIn 0.5s ease-out forwards; }
        @keyframes pulseSlow { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
        .animate-pulseSlow { animation: pulseSlow 2s infinite ease-in-out; }
        @keyframes bounceOnce { 
          0%, 20%, 50%, 80%, 100% {transform: translateY(0);} 
          40% {transform: translateY(-15px);} 
          60% {transform: translateY(-7px);} 
        }
        .animate-bounceOnce { animation: bounceOnce 0.8s ease-out; }
      `}</style>
      <div className="w-full h-full flex flex-col">
         {renderContent()}
      </div>
    </div>
  );
};

export default App;
