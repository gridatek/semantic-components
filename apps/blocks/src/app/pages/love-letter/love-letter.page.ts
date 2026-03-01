import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';

import {
  ScBadge,
  ScButton,
  ScCard,
  ScCardBody,
  ScCardHeader,
  ScCardTitle,
} from '@semantic-components/ui';

@Component({
  selector: 'app-love-letter',
  imports: [ScButton, ScBadge, ScCard, ScCardBody, ScCardHeader, ScCardTitle],
  template: `
    <div class="flex min-h-screen flex-col">
      <!-- Header -->
      <div class="border-b px-4 py-2">
        <div class="flex items-center justify-between">
          <h1 class="text-lg font-bold">Love Letter</h1>
          <span class="text-muted-foreground text-sm">Round 1/5</span>
        </div>
      </div>

      <!-- Player Row -->
      <div class="grid grid-cols-2 gap-2 px-2 py-2">
        <!-- Player 1 - active, has tokens -->
        <div scCard size="sm" class="border-primary">
          <div scCardHeader class="p-2">
            <div class="flex items-center justify-between">
              <h3 scCardTitle class="text-primary text-sm">Player 1</h3>
              <span class="text-sm">3 ❤</span>
            </div>
          </div>
          <div scCardBody class="px-2 pb-2">
            <div class="mt-1 flex flex-wrap gap-0.5">
              <span
                class="text-muted-foreground rounded bg-gray-100 px-1 text-[9px]"
              >
                G1
              </span>
              <span
                class="text-muted-foreground rounded bg-gray-100 px-1 text-[9px]"
              >
                P2
              </span>
            </div>
          </div>
        </div>

        <!-- Player 2 - has token -->
        <div scCard size="sm">
          <div scCardHeader class="p-2">
            <div class="flex items-center justify-between">
              <h3 scCardTitle class="text-sm">Player 2</h3>
              <span class="text-sm">❤</span>
            </div>
          </div>
          <div scCardBody class="px-2 pb-2">
            <span scBadge variant="secondary" class="text-[10px]">
              Protected
            </span>
            <div class="mt-1 flex flex-wrap gap-0.5">
              <span
                class="text-muted-foreground rounded bg-gray-100 px-1 text-[9px]"
              >
                H4
              </span>
            </div>
          </div>
        </div>

        <!-- Player 3 - eliminated -->
        <div scCard size="sm" class="opacity-40">
          <div scCardHeader class="p-2">
            <div class="flex items-center justify-between">
              <h3 scCardTitle class="text-sm">Player 3</h3>
              <span class="text-sm">❤</span>
            </div>
          </div>
          <div scCardBody class="px-2 pb-2">
            <span scBadge variant="destructive" class="text-[10px]">Out</span>
            <div class="mt-1 flex flex-wrap gap-0.5">
              <span
                class="text-muted-foreground rounded bg-gray-100 px-1 text-[9px]"
              >
                B3
              </span>
            </div>
          </div>
        </div>

        <!-- Player 4 - no tokens -->
        <div scCard size="sm">
          <div scCardHeader class="p-2">
            <div class="flex items-center justify-between">
              <h3 scCardTitle class="text-sm">Player 4</h3>
              <span class="text-sm">--</span>
            </div>
          </div>
          <div scCardBody class="px-2 pb-2">
            <div class="mt-1 flex flex-wrap gap-0.5">
              <span
                class="text-muted-foreground rounded bg-gray-100 px-1 text-[9px]"
              >
                G1
              </span>
            </div>
          </div>
        </div>
      </div>

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
export default class LoveLetterPage {}
