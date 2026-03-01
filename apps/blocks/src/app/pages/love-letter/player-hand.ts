import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';

import { cn, ScButton } from '@semantic-components/ui';

import { GameCard } from './game-card';
import { Card } from './love-letter.types';

@Component({
  selector: 'app-player-hand',
  imports: [ScButton, GameCard],
  template: `
    <div class="mb-3 flex justify-center gap-3">
      @for (card of cards(); track $index) {
        <app-game-card
          [name]="card.name"
          [value]="card.value"
          [description]="card.description"
          [class]="
            $index === selectedIndex()
              ? 'border-primary scale-105 cursor-pointer shadow transition-transform'
              : 'border-border cursor-pointer transition-transform hover:scale-105 hover:shadow'
          "
          (click)="select($index)"
        />
      } @empty {
        <p class="text-muted-foreground text-sm">No cards in hand</p>
      }
    </div>

    <ng-content />

    @if (selectedIndex() !== null) {
      <button
        scButton
        class="w-full"
        (click)="playCard.emit(cards()[selectedIndex()!])"
      >
        Play {{ cards()[selectedIndex()!].name }}
      </button>
    }
  `,
  host: {
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerHand {
  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly class = computed(() =>
    cn('block mt-auto', this.classInput()),
  );

  readonly cards = input.required<Card[]>();
  readonly selectedIndex = input<number | null>(null);

  readonly cardSelected = output<number>();
  readonly playCard = output<Card>();

  protected select(index: number) {
    this.cardSelected.emit(index);
  }
}
