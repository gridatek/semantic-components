import { Component, ViewEncapsulation } from '@angular/core';
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

/** Disabled: nothing changes it. Read-only: focusable and readable, not changed. */
@Component({
  selector: 'app-disabled-number-group-demo',
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
    <div class="flex flex-wrap gap-6">
      <div scField class="w-40">
        <div scNumberScrubArea>
          <label scLabel>Disabled</label>
        </div>
        <div scNumberGroup [value]="42" [disabled]="true">
          <button scNumberDecrement>
            <svg siMinusIcon></svg>
            <span class="sr-only">Decrease value</span>
          </button>
          <input scNumberInput />
          <button scNumberIncrement>
            <svg siPlusIcon></svg>
            <span class="sr-only">Increase value</span>
          </button>
        </div>
      </div>
      <div scField class="w-40">
        <div scNumberScrubArea>
          <label scLabel>Read-only</label>
        </div>
        <div scNumberGroup [value]="42" [readonly]="true">
          <button scNumberDecrement>
            <svg siMinusIcon></svg>
            <span class="sr-only">Decrease value</span>
          </button>
          <input scNumberInput />
          <button scNumberIncrement>
            <svg siPlusIcon></svg>
            <span class="sr-only">Increase value</span>
          </button>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledNumberGroupDemo {}
