import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';

import {
  cn,
  ScAvatar,
  ScAvatarFallback,
  ScBadge,
  ScCard,
  ScCardBody,
  ScCardHeader,
  ScSeparator,
} from '@semantic-components/ui';
import {
  SiCircleXIcon,
  SiCrownIcon,
  SiHeartIcon,
  SiShieldIcon,
} from '@semantic-icons/lucide-icons';

import { Player } from './love-letter.types';

@Component({
  selector: 'app-player-card',
  imports: [
    ScCard,
    ScCardBody,
    ScCardHeader,
    ScBadge,
    ScAvatar,
    ScAvatarFallback,
    ScSeparator,
    SiHeartIcon,
    SiShieldIcon,
    SiCircleXIcon,
    SiCrownIcon,
  ],
  template: `
    <div scCard size="sm" [class]="cardClass()">
      <div scCardHeader class="p-3">
        <div class="flex items-center gap-3">
          <span scAvatar>
            <span scAvatarFallback [class]="avatarColor()">
              {{ player().name.charAt(0) }}
            </span>
          </span>
          <div class="min-w-0 flex-1">
            <div class="flex items-center gap-1.5">
              @if (isLeader()) {
                <svg siCrownIcon class="size-4 text-yellow-500"></svg>
              }
              <span class="text-sm font-semibold">{{ player().name }}</span>
              @if (player().isEliminated) {
                <span scBadge variant="destructive" class="text-[10px]">
                  <svg siCircleXIcon class="mr-0.5 size-3"></svg>
                  Out
                </span>
              } @else if (player().isProtected) {
                <span scBadge variant="secondary" class="text-[10px]">
                  <svg siShieldIcon class="mr-0.5 size-3"></svg>
                  Protected
                </span>
              }
            </div>
            <span class="text-muted-foreground text-xs">
              {{ player().hand.length }} card{{
                player().hand.length !== 1 ? 's' : ''
              }}
              in hand
            </span>
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
      <div scSeparator class="mx-3"></div>
      <div scCardBody class="px-3 pt-2 pb-3">
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
  readonly isLeader = input(false);
  readonly tokensToWin = input(4);

  private readonly avatarColors = [
    'bg-purple-500 text-white',
    'bg-yellow-500 text-white',
    'bg-blue-500 text-white',
    'bg-green-500 text-white',
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
