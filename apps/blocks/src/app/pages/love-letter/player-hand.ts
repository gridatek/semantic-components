import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';

import { cn, ScButton } from '@semantic-components/ui';

import { Card } from './love-letter.types';

@Component({
  selector: 'app-player-hand',
  imports: [ScButton],
  template: `
    <div class="mb-3 flex justify-center gap-3">
      @for (card of cards(); track $index) {
        <button
          [class]="
            $index === selectedIndex()
              ? 'border-primary flex h-36 w-24 scale-105 flex-col items-center justify-between rounded-lg border-2 p-2 shadow transition-transform'
              : 'border-border flex h-36 w-24 flex-col items-center justify-between rounded-lg border-2 p-2 transition-transform hover:scale-105 hover:shadow'
          "
          (click)="select($index)"
        >
          <span class="text-xs font-semibold">{{ card.name }}</span>
          <span class="text-3xl font-bold">{{ card.value }}</span>
          <span
            class="text-muted-foreground text-center text-[9px] leading-tight"
          >
            {{ card.description }}
          </span>
        </button>
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
