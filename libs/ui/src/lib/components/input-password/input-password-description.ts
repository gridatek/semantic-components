import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';

import { cn } from '@semantic-components/utils';

@Component({
  selector: 'p[sc-input-password-description]',
  imports: [],
  template: `
    {{ strengthText() }}. Must contain:
  `,
  host: {
    '[id]': 'id()',
    '[class]': 'class()',
  },
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScInputPasswordDescription {
  readonly strengthScore = input<number>(0);
  readonly id = input<string>('password-description');

  readonly classInput = input<string>('', {
    alias: 'class',
  });

  protected readonly class = computed(() => cn('mb-2 text-sm font-medium', this.classInput()));

  readonly strengthText = computed(() => {
    const score = this.strengthScore();
    if (score === 0) return 'Enter a password';
    if (score <= 2) return 'Weak password';
    if (score <= 3) return 'Medium password';
    if (score === 4) return 'Good password';
    return 'Strong password';
  });
}
