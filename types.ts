
export type Emoji = '🍎' | '🍌' | '🍇' | '🍊' | '🍓' | '🥝' | '🍉' | '🍍';

export interface PatternData {
  sequence: Emoji[];
  next: Emoji;
  choices: Emoji[];
  description: string;
  level: number;
}

export interface PatternDefinition {
  id: number;
  name: string;
  generate: (emojis: Emoji[], length?: number) => { sequence: Emoji[]; next: Emoji; choices: Emoji[] };
  description: string;
  minEmojis: number;
  defaultLength: number; 
}

export type GameState = 'idle' | 'playing' | 'feedback' | 'gameOver' | 'gameWon';
