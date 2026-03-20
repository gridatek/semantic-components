import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '../../utils';
import { SC_PASSWORD } from './password';

@Directive({
  selector: '[scPasswordInputGroup]',
  host: {
    'data-slot': 'password-input-group',
    '[class]': 'class()',
    '[attr.data-disabled]': 'password.disabled() || null',
  },
})
export class ScPasswordInputGroup {
  readonly password = inject(SC_PASSWORD);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('relative', 'data-disabled:opacity-50', this.classInput()),
  );
}
