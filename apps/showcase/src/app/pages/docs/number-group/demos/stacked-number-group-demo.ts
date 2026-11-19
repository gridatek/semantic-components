import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScField,
  ScLabel,
  ScNumberDecrement,
  ScNumberGroup,
  ScNumberIncrement,
  ScNumberInput,
} from '@semantic-components/ui';
import {
  SiChevronDownIcon,
  SiChevronUpIcon,
} from '@semantic-icons/lucide-icons';

/** The group's `stacked` variant: the input, then increment over decrement. */
@Component({
  selector: 'app-stacked-number-group-demo',
  imports: [
    ScLabel,
    ScField,
    ScNumberGroup,
    ScNumberDecrement,
    ScNumberInput,
    ScNumberIncrement,
    SiChevronDownIcon,
    SiChevronUpIcon,
  ],
  template: `
    <div scField class="w-64">
      <label scLabel>Enter quantity</label>
      <div scNumberGroup [(value)]="quantity" [min]="0" variant="stacked">
        <input scNumberInput />
        <button scNumberIncrement>
          <svg siChevronUpIcon></svg>
          <span class="sr-only">Increase quantity</span>
        </button>
        <button scNumberDecrement>
          <svg siChevronDownIcon></svg>
          <span class="sr-only">Decrease quantity</span>
        </button>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class StackedNumberGroupDemo {
  private readonly quantity = signal<number | null>(123);
}
