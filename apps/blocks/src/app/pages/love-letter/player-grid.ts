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
        [isActive]="player.id === activePlayerId()"
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
  readonly activePlayerId = input<number>();
}
