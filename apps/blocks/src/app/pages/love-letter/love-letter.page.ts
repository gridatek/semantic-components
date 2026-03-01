import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';

import { ScButton } from '@semantic-components/ui';

import { CardType, Player } from './love-letter.types';
import { PlayerGrid } from './player-grid';

@Component({
  selector: 'app-love-letter',
  imports: [ScButton, PlayerGrid],
  template: `
    <div class="flex min-h-screen flex-col">
      <!-- Header -->
      <div class="border-b px-4 py-2">
        <div class="flex items-center justify-between">
          <h1 class="text-lg font-bold">Love Letter</h1>
          <span class="text-muted-foreground text-sm">Round 1/5</span>
        </div>
      </div>

      <app-player-grid [players]="players" [activePlayerId]="activePlayerId" />

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

        <!-- Hand Cards -->
        <div class="mt-auto">
          <div class="mb-3 flex justify-center gap-3">
            <button
              class="border-primary flex h-36 w-24 scale-105 flex-col items-center justify-between rounded-lg border-2 p-2 shadow transition-transform"
            >
              <span class="text-xs font-semibold">Guard</span>
              <span class="text-3xl font-bold">1</span>
              <span
                class="text-muted-foreground text-center text-[9px] leading-tight"
              >
                Guess a player's card (not Guard). If correct, they are
                eliminated.
              </span>
            </button>

            <button
              class="border-border flex h-36 w-24 flex-col items-center justify-between rounded-lg border-2 p-2 shadow transition-transform"
            >
              <span class="text-xs font-semibold">Prince</span>
              <span class="text-3xl font-bold">5</span>
              <span
                class="text-muted-foreground text-center text-[9px] leading-tight"
              >
                Choose a player to discard and draw a new card.
              </span>
            </button>
          </div>

          <button scButton class="w-full">Play Guard</button>
        </div>
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
  readonly activePlayerId = 1;

  readonly players: Player[] = [
    {
      id: 1,
      name: 'Player 1',
      hand: [],
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
      ],
    },
    {
      id: 2,
      name: 'Player 2',
      hand: [],
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
          type: CardType.Baron,
          value: 3,
          name: 'Baron',
          description: '',
          reason: 'forced',
        },
      ],
    },
    {
      id: 4,
      name: 'Player 4',
      hand: [],
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
