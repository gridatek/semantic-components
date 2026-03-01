export enum CardType {
  Guard = 'guard',
  Priest = 'priest',
  Baron = 'baron',
  Handmaid = 'handmaid',
  Prince = 'prince',
  King = 'king',
  Countess = 'countess',
  Princess = 'princess',
}

export interface CardMeta {
  type: CardType;
  value: number;
  name: string;
  description: string;
  count: number;
}

export interface Card {
  type: CardType;
  value: number;
  name: string;
  description: string;
}

export interface Player {
  id: number;
  name: string;
  hand: Card[];
  isEliminated: boolean;
  isProtected: boolean;
  tokens: number;
  discardPile: Card[];
}

export type GamePhase =
  | 'setup'
  | 'draw'
  | 'play'
  | 'target'
  | 'resolve'
  | 'round-over'
  | 'game-over';

export const CARDS: CardMeta[] = [
  {
    type: CardType.Guard,
    value: 1,
    name: 'Guard',
    description:
      "Guess a player's card (not Guard). If correct, they are eliminated.",
    count: 5,
  },
  {
    type: CardType.Priest,
    value: 2,
    name: 'Priest',
    description: "Look at another player's hand.",
    count: 2,
  },
  {
    type: CardType.Baron,
    value: 3,
    name: 'Baron',
    description:
      'Compare hands with another player. Lower value is eliminated.',
    count: 2,
  },
  {
    type: CardType.Handmaid,
    value: 4,
    name: 'Handmaid',
    description: 'You are protected until your next turn.',
    count: 2,
  },
  {
    type: CardType.Prince,
    value: 5,
    name: 'Prince',
    description:
      'Choose a player (including yourself) to discard and draw a new card.',
    count: 2,
  },
  {
    type: CardType.King,
    value: 6,
    name: 'King',
    description: 'Trade hands with another player.',
    count: 1,
  },
  {
    type: CardType.Countess,
    value: 7,
    name: 'Countess',
    description: 'Must be played if you hold King or Prince.',
    count: 1,
  },
  {
    type: CardType.Princess,
    value: 8,
    name: 'Princess',
    description: 'If you play or discard this card, you are eliminated.',
    count: 1,
  },
];

export function createDeck(): Card[] {
  const deck: Card[] = [];

  for (const meta of CARDS) {
    for (let i = 0; i < meta.count; i++) {
      deck.push({
        type: meta.type,
        value: meta.value,
        name: meta.name,
        description: meta.description,
      });
    }
  }

  // Fisher-Yates shuffle
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }

  return deck;
}
