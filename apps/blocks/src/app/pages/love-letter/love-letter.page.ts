import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  signal,
  ViewEncapsulation,
} from '@angular/core';

import {
  ScButton,
  ScCard,
  ScCardBody,
  ScCardHeader,
  ScCardTitle,
} from '@semantic-components/ui';

import { GameCard } from './game-card';
import { GameLog } from './game-log';
import { CardType } from './love-letter.types';
import { LoveLetterService } from './love-letter.service';
import { PlayerGrid } from './player-grid';
import { PlayerHand } from './player-hand';

const AI_DELAY = 800;

@Component({
  selector: 'app-love-letter',
  imports: [
    PlayerGrid,
    PlayerHand,
    GameCard,
    GameLog,
    ScCard,
    ScCardBody,
    ScCardHeader,
    ScCardTitle,
    ScButton,
  ],
  providers: [LoveLetterService],
  template: `
    <div class="flex min-h-screen flex-col lg:h-screen lg:overflow-hidden">
      <!-- Header -->
      <div class="border-b px-4 py-2">
        <div class="flex items-center justify-between">
          <h1 class="text-lg font-bold">Love Letter</h1>
          <span class="text-muted-foreground text-sm">
            Round {{ service.roundNumber() }}
          </span>
        </div>
      </div>

      <div class="flex min-h-0 flex-1 flex-col lg:flex-row">
        <!-- Left: Players -->
        <div class="lg:w-64 lg:shrink-0 lg:overflow-y-auto lg:border-r">
          <app-player-grid
            [players]="service.players()"
            [youPlayerId]="0"
            [activePlayerId]="activePlayerId()"
            [roundWinnerId]="service.roundWinnerId() ?? undefined"
            [gameWinnerId]="service.gameWinnerId() ?? undefined"
          />
        </div>

        <!-- Center: Game Area -->
        <div class="flex flex-1 flex-col gap-4 overflow-y-auto p-2 lg:p-4">
          <!-- Message -->
          <div scCard size="sm">
            <div scCardBody>
              <p class="text-center font-semibold">
                {{ service.message() }}
              </p>
            </div>
          </div>

          <!-- Table -->
          <div scCard>
            <div scCardHeader>
              <h3 scCardTitle>Table</h3>
            </div>
            <div scCardBody>
              <div class="flex justify-center gap-4">
                <!-- Deck -->
                <div
                  class="flex h-24 w-18 flex-col items-center justify-center rounded-lg bg-rose-300 shadow-md lg:h-36 lg:w-24"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    stroke-width="1.5"
                    class="size-8 lg:size-12"
                  >
                    <path
                      d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
                    />
                  </svg>
                  <span class="mt-2 text-base font-bold text-white lg:text-lg">
                    {{ service.deck().length }}
                  </span>
                </div>

                <!-- Revealed card (Priest) -->
                @if (service.revealedCard(); as card) {
                  <app-game-card
                    class="border-border shadow-md"
                    [name]="card.name"
                    [value]="card.value"
                    [description]="card.description"
                  />
                }
              </div>
            </div>
          </div>

          <!-- Setup phase -->
          @if (service.phase() === 'setup') {
            <button scButton class="w-full" (click)="service.startGame()">
              Start Game
            </button>
          }

          <!-- Draw phase (human only) -->
          @if (service.phase() === 'draw' && service.isHumanTurn()) {
            <button
              scButton
              class="w-full"
              (click)="service.confirmTurnStart()"
            >
              Draw Card
            </button>
          }

          <!-- Play/Target phase (human only) -->
          @if (showHand()) {
            <div scCard>
              <div scCardHeader>
                <h3 scCardTitle>Your Hand</h3>
              </div>
              <div scCardBody>
                <app-player-hand
                  [cards]="humanHand()"
                  [selectedIndex]="selectedIndex()"
                  [canPlay]="canPlay()"
                  (cardSelected)="onCardSelected($event)"
                  (playCard)="onPlayCard()"
                >
                  <!-- Target + guard guess shown inline when a targeting card is selected -->
                  @if (selectedCardNeedsTarget()) {
                    <div class="mb-3">
                      <h3
                        class="text-muted-foreground mb-2 text-sm font-medium"
                      >
                        Select Target Player
                      </h3>
                      <div class="flex justify-center gap-3">
                        @for (target of visibleTargets(); track target.id) {
                          <button
                            [class]="
                              target.id === selectedTargetId()
                                ? 'border-primary rounded-lg border-2 px-5 py-2.5 text-sm font-medium shadow transition-transform'
                                : 'border-border rounded-lg border-2 px-5 py-2.5 text-sm font-medium transition-transform hover:scale-105 hover:shadow'
                            "
                            (click)="selectedTargetId.set(target.id)"
                          >
                            {{ target.name }}
                          </button>
                        }
                      </div>
                    </div>

                    @if (isGuardSelected()) {
                      <div class="mb-3">
                        <h3
                          class="text-muted-foreground mb-2 text-sm font-medium"
                        >
                          Guess Card
                        </h3>
                        <div class="grid grid-cols-4 gap-3">
                          @for (
                            option of service.guardGuessOptions();
                            track option.type
                          ) {
                            <button
                              [class]="
                                option.type === selectedGuess()
                                  ? 'border-primary rounded-lg border-2 px-3 py-2 text-sm font-medium shadow transition-transform'
                                  : 'border-border rounded-lg border-2 px-3 py-2 text-sm font-medium transition-transform hover:scale-105 hover:shadow'
                              "
                              (click)="selectedGuess.set(option.type)"
                            >
                              {{ option.name }} ({{ option.value }})
                            </button>
                          }
                        </div>
                      </div>
                    }
                  }
                </app-player-hand>
              </div>
            </div>
          }

          <!-- Resolve phase (Priest reveal, human only) -->
          @if (service.phase() === 'resolve' && service.isHumanTurn()) {
            <button scButton class="w-full" (click)="service.dismissReveal()">
              Dismiss
            </button>
          }

          <!-- Round over -->
          @if (service.phase() === 'round-over') {
            <button scButton class="w-full" (click)="service.startRound()">
              Next Round
            </button>
          }

          <!-- Game over -->
          @if (service.phase() === 'game-over') {
            <button scButton class="w-full" (click)="service.resetGame()">
              New Game
            </button>
          }
        </div>

        <!-- Right: Log (desktop only) -->
        <div
          class="hidden lg:block lg:w-64 lg:shrink-0 lg:overflow-y-auto lg:border-l lg:p-3"
        >
          <div scCard class="h-full">
            <div scCardHeader>
              <h3 scCardTitle>Game Log</h3>
            </div>
            <div scCardBody>
              <app-game-log [log]="service.gameLog()" />
            </div>
          </div>
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
  protected readonly service = inject(LoveLetterService);
  private readonly destroyRef = inject(DestroyRef);

  readonly activePlayerId = computed(() => this.service.currentPlayer()?.id);

  readonly selectedIndex = signal<number | null>(null);
  readonly selectedTargetId = signal<number | null>(null);
  readonly selectedGuess = signal<CardType | null>(null);

  private aiTimeoutId: ReturnType<typeof setTimeout> | null = null;

  readonly humanHand = computed(() => {
    const player = this.service.currentPlayer();
    if (!player || player.id !== 0) return [];
    return player.hand;
  });

  readonly showHand = computed(() => {
    const phase = this.service.phase();
    const isHuman = this.service.isHumanTurn();
    return isHuman && phase === 'play';
  });

  private readonly selectedCardType = computed(() => {
    const idx = this.selectedIndex();
    if (idx === null) return null;
    return this.humanHand()[idx]?.type ?? null;
  });

  readonly selectedCardNeedsTarget = computed(() => {
    const type = this.selectedCardType();
    if (!type) return false;
    return [
      CardType.Guard,
      CardType.Priest,
      CardType.Baron,
      CardType.Prince,
      CardType.King,
    ].includes(type);
  });

  readonly isPrinceSelected = computed(
    () => this.selectedCardType() === CardType.Prince,
  );

  readonly isGuardSelected = computed(
    () => this.selectedCardType() === CardType.Guard,
  );

  readonly visibleTargets = computed(() => {
    const targets = this.service.availableTargets();
    if (this.isPrinceSelected()) {
      const current = this.service.currentPlayer();
      if (current) {
        return [current, ...targets];
      }
    }
    return targets;
  });

  readonly canPlay = computed(() => {
    if (this.selectedIndex() === null) return false;
    if (!this.selectedCardNeedsTarget()) return true;
    if (this.visibleTargets().length === 0) return true;
    if (this.selectedTargetId() === null) return false;
    if (this.isGuardSelected() && this.selectedGuess() === null) return false;
    return true;
  });

  constructor() {
    // AI orchestration effect
    effect(() => {
      const phase = this.service.phase();
      const isHuman = this.service.isHumanTurn();

      if (
        isHuman ||
        phase === 'setup' ||
        phase === 'round-over' ||
        phase === 'game-over'
      ) {
        return;
      }

      this.scheduleAi(phase);
    });

    this.destroyRef.onDestroy(() => this.clearAiTimeout());
  }

  onCardSelected(index: number): void {
    if (this.service.phase() !== 'play') return;
    this.selectedIndex.set(index);
    this.selectedTargetId.set(null);
    this.selectedGuess.set(null);
    const card = this.humanHand()[index];
    if (card) {
      this.service.selectCard(card);
    }
  }

  onPlayCard(): void {
    const needsTarget = this.selectedCardNeedsTarget();
    const targets = this.service.availableTargets();

    // For targeting cards: require target selection (unless no targets available)
    if (needsTarget && targets.length > 0) {
      const targetId = this.selectedTargetId();
      if (targetId === null) return;

      if (this.isGuardSelected() && this.selectedGuess() === null) return;

      // Play the card (moves to target phase internally)
      this.service.playSelectedCard();

      // Immediately submit the pre-selected target
      const target = this.service.players().find((p) => p.id === targetId);
      if (target) {
        const guess = this.isGuardSelected()
          ? (this.selectedGuess() ?? undefined)
          : undefined;
        this.service.selectTarget(target, guess);
      }
    } else {
      this.service.playSelectedCard();
    }

    this.selectedIndex.set(null);
    this.selectedTargetId.set(null);
    this.selectedGuess.set(null);
  }

  private scheduleAi(phase: string): void {
    this.clearAiTimeout();
    this.aiTimeoutId = setTimeout(() => {
      switch (phase) {
        case 'draw':
          this.aiDraw();
          break;
        case 'play':
          this.aiPlay();
          break;
        case 'target':
          this.aiSelectTarget();
          break;
        case 'resolve':
          this.aiDismiss();
          break;
      }
    }, AI_DELAY);
  }

  private aiDraw(): void {
    this.service.confirmTurnStart();
  }

  private aiPlay(): void {
    const player = this.service.currentPlayer();
    if (!player) return;

    // Must play Countess rule
    if (this.service.mustPlayCountess()) {
      const countess = player.hand.find((c) => c.type === CardType.Countess);
      if (countess) {
        this.service.selectCard(countess);
        this.service.playSelectedCard();
        return;
      }
    }

    // Play lowest value card (preserve high cards)
    const sorted = [...player.hand].sort((a, b) => a.value - b.value);
    const card = sorted[0];
    if (card) {
      this.service.selectCard(card);
      this.service.playSelectedCard();
    }
  }

  private aiSelectTarget(): void {
    const targets = this.service.availableTargets();
    if (targets.length === 0) return;

    const target = targets[Math.floor(Math.random() * targets.length)];
    const player = this.service.currentPlayer();
    if (!player) return;

    const lastPlayed = player.discardPile[player.discardPile.length - 1];

    if (lastPlayed?.type === CardType.Guard) {
      const guessOptions = this.service.guardGuessOptions();
      const guess =
        guessOptions[Math.floor(Math.random() * guessOptions.length)];
      this.service.selectTarget(target, guess.type);
    } else {
      this.service.selectTarget(target);
    }
  }

  private aiDismiss(): void {
    this.service.dismissReveal();
  }

  private clearAiTimeout(): void {
    if (this.aiTimeoutId !== null) {
      clearTimeout(this.aiTimeoutId);
      this.aiTimeoutId = null;
    }
  }
}
