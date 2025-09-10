import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';

import { cn } from '@semantic-components/utils';

// import { ScInputPasswordDescription } from './input-password-description';
// import { ScInputPasswordField } from './input-password-field';
// import { ScInputPasswordRequirements } from './input-password-requirements';
// import { ScInputPasswordStrength } from './input-password-strength';
// import { ScInputPasswordToggle } from './input-password-toggle';

@Component({
  selector: 'div[sc-input-password]',
  imports: [
    // ScInputPasswordField,
    // ScInputPasswordToggle,
    // ScInputPasswordStrength,
    // ScInputPasswordDescription,
    // ScInputPasswordRequirements,
  ],
  template: `
    <ng-content />
  `,
  host: {
    '[class]': 'class()',
  },
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScInputPassword {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn('space-y-2', this.classInput()));
}
