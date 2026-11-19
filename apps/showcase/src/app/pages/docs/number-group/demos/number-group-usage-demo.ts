import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScField,
  ScLabel,
  ScNumberDecrement,
  ScNumberGroup,
  ScNumberIncrement,
  ScNumberInput,
  ScNumberScrubArea,
} from '@semantic-components/ui';
import { SiMinusIcon, SiPlusIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-number-group-usage-demo',
  imports: [
    ScLabel,
    ScField,
    ScNumberScrubArea,
    ScNumberGroup,
    ScNumberDecrement,
    ScNumberInput,
    ScNumberIncrement,
    SiMinusIcon,
    SiPlusIcon,
  ],
  template: `
    <div scField class="w-40">
      <div scNumberScrubArea [pixelSensitivity]="10">
        <label scLabel>Quantity</label>
      </div>
      <div scNumberGroup [(value)]="quantity" [min]="1" [max]="10">
        <button scNumberDecrement>
          <svg siMinusIcon></svg>
          <span class="sr-only">Decrease quantity</span>
        </button>
        <input scNumberInput />
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
export class NumberGroupUsageDemo {
  private readonly quantity = signal<number | null>(1);
}
