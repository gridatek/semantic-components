import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScField,
  ScNumberDecrement,
  ScNumberGroup,
  ScNumberIncrement,
  ScNumberInput,
} from '@semantic-components/ui';
import { SiMinusIcon, SiPlusIcon } from '@semantic-icons/lucide-icons';

/** No visible label, no scrub area: the group alone, named by `aria-label`. */
@Component({
  selector: 'app-without-label-number-group-demo',
  imports: [
    ScField,
    ScNumberGroup,
    ScNumberDecrement,
    ScNumberInput,
    ScNumberIncrement,
    SiMinusIcon,
    SiPlusIcon,
  ],
  template: `
    <div scField class="w-36">
      <div scNumberGroup [(value)]="quantity" [min]="1" [max]="10">
        <button scNumberDecrement>
          <svg siMinusIcon></svg>
          <span class="sr-only">Decrease quantity</span>
        </button>
        <input scNumberInput aria-label="Quantity" />
        <button scNumberIncrement>
          <svg siPlusIcon></svg>
          <span class="sr-only">Increase quantity</span>
        </button>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class WithoutLabelNumberGroupDemo {
  private readonly quantity = signal<number | null>(1);
}
