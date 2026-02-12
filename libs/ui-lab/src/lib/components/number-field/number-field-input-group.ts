import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';
import { SC_NUMBER_FIELD } from './number-field';

@Component({
  selector: '[sc-number-field-group]',
  template: `
    <ng-content />
  `,
  host: {
    'data-slot': 'number-field-group',
    '[class]': 'class()',
    '[attr.data-disabled]': 'numberField.disabled() || null',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScNumberFieldInputGroup {
  readonly numberField = inject(SC_NUMBER_FIELD);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'inline-flex items-center rounded-md border border-input bg-background',
      'focus-within:ring-1 focus-within:ring-ring',
      'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',
      this.classInput(),
    ),
  );
}
