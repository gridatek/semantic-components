import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScNumberField,
  ScNumberFieldDecrement,
  ScNumberFieldInputGroup,
  ScNumberFieldIncrement,
  ScNumberFieldInput,
  ScNumberFieldScrubArea,
} from '@semantic-components/ui-lab';
import { ScLabel } from '@semantic-components/ui';

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
          <button scNumberFieldDecrement></button>
          <input scNumberFieldInput />
          <button scNumberFieldIncrement></button>
        </div>
      </div>

      <div scNumberField [(value)]="rotation" [min]="0" [max]="360">
        <div scNumberFieldScrubArea>
          <label scLabel>Rotation (deg)</label>
        </div>

        <div scNumberFieldGroup>
          <button scNumberFieldDecrement></button>
          <input scNumberFieldInput />
          <button scNumberFieldIncrement></button>
        </div>
      </div>
    </div>

    <p class="mt-4 text-sm text-muted-foreground">
      💡 Tip: Click and drag on the label to scrub values
    </p>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrubbingNumberFieldDemo {
  readonly opacity = signal<number | null>(50);
  readonly rotation = signal<number | null>(0);
}
