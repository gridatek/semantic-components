import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScNumberField,
  ScNumberFieldDecrement,
  ScNumberFieldInputGroup,
  ScNumberFieldIncrement,
  ScNumberFieldInput,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-without-label-number-field-demo',
  imports: [
    ScNumberField,
    ScNumberFieldInputGroup,
    ScNumberFieldDecrement,
    ScNumberFieldInput,
    ScNumberFieldIncrement,
  ],
  template: `
    <div class="flex items-center gap-4">
      <span class="text-sm font-medium">Quantity:</span>
      <div
        sc-number-field
        [(value)]="quantity"
        [min]="1"
        [max]="10"
        class="w-28"
      >
        <div sc-number-field-group>
          <button sc-number-field-decrement></button>
          <input sc-number-field-input />
          <button sc-number-field-increment></button>
        </div>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WithoutLabelNumberFieldDemo {
  readonly quantity = signal<number | null>(1);
}
