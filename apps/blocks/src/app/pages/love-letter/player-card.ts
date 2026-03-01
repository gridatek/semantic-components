import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';

import {
  ScBadge,
  ScCard,
  ScCardBody,
  ScCardHeader,
  ScCardTitle,
} from '@semantic-components/ui';

import { Player } from './love-letter.types';

@Component({
  selector: 'app-player-card',
  imports: [ScCard, ScCardBody, ScCardHeader, ScCardTitle, ScBadge],
  template: `
    <div scCard size="sm" [class]="cardClass()">
      <div scCardHeader class="p-2">
        <div class="flex items-center justify-between">
          <h3 scCardTitle [class]="titleClass()">{{ player().name }}</h3>
          <span class="text-sm">{{ tokensDisplay() }}</span>
        </div>
      </div>
      <div scCardBody class="px-2 pb-2">
        @if (player().isEliminated) {
          <span scBadge variant="destructive" class="text-[10px]">Out</span>
        } @else if (player().isProtected) {
          <span scBadge variant="secondary" class="text-[10px]">Protected</span>
        }
        @if (player().discardPile.length > 0) {
          <div class="mt-1 flex flex-wrap gap-0.5">
            @for (card of player().discardPile; track $index) {
              <span
                class="text-muted-foreground rounded bg-gray-100 px-1 text-[9px]"
              >
                {{ card.name.charAt(0) }}{{ card.value }}
              </span>
            }
          </div>
        }
      </div>
    </div>
  `,
  host: {
    class: 'block',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerCard {
  readonly player = input.required<Player>();
  readonly isActive = input(false);

  protected readonly cardClass = computed(() => {
    if (this.player().isEliminated) {
      return 'opacity-40';
    }
    if (this.isActive()) {
      return 'border-primary';
    }
    return '';
  });

  protected readonly titleClass = computed(() => {
    const base = 'text-sm';
    return this.isActive() ? `${base} text-primary` : base;
  });

  protected readonly tokensDisplay = computed(() => {
    const tokens = this.player().tokens;
    if (tokens === 0) {
      return '--';
    }
    return tokens > 1 ? `${tokens} ❤` : '❤';
  });
}
