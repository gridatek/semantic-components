import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';
import { SC_PASSWORD_FIELD } from './password-field';

@Component({
  selector: '[sc-password-field-input-group]',
  template: `
    <ng-content />
  `,
  host: {
    'data-slot': 'password-field-input-group',
    '[class]': 'class()',
    '[attr.data-disabled]': 'passwordField.disabled() || null',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScPasswordFieldInputGroup {
  readonly passwordField = inject(SC_PASSWORD_FIELD);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('relative', 'data-[disabled]:opacity-50', this.classInput()),
  );
}
