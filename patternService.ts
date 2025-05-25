
import { Emoji, PatternDefinition, PatternData } from '../types';
import { AVAILABLE_EMOJIS } from '../constants';

const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const generateChoices = (correctEmoji: Emoji, allEmojis: Emoji[], numChoices: number): Emoji[] => {
  let choicesSet = new Set<Emoji>();
  choicesSet.add(correctEmoji);

  const distractors = shuffleArray(allEmojis.filter(e => e !== correctEmoji));
  for (let i = 0; choicesSet.size < numChoices && i < distractors.length; i++) {
    choicesSet.add(distractors[i]);
  }
  
  let allAvailableShuffled = shuffleArray([...allEmojis]);
  let idx = 0;
  while(choicesSet.size < numChoices && idx < allAvailableShuffled.length) {
      choicesSet.add(allAvailableShuffled[idx++]);
  }
  
  return shuffleArray(Array.from(choicesSet));
};

export const PATTERN_DEFINITIONS: PatternDefinition[] = [
  {
    id: 1,
    name: "Alternating Pair (A-B-A-B)",
    description: "교차하는 쌍 (A-B-A-B): 두 개의 이모티콘이 번갈아 나타납니다. 다음 이모티콘을 예측하세요.",
    minEmojis: 2,
    defaultLength: 3,
    generate: (emojis: Emoji[], length: number = 3) => {
      const [a, b] = shuffleArray(emojis).slice(0, 2);
      const fullSequence: Emoji[] = [];
      for (let i = 0; i < length + 1; i++) {
        fullSequence.push(i % 2 === 0 ? a : b);
      }
      const next = fullSequence[length];
      return {
        sequence: fullSequence.slice(0, length),
        next: next,
        choices: generateChoices(next, emojis, 4),
      };
    },
  },
  {
    id: 2,
    name: "Repeating Trio (A-B-C-A-B-C)",
    description: "반복되는 삼중주 (A-B-C-A-B-C): 세 개의 이모티콘이 순서대로 반복됩니다. 다음 이모티콘을 예측하세요.",
    minEmojis: 3,
    defaultLength: 4,
    generate: (emojis: Emoji[], length: number = 4) => {
      const [a, b, c] = shuffleArray(emojis).slice(0, 3);
      const patternBase = [a, b, c];
      const fullSequence: Emoji[] = [];
      for (let i = 0; i < length + 1; i++) {
        fullSequence.push(patternBase[i % 3]);
      }
      const next = fullSequence[length];
      return {
        sequence: fullSequence.slice(0, length),
        next: next,
        choices: generateChoices(next, emojis, 4),
      };
    },
  },
  {
    id: 3,
    name: "Double Pairs (A-A-B-B)",
    description: "이중 쌍 (A-A-B-B): 이모티콘 쌍이 반복됩니다. A-A-B-B 순서에서 다음을 예측하세요.",
    minEmojis: 2,
    defaultLength: 4,
    generate: (emojis: Emoji[], length: number = 4) => {
      const [a, b] = shuffleArray(emojis).slice(0, 2);
      const patternBase = [a, a, b, b];
      const fullSequence: Emoji[] = [];
      for (let i = 0; i < length + 1; i++) {
        fullSequence.push(patternBase[i % 4]);
      }
      const next = fullSequence[length];
      return {
        sequence: fullSequence.slice(0, length),
        next: next,
        choices: generateChoices(next, emojis, 4),
      };
    },
  },
  {
    id: 4,
    name: "Repeating Quartet (A-B-C-D)",
    description: "반복되는 사중주 (A-B-C-D): 네 개의 이모티콘이 순서대로 반복됩니다. 다음 이모티콘을 예측하세요.",
    minEmojis: 4,
    defaultLength: 5,
    generate: (emojis: Emoji[], length: number = 5) => {
      const [a, b, c, d] = shuffleArray(emojis).slice(0, 4);
      const patternBase = [a, b, c, d];
      const fullSequence: Emoji[] = [];
      for (let i = 0; i < length + 1; i++) {
        fullSequence.push(patternBase[i % 4]);
      }
      const next = fullSequence[length];
      return {
        sequence: fullSequence.slice(0, length),
        next: next,
        choices: generateChoices(next, emojis, 5),
      };
    },
  },
  {
    id: 5,
    name: "Alternating Pivot (A-B-A-C)",
    description: "교차하는 중심축 (A-B-A-C): 하나의 중심 이모티콘이 다른 두 이모티콘과 번갈아 나타납니다 (A-B-A-C). 다음을 예측하세요.",
    minEmojis: 3,
    defaultLength: 5,
    generate: (emojis: Emoji[], length: number = 5) => {
      const [a, b, c] = shuffleArray(emojis).slice(0, 3);
      const patternBase = [a, b, a, c]; // A B A C A B A C
      const fullSequence: Emoji[] = [];
      for (let i = 0; i < length + 1; i++) {
        fullSequence.push(patternBase[i % 4]);
      }
      const next = fullSequence[length];
      return {
        sequence: fullSequence.slice(0, length),
        next: next,
        choices: generateChoices(next, emojis, 5),
      };
    },
  },
];

export const generatePatternForLevel = (level: number): PatternData => {
  const patternDef = PATTERN_DEFINITIONS[level - 1];
  if (!patternDef) {
    const lastPattern = PATTERN_DEFINITIONS[PATTERN_DEFINITIONS.length-1];
    const result = lastPattern.generate(AVAILABLE_EMOJIS, lastPattern.defaultLength);
     return {
      ...result,
      description: lastPattern.description,
      level: level,
    };
  }
  
  const result = patternDef.generate(AVAILABLE_EMOJIS, patternDef.defaultLength);
  return {
    ...result,
    description: patternDef.description,
    level: level,
  };
};
