import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import {
  ScNumberField,
  ScNumberFieldDecrement,
  ScNumberFieldIncrement,
  ScNumberFieldInput,
  ScNumberFieldInputGroup,
} from '@semantic-components/ui';
import { SiMinusIcon, SiPlusIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-without-label-number-field-demo',
  imports: [
    ScNumberField,
    ScNumberFieldInputGroup,
    ScNumberFieldDecrement,
    ScNumberFieldInput,
    ScNumberFieldIncrement,
    SiMinusIcon,
    SiPlusIcon,
  ],
  template: `
    <div class="flex items-center gap-4">
      <span class="text-sm font-medium">Quantity:</span>
      <div scNumberField [(value)]="quantity" [min]="1" [max]="10" class="w-28">
        <div scNumberFieldGroup>
          <button scNumberFieldDecrement>
            <svg siMinusIcon></svg>
            <span class="sr-only">Decrease</span>
          </button>
          <input scNumberFieldInput aria-label="Quantity" />
          <button scNumberFieldIncrement>
            <svg siPlusIcon></svg>
            <span class="sr-only">Increase</span>
          </button>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WithoutLabelNumberFieldDemo {
  readonly quantity = signal<number | null>(1);
}
