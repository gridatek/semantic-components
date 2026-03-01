import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';

import {
  cn,
  ScBadge,
  ScCard,
  ScCardBody,
  ScCardHeader,
} from '@semantic-components/ui';
import { SiHeartIcon } from '@semantic-icons/lucide-icons';

import { Player } from './love-letter.types';

@Component({
  selector: 'app-player-card',
  imports: [ScCard, ScCardBody, ScCardHeader, ScBadge, SiHeartIcon],
  template: `
    <div scCard size="sm" [class]="cardClass()">
      <div scCardHeader class="p-3">
        <div class="flex items-center gap-3">
          <div
            [class]="
              'flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ' +
              avatarColor()
            "
          >
            {{ player().name.charAt(0) }}
          </div>
          <div class="min-w-0 flex-1">
            <div class="flex items-center gap-1.5">
              <span class="text-sm font-semibold">{{ player().name }}</span>
              @if (player().isEliminated) {
                <span scBadge variant="destructive" class="text-[10px]">
                  Out
                </span>
              } @else if (player().isProtected) {
                <span scBadge variant="secondary" class="text-[10px]">
                  Protected
                </span>
              }
            </div>
          </div>
          <span class="flex items-center gap-1 text-sm">
            {{ player().tokens }}/{{ tokensToWin() }}
            <svg
              siHeartIcon
              class="inline size-4 fill-red-500 text-red-500"
              aria-label="tokens"
            ></svg>
          </span>
        </div>
      </div>
      <div scCardBody class="px-3 pb-3">
        <div class="flex flex-wrap gap-1">
          @for (card of player().discardPile; track $index) {
            <span
              [class]="
                card.reason === 'forced'
                  ? 'rounded-md border border-dashed border-red-300 bg-red-50 px-2 py-0.5 text-[11px] text-red-400'
                  : 'rounded-md bg-purple-100 px-2 py-0.5 text-[11px] text-purple-700'
              "
            >
              {{ card.name }}
            </span>
          }
        </div>
      </div>
    </div>
  `,
  host: {
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerCard {
  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly class = computed(() => cn('block', this.classInput()));

  readonly player = input.required<Player>();
  readonly isActive = input(false);
  readonly tokensToWin = input(4);

  private readonly avatarColors = [
    'bg-purple-500',
    'bg-yellow-500',
    'bg-blue-500',
    'bg-green-500',
  ];

  protected readonly cardClass = computed(() => {
    if (this.player().isEliminated) {
      return 'opacity-40';
    }
    if (this.isActive()) {
      return 'border-primary border-2 shadow';
    }
    return '';
  });

  protected readonly avatarColor = computed(
    () => this.avatarColors[this.player().id % this.avatarColors.length],
  );
}
