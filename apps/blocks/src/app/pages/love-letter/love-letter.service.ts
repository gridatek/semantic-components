import { computed, Injectable, signal } from '@angular/core';

import {
  Card,
  CARDS,
  CardType,
  createDeck,
  GamePhase,
  Player,
} from './love-letter.types';

const TOKENS_TO_WIN = 4;

@Injectable()
export class LoveLetterService {
  readonly players = signal<Player[]>([]);
  readonly deck = signal<Card[]>([]);
  readonly currentPlayerIndex = signal(0);
  readonly phase = signal<GamePhase>('setup');
  readonly removedCard = signal<Card | null>(null);
  readonly gameLog = signal<string[]>([]);
  readonly roundNumber = signal(1);
  readonly message = signal('Welcome to Love Letter!');
  readonly selectedCard = signal<Card | null>(null);
  readonly revealedCard = signal<Card | null>(null);

  readonly currentPlayer = computed(() => {
    const players = this.players();
    const index = this.currentPlayerIndex();
    return players[index] ?? null;
  });

  readonly activePlayers = computed(() =>
    this.players().filter((p) => !p.isEliminated),
  );

  readonly availableTargets = computed(() => {
    const current = this.currentPlayer();
    if (!current) return [];
    return this.activePlayers().filter(
      (p) => p.id !== current.id && !p.isProtected,
    );
  });

  readonly guardGuessOptions = computed(() =>
    CARDS.filter((c) => c.type !== CardType.Guard),
  );

  readonly mustPlayCountess = computed(() => {
    const player = this.currentPlayer();
    if (!player) return false;
    const hasCountess = player.hand.some((c) => c.type === CardType.Countess);
    const hasKingOrPrince = player.hand.some(
      (c) => c.type === CardType.King || c.type === CardType.Prince,
    );
    return hasCountess && hasKingOrPrince;
  });

  startGame(): void {
    const players: Player[] = [
      this.createPlayer(0, 'Player 1'),
      this.createPlayer(1, 'Player 2'),
      this.createPlayer(2, 'Player 3'),
      this.createPlayer(3, 'Player 4'),
    ];
    this.players.set(players);
    this.roundNumber.set(1);
    this.gameLog.set([]);
    this.startRound();
  }

  startRound(): void {
    const newDeck = createDeck();
    const removed = newDeck.pop()!;
    this.removedCard.set(removed);
    this.deck.set(newDeck);

    const players: Player[] = this.players().map((p) => ({
      ...p,
      hand: [] as Card[],
      isEliminated: false,
      isProtected: false,
      discardPile: [] as Card[],
    }));

    // Deal one card to each player
    const deckCopy = [...newDeck];
    for (const player of players) {
      player.hand = [deckCopy.pop()!];
    }
    this.deck.set(deckCopy);
    this.players.set(players);

    this.currentPlayerIndex.set(0);
    this.selectedCard.set(null);
    this.revealedCard.set(null);
    this.addLog(`--- Round ${this.roundNumber()} ---`);
    this.message.set(`Pass the device to ${players[0].name}`);
    this.phase.set('draw');
  }

  confirmTurnStart(): void {
    this.drawCard();
  }

  selectCard(card: Card): void {
    if (this.phase() !== 'play') return;

    if (this.mustPlayCountess() && card.type !== CardType.Countess) {
      this.message.set('You must play the Countess!');
      return;
    }

    this.selectedCard.set(card);
  }

  playSelectedCard(): void {
    const card = this.selectedCard();
    if (!card) return;

    const player = this.currentPlayer();
    if (!player) return;

    // Remove card from hand
    this.updatePlayer(player.id, (p) => ({
      ...p,
      hand: p.hand.filter((c) => c !== card),
      discardPile: [...p.discardPile, card],
    }));

    this.addLog(`${player.name} played ${card.name}`);

    // Handle card effects
    switch (card.type) {
      case CardType.Handmaid:
        this.resolveHandmaid();
        break;
      case CardType.Countess:
        this.resolveCountess();
        break;
      case CardType.Princess:
        this.resolvePrincess();
        break;
      case CardType.Guard:
      case CardType.Priest:
      case CardType.Baron:
      case CardType.Prince:
      case CardType.King:
        if (
          this.needsTarget(card.type) &&
          this.availableTargets().length === 0
        ) {
          // No valid targets — card has no effect
          this.message.set(
            `${card.name} played with no valid targets. No effect.`,
          );
          this.endTurn();
        } else if (
          card.type === CardType.Prince &&
          this.availableTargets().length === 0
        ) {
          // Prince can self-target
          this.selectTarget(player);
        } else {
          this.phase.set('target');
          this.message.set(`Select a target for ${card.name}`);
        }
        break;
    }

    this.selectedCard.set(null);
  }

  selectTarget(target: Player, guardGuess?: CardType): void {
    const card =
      this.currentPlayer()?.discardPile[
        this.currentPlayer()!.discardPile.length - 1
      ];
    if (!card) return;

    const player = this.currentPlayer()!;

    switch (card.type) {
      case CardType.Guard:
        if (guardGuess) {
          this.resolveGuard(target, guardGuess);
        }
        break;
      case CardType.Priest:
        this.resolvePriest(target);
        break;
      case CardType.Baron:
        this.resolveBaron(player, target);
        break;
      case CardType.Prince:
        this.resolvePrince(target);
        break;
      case CardType.King:
        this.resolveKing(player, target);
        break;
    }
  }

  dismissReveal(): void {
    this.revealedCard.set(null);
    this.endTurn();
  }

  resetGame(): void {
    this.players.set([]);
    this.deck.set([]);
    this.phase.set('setup');
    this.gameLog.set([]);
    this.message.set('Welcome to Love Letter!');
    this.roundNumber.set(1);
    this.selectedCard.set(null);
    this.revealedCard.set(null);
  }

  private drawCard(): void {
    const deckCopy = [...this.deck()];
    const card = deckCopy.pop();
    if (!card) {
      this.checkRoundEnd();
      return;
    }
    this.deck.set(deckCopy);

    const player = this.currentPlayer()!;
    this.updatePlayer(player.id, (p) => ({
      ...p,
      hand: [...p.hand, card],
      isProtected: false,
    }));

    this.phase.set('play');
    this.message.set(`${player.name}, choose a card to play`);
  }

  private needsTarget(type: CardType): boolean {
    return [
      CardType.Guard,
      CardType.Priest,
      CardType.Baron,
      CardType.King,
    ].includes(type);
  }

  private resolveGuard(target: Player, guess: CardType): void {
    const targetCard = this.getPlayer(target.id).hand[0];
    if (targetCard && targetCard.type === guess) {
      this.addLog(
        `${this.currentPlayer()!.name} guessed ${target.name}'s ${targetCard.name} correctly!`,
      );
      this.eliminatePlayer(target.id);
      this.message.set(
        `Correct! ${target.name} had ${targetCard.name} and is eliminated!`,
      );
    } else {
      this.addLog(
        `${this.currentPlayer()!.name} guessed wrong for ${target.name}`,
      );
      this.message.set(`Wrong guess! ${target.name} does not have that card.`);
    }
    this.endTurn();
  }

  private resolvePriest(target: Player): void {
    const targetCard = this.getPlayer(target.id).hand[0];
    if (targetCard) {
      this.addLog(
        `${this.currentPlayer()!.name} looked at ${target.name}'s hand`,
      );
      this.revealedCard.set(targetCard);
      this.message.set(
        `${target.name} has: ${targetCard.name} (${targetCard.value})`,
      );
      this.phase.set('resolve');
    }
  }

  private resolveBaron(player: Player, target: Player): void {
    const playerCard = this.getPlayer(player.id).hand[0];
    const targetCard = this.getPlayer(target.id).hand[0];

    if (!playerCard || !targetCard) return;

    this.addLog(`${player.name} compared hands with ${target.name}`);

    if (playerCard.value > targetCard.value) {
      this.eliminatePlayer(target.id);
      this.message.set(
        `${player.name} (${playerCard.value}) beats ${target.name} (${targetCard.value}). ${target.name} is eliminated!`,
      );
    } else if (playerCard.value < targetCard.value) {
      this.eliminatePlayer(player.id);
      this.message.set(
        `${target.name} (${targetCard.value}) beats ${player.name} (${playerCard.value}). ${player.name} is eliminated!`,
      );
    } else {
      this.message.set(
        `${player.name} and ${target.name} tie (${playerCard.value}). No one is eliminated.`,
      );
    }
    this.endTurn();
  }

  private resolveHandmaid(): void {
    const player = this.currentPlayer()!;
    this.updatePlayer(player.id, (p) => ({ ...p, isProtected: true }));
    this.addLog(`${player.name} is protected until next turn`);
    this.message.set(`${player.name} is now protected!`);
    this.endTurn();
  }

  private resolvePrince(target: Player): void {
    const t = this.getPlayer(target.id);
    const discardedCard = t.hand[0];

    if (!discardedCard) return;

    if (discardedCard.type === CardType.Princess) {
      this.addLog(`${target.name} discarded the Princess and is eliminated!`);
      this.eliminatePlayer(target.id);
      this.message.set(
        `${target.name} discarded the Princess and is eliminated!`,
      );
      this.endTurn();
      return;
    }

    // Discard and draw
    const deckCopy = [...this.deck()];
    const newCard = deckCopy.pop();

    if (newCard) {
      this.deck.set(deckCopy);
      this.updatePlayer(target.id, (p) => ({
        ...p,
        hand: [newCard],
        discardPile: [...p.discardPile, discardedCard],
      }));
    } else {
      // If deck is empty, draw the removed card
      const removed = this.removedCard();
      if (removed) {
        this.updatePlayer(target.id, (p) => ({
          ...p,
          hand: [removed],
          discardPile: [...p.discardPile, discardedCard],
        }));
        this.removedCard.set(null);
      }
    }

    this.addLog(
      `${target.name} discarded ${discardedCard.name} and drew a new card`,
    );
    this.message.set(`${target.name} discarded and drew a new card.`);
    this.endTurn();
  }

  private resolveKing(player: Player, target: Player): void {
    const playerCard = this.getPlayer(player.id).hand[0];
    const targetCard = this.getPlayer(target.id).hand[0];

    if (!playerCard || !targetCard) return;

    this.updatePlayer(player.id, (p) => ({ ...p, hand: [targetCard] }));
    this.updatePlayer(target.id, (p) => ({ ...p, hand: [playerCard] }));

    this.addLog(`${player.name} swapped hands with ${target.name}`);
    this.message.set(`${player.name} swapped hands with ${target.name}.`);
    this.endTurn();
  }

  private resolveCountess(): void {
    this.addLog(`${this.currentPlayer()!.name} played the Countess`);
    this.message.set('Countess played. No effect.');
    this.endTurn();
  }

  private resolvePrincess(): void {
    const player = this.currentPlayer()!;
    this.eliminatePlayer(player.id);
    this.addLog(`${player.name} played the Princess and is eliminated!`);
    this.message.set(`${player.name} played the Princess and is eliminated!`);
    this.endTurn();
  }

  private eliminatePlayer(playerId: number): void {
    this.updatePlayer(playerId, (p) => ({
      ...p,
      isEliminated: true,
      hand: [],
    }));
  }

  private endTurn(): void {
    // Check if round is over
    const active = this.players().filter((p) => !p.isEliminated);

    if (active.length === 1) {
      this.awardToken(active[0].id);
      return;
    }

    if (this.deck().length === 0) {
      this.checkRoundEnd();
      return;
    }

    // Move to next player
    this.advanceToNextPlayer();
  }

  private advanceToNextPlayer(): void {
    const players = this.players();
    let nextIndex = (this.currentPlayerIndex() + 1) % players.length;

    // Skip eliminated players
    let safety = 0;
    while (players[nextIndex].isEliminated && safety < 4) {
      nextIndex = (nextIndex + 1) % players.length;
      safety++;
    }

    this.currentPlayerIndex.set(nextIndex);
    this.message.set(`Pass the device to ${players[nextIndex].name}`);
    this.phase.set('draw');
  }

  private checkRoundEnd(): void {
    const active = this.players().filter((p) => !p.isEliminated);

    if (active.length <= 1) {
      if (active.length === 1) {
        this.awardToken(active[0].id);
      }
      return;
    }

    // Compare remaining hands — highest card wins
    let winner = active[0];
    for (const player of active) {
      if (
        player.hand[0] &&
        winner.hand[0] &&
        player.hand[0].value > winner.hand[0].value
      ) {
        winner = player;
      }
    }

    const handSummary = active
      .map(
        (p) =>
          `${p.name}: ${p.hand[0]?.name ?? '?'} (${p.hand[0]?.value ?? '?'})`,
      )
      .join(', ');

    this.addLog(`Deck empty! Comparing hands: ${handSummary}`);
    this.awardToken(winner.id);
  }

  private awardToken(playerId: number): void {
    this.updatePlayer(playerId, (p) => ({
      ...p,
      tokens: p.tokens + 1,
    }));

    const player = this.getPlayer(playerId);

    if (player.tokens >= TOKENS_TO_WIN) {
      this.addLog(`${player.name} wins the game with ${player.tokens} tokens!`);
      this.message.set(`${player.name} wins the game!`);
      this.phase.set('game-over');
    } else {
      this.addLog(`${player.name} wins the round!`);
      this.message.set(
        `${player.name} wins Round ${this.roundNumber()}! (${player.tokens} tokens)`,
      );
      this.phase.set('round-over');
      this.roundNumber.update((n) => n + 1);
    }
  }

  private getPlayer(id: number): Player {
    return this.players().find((p) => p.id === id)!;
  }

  private updatePlayer(id: number, updater: (p: Player) => Player): void {
    this.players.update((players) =>
      players.map((p) => (p.id === id ? updater(p) : p)),
    );
  }

  private addLog(msg: string): void {
    this.gameLog.update((log) => [...log, msg]);
  }

  private createPlayer(id: number, name: string): Player {
    return {
      id,
      name,
      hand: [],
      isEliminated: false,
      isProtected: false,
      tokens: 0,
      discardPile: [],
    };
  }
}
