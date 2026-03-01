import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';

import { Card, CardType, Player } from './love-letter.types';
import { PlayerGrid } from './player-grid';
import { PlayerHand } from './player-hand';

@Component({
  selector: 'app-love-letter',
  imports: [PlayerGrid, PlayerHand],
  template: `
    <div class="flex min-h-screen flex-col">
      <!-- Header -->
      <div class="border-b px-4 py-2">
        <div class="flex items-center justify-between">
          <h1 class="text-lg font-bold">Love Letter</h1>
          <span class="text-muted-foreground text-sm">Round 1/5</span>
        </div>
      </div>

      <app-player-grid
        [players]="players"
        [youPlayerId]="youPlayerId"
        [activePlayerId]="activePlayerId"
      />

      <!-- Game Area -->
      <div class="flex flex-1 flex-col justify-between p-4">
        <!-- Log / Message -->
        <div class="mb-4 flex-1 overflow-y-auto">
          <p class="mb-2 text-center font-semibold">
            Player 1, choose a card to play
          </p>
          <div class="text-muted-foreground space-y-1 text-center text-xs">
            <p>--- Round 1 ---</p>
            <p>Player 3 played Guard</p>
            <p>Player 3 guessed wrong for Player 2</p>
            <p>Player 4 played Guard</p>
            <p>Player 4 guessed Player 3's Baron correctly!</p>
          </div>
        </div>

        <!-- Card Reveal -->
        <div class="mb-4 flex justify-center gap-4">
          <!-- Deck (card back) -->
          <div
            class="flex h-36 w-24 flex-col items-center justify-center rounded-lg bg-rose-300 shadow-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              stroke-width="1.5"
              class="size-12"
            >
              <path
                d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
              />
            </svg>
            <span class="mt-2 text-lg font-bold text-white">9</span>
          </div>

          <!-- Revealed card -->
          <div
            class="border-border flex h-36 w-24 flex-col items-center justify-between rounded-lg border-2 bg-white p-2 shadow-md"
          >
            <span class="text-primary text-2xl font-bold">4</span>
            <span class="text-sm font-bold tracking-wide">HANDMAID</span>
            <span
              class="text-muted-foreground text-center text-[10px] leading-tight"
            >
              Protection until your next turn
            </span>
          </div>
        </div>

        <!-- Hand Cards -->
        <app-player-hand [cards]="handCards" [selectedIndex]="selectedIndex">
          <!-- Select Target Player -->
          <div class="mb-3">
            <h3 class="text-muted-foreground mb-2 text-sm font-medium">
              Select Target Player
            </h3>
            <div class="flex justify-center gap-2">
              <button
                class="border-primary rounded-md border-2 px-4 py-1.5 text-sm shadow"
              >
                Player 2
              </button>
              <button
                class="border-border rounded-md border-2 px-4 py-1.5 text-sm"
              >
                Player 4
              </button>
            </div>
          </div>

          <!-- Guess Card (Guard only) -->
          <div class="mb-3">
            <h3 class="text-muted-foreground mb-2 text-sm font-medium">
              Guess Card (Guard only)
            </h3>
            <div class="grid grid-cols-4 gap-2">
              <button
                class="border-primary rounded-md border-2 px-2 py-1.5 text-xs shadow"
              >
                Priest (2)
              </button>
              <button
                class="border-border rounded-md border-2 px-2 py-1.5 text-xs"
              >
                Baron (3)
              </button>
              <button
                class="border-border rounded-md border-2 px-2 py-1.5 text-xs"
              >
                Handmaid (4)
              </button>
              <button
                class="border-border rounded-md border-2 px-2 py-1.5 text-xs"
              >
                Prince (5)
              </button>
              <button
                class="border-border rounded-md border-2 px-2 py-1.5 text-xs"
              >
                King (6)
              </button>
              <button
                class="border-border rounded-md border-2 px-2 py-1.5 text-xs"
              >
                Countess (7)
              </button>
              <button
                class="border-border rounded-md border-2 px-2 py-1.5 text-xs"
              >
                Princess (8)
              </button>
            </div>
          </div>
        </app-player-hand>
      </div>
    </div>
  `,
  host: {
    class: 'block',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LoveLetterPage {
  readonly youPlayerId = 1;
  readonly activePlayerId = 1;
  readonly selectedIndex: number | null = 0;

  readonly handCards: Card[] = [
    {
      type: CardType.Guard,
      value: 1,
      name: 'Guard',
      description:
        "Guess a player's card (not Guard). If correct, they are eliminated.",
    },
    {
      type: CardType.Prince,
      value: 5,
      name: 'Prince',
      description:
        'Choose a player (including yourself) to discard and draw a new card.',
    },
  ];

  readonly players: Player[] = [
    {
      id: 1,
      name: 'Player 1',
      hand: [
        {
          type: CardType.Guard,
          value: 1,
          name: 'Guard',
          description: '',
        },
        {
          type: CardType.Prince,
          value: 5,
          name: 'Prince',
          description: '',
        },
      ],
      isEliminated: false,
      isProtected: false,
      tokens: 3,
      discardPile: [
        {
          type: CardType.Guard,
          value: 1,
          name: 'Guard',
          description: '',
          reason: 'played',
        },
        {
          type: CardType.Priest,
          value: 2,
          name: 'Priest',
          description: '',
          reason: 'played',
        },
        {
          type: CardType.Baron,
          value: 3,
          name: 'Baron',
          description: '',
          reason: 'forced',
        },
      ],
    },
    {
      id: 2,
      name: 'Player 2',
      hand: [
        {
          type: CardType.Handmaid,
          value: 4,
          name: 'Handmaid',
          description: '',
        },
      ],
      isEliminated: false,
      isProtected: true,
      tokens: 1,
      discardPile: [
        {
          type: CardType.Handmaid,
          value: 4,
          name: 'Handmaid',
          description: '',
          reason: 'played',
        },
      ],
    },
    {
      id: 3,
      name: 'Player 3',
      hand: [],
      isEliminated: true,
      isProtected: false,
      tokens: 1,
      discardPile: [
        {
          type: CardType.Guard,
          value: 1,
          name: 'Guard',
          description: '',
          reason: 'played',
        },
        {
          type: CardType.Princess,
          value: 8,
          name: 'Princess',
          description: '',
          reason: 'forced',
        },
      ],
    },
    {
      id: 4,
      name: 'Player 4',
      hand: [
        {
          type: CardType.King,
          value: 6,
          name: 'King',
          description: '',
        },
      ],
      isEliminated: false,
      isProtected: false,
      tokens: 0,
      discardPile: [
        {
          type: CardType.Guard,
          value: 1,
          name: 'Guard',
          description: '',
          reason: 'played',
        },
      ],
    },
  ];
}
