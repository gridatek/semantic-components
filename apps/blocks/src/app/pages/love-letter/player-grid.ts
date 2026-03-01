import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';

import { cn } from '@semantic-components/ui';

import { Player } from './love-letter.types';
import { PlayerCard } from './player-card';

@Component({
  selector: 'app-player-grid',
  imports: [PlayerCard],
  template: `
    @for (player of players(); track player.id) {
      <app-player-card
        [player]="player"
        [isYou]="player.id === youPlayerId()"
        [isActive]="player.id === activePlayerId()"
        [isLeader]="player.id === leaderId()"
        [isRoundWinner]="player.id === roundWinnerId()"
        [isGameWinner]="player.id === gameWinnerId()"
      />
    }
  `,
  host: {
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerGrid {
  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly class = computed(() =>
    cn('grid grid-cols-2 gap-2 px-2 py-2', this.classInput()),
  );

  readonly players = input.required<Player[]>();
  readonly youPlayerId = input<number>();
  readonly activePlayerId = input<number>();
  readonly roundWinnerId = input<number>();
  readonly gameWinnerId = input<number>();

  protected readonly leaderId = computed(() => {
    const players = this.players();
    let maxTokens = 0;
    let leaderId: number | undefined;

    for (const player of players) {
      if (player.tokens > maxTokens) {
        maxTokens = player.tokens;
        leaderId = player.id;
      } else if (player.tokens === maxTokens) {
        leaderId = undefined;
      }
    }

    return leaderId;
  });
}
