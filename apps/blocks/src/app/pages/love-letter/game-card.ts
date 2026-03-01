import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';

import { cn } from '@semantic-components/ui';

@Component({
  selector: 'app-game-card',
  template: `
    <span class="text-xs font-semibold">{{ name() }}</span>
    <span class="text-primary text-2xl font-bold lg:text-3xl">
      {{ value() }}
    </span>
    <span class="text-muted-foreground text-center text-[9px] leading-tight">
      {{ description() }}
    </span>
  `,
  host: {
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameCard {
  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly class = computed(() =>
    cn(
      'flex h-24 w-18 flex-col items-center justify-between rounded-lg border-2 p-1.5 lg:h-36 lg:w-24 lg:p-2',
      this.classInput(),
    ),
  );

  readonly name = input.required<string>();
  readonly value = input.required<number>();
  readonly description = input('');
}
