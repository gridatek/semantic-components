import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScLabel } from '@semantic-components/ui';
import {
  ScNumberField,
  ScNumberFieldDecrement,
  ScNumberFieldIncrement,
  ScNumberFieldInput,
  ScNumberFieldInputGroup,
  ScNumberFieldScrubArea,
} from '@semantic-components/ui-lab';
import { SiMinusIcon, SiPlusIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-disabled-number-field-demo',
  imports: [
    ScNumberField,
    ScNumberFieldScrubArea,
    ScNumberFieldInputGroup,
    ScNumberFieldDecrement,
    ScNumberFieldInput,
    ScNumberFieldIncrement,
    ScLabel,
    SiMinusIcon,
    SiPlusIcon,
  ],
  template: `
    <div scNumberField [value]="42" [disabled]="true">
      <div scNumberFieldScrubArea>
        <label scLabel>Locked Value</label>
      </div>

      <div scNumberFieldGroup>
        <button scNumberFieldDecrement>
          <svg siMinusIcon></svg>
          <span class="sr-only">Decrease</span>
        </button>
        <input scNumberFieldInput aria-label="Locked Value" />
        <button scNumberFieldIncrement>
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
export class DisabledNumberFieldDemo {}
