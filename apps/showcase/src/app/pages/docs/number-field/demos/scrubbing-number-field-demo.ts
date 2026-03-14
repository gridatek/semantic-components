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
  selector: 'app-scrubbing-number-field-demo',
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
    <div class="space-y-6">
      <div
        scNumberField
        [(value)]="opacity"
        [min]="0"
        [max]="100"
        [scrubSpeed]="0.5"
      >
        <div scNumberFieldScrubArea>
          <label scLabel>Opacity (%)</label>
        </div>

        <div scNumberFieldGroup>
          <button scNumberFieldDecrement><svg siMinusIcon></svg></button>
          <input scNumberFieldInput aria-label="Opacity" />
          <button scNumberFieldIncrement><svg siPlusIcon></svg></button>
        </div>
      </div>

      <div scNumberField [(value)]="rotation" [min]="0" [max]="360">
        <div scNumberFieldScrubArea>
          <label scLabel>Rotation (deg)</label>
        </div>

        <div scNumberFieldGroup>
          <button scNumberFieldDecrement><svg siMinusIcon></svg></button>
          <input scNumberFieldInput aria-label="Rotation" />
          <button scNumberFieldIncrement><svg siPlusIcon></svg></button>
        </div>
      </div>
    </div>

    <p class="text-muted-foreground mt-4 text-sm">
      💡 Tip: Click and drag on the label to scrub values
    </p>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrubbingNumberFieldDemo {
  readonly opacity = signal<number | null>(50);
  readonly rotation = signal<number | null>(0);
}
