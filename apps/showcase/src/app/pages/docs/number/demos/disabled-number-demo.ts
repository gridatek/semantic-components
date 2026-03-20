import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScLabel,
  ScNumber,
  ScNumberDecrement,
  ScNumberIncrement,
  ScNumberInput,
  ScNumberInputGroup,
  ScNumberScrubArea,
} from '@semantic-components/ui';
import { SiMinusIcon, SiPlusIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-disabled-number-demo',
  imports: [
    ScNumber,
    ScNumberScrubArea,
    ScNumberInputGroup,
    ScNumberDecrement,
    ScNumberInput,
    ScNumberIncrement,
    ScLabel,
    SiMinusIcon,
    SiPlusIcon,
  ],
  template: `
    <div scNumber [value]="42" [disabled]="true">
      <div scNumberScrubArea>
        <label scLabel>Locked Value</label>
      </div>

      <div scNumberGroup>
        <button scNumberDecrement>
          <svg siMinusIcon></svg>
          <span class="sr-only">Decrease</span>
        </button>
        <input scNumberInput aria-label="Locked Value" />
        <button scNumberIncrement>
          <svg siPlusIcon></svg>
          <span class="sr-only">Increase</span>
        </button>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledNumberDemo {}
