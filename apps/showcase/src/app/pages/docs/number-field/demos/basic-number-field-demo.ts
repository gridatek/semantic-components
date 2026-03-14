import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
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
  selector: 'app-basic-number-field-demo',
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
    <div scNumberField [(value)]="count" [min]="0" [max]="100">
      <div scNumberFieldScrubArea>
        <label scLabel>Count</label>
      </div>

      <div scNumberFieldGroup>
        <button scNumberFieldDecrement><svg siMinusIcon></svg></button>
        <input scNumberFieldInput aria-label="Count" />
        <button scNumberFieldIncrement><svg siPlusIcon></svg></button>
      </div>
    </div>

    <p class="text-muted-foreground mt-4 text-sm">
      Current value: {{ count() ?? 'null' }}
    </p>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicNumberFieldDemo {
  readonly count = signal<number | null>(10);
}
