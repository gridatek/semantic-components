import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';

import { cn } from '@semantic-components/utils';

import { ScProgress } from '../progress';

@Component({
  selector: 'div[sc-input-password-strength]',
  imports: [ScProgress],
  template: `
    <sc-progress
      [class]="progressClass()"
      [value]="strengthScore()"
      max="5"
      aria-label="Password strength"
    />
    <ng-content />
  `,
  host: {
    '[class]': 'class()',
  },
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScInputPasswordStrength {
  readonly strengthScore = input<number>(0);

  readonly classInput = input<string>('', {
    alias: 'class',
  });

  protected readonly class = computed(() => cn('', this.classInput()));

  protected readonly progressClass = computed(() =>
    cn(
      'mb-4 mt-3 h-1 w-full overflow-hidden rounded-full bg-border',
      '*:data-[slot=indicator]:h-full *:data-[slot=indicator]:transition-all *:data-[slot=indicator]:duration-500 *:data-[slot=indicator]:ease-out',
      this.strengthColor(),
    ),
  );

  readonly strengthColor = computed(() => {
    const score = this.strengthScore();
    if (score === 0) return '*:data-[slot=indicator]:bg-border';
    if (score <= 1) return '*:data-[slot=indicator]:bg-red-500';
    if (score <= 2) return '*:data-[slot=indicator]:bg-orange-500';
    if (score === 3) return '*:data-[slot=indicator]:bg-amber-500';
    if (score === 4) return '*:data-[slot=indicator]:bg-blue-500';
    return '*:data-[slot=indicator]:bg-emerald-500';
  });
}
