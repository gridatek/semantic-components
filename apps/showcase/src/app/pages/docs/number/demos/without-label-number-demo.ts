import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import {
  ScButtonGroup,
  ScNumber,
  ScNumberDecrement,
  ScNumberIncrement,
  ScNumberInput,
} from '@semantic-components/ui';
import { SiMinusIcon, SiPlusIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-without-label-number-demo',
  imports: [
    ScNumber,
    ScButtonGroup,
    ScNumberDecrement,
    ScNumberInput,
    ScNumberIncrement,
    SiMinusIcon,
    SiPlusIcon,
  ],
  template: `
    <div class="flex items-center gap-4">
      <span class="text-sm font-medium">Quantity:</span>
      <div scNumber [(value)]="quantity" [min]="1" [max]="10" class="w-28">
        <div scButtonGroup>
          <button scNumberDecrement>
            <svg siMinusIcon></svg>
            <span class="sr-only">Decrease</span>
          </button>
          <input scNumberInput aria-label="Quantity" />
          <button scNumberIncrement>
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
export class WithoutLabelNumberDemo {
  readonly quantity = signal<number | null>(1);
}
