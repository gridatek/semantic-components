import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScField,
  ScLabel,
  ScNumberField,
  ScNumberFieldDecrement,
  ScNumberFieldGroup,
  ScNumberFieldIncrement,
  ScNumberFieldInput,
  ScNumberFieldScrubArea,
  ScNumberFieldScrubAreaCursor,
} from '@semantic-components/ui';
import {
  SiMinusIcon,
  SiMoveHorizontalIcon,
  SiMoveVerticalIcon,
  SiPlusIcon,
} from '@semantic-icons/lucide-icons';

/** Drag a label: the pointer is locked and the cursor part follows; Shift for big steps, Alt for small ones. */
@Component({
  selector: 'app-scrubbing-number-field-demo',
  imports: [
    ScField,
    ScLabel,
    ScNumberField,
    ScNumberFieldScrubArea,
    ScNumberFieldGroup,
    ScNumberFieldDecrement,
    ScNumberFieldInput,
    ScNumberFieldIncrement,
    ScNumberFieldScrubAreaCursor,
    SiMinusIcon,
    SiPlusIcon,
    SiMoveHorizontalIcon,
    SiMoveVerticalIcon,
  ],
  template: `
    <div class="w-48 space-y-6">
      <div
        scField
        scNumberField
        [(value)]="opacity"
        [min]="0"
        [max]="1"
        [step]="0.01"
        [smallStep]="0.001"
        [largeStep]="0.1"
        [format]="{ style: 'percent', maximumFractionDigits: 1 }"
      >
        <div scNumberFieldScrubArea>
          <label scLabel>Opacity</label>
          <span scNumberFieldScrubAreaCursor
            ><svg siMoveHorizontalIcon></svg
          ></span>
        </div>
        <div scNumberFieldGroup>
          <button scNumberFieldDecrement>
            <svg siMinusIcon></svg>
            <span class="sr-only">Decrease opacity</span>
          </button>
          <input scNumberFieldInput />
          <button scNumberFieldIncrement>
            <svg siPlusIcon></svg>
            <span class="sr-only">Increase opacity</span>
          </button>
        </div>
      </div>

      <div
        scField
        scNumberField
        [(value)]="rotation"
        [min]="-180"
        [max]="180"
        [format]="{ style: 'unit', unit: 'degree' }"
      >
        <div scNumberFieldScrubArea direction="vertical" [pixelSensitivity]="4">
          <label scLabel>Rotation (drag up or down)</label>
          <span scNumberFieldScrubAreaCursor
            ><svg siMoveVerticalIcon></svg
          ></span>
        </div>
        <div scNumberFieldGroup>
          <button scNumberFieldDecrement>
            <svg siMinusIcon></svg>
            <span class="sr-only">Decrease rotation</span>
          </button>
          <input scNumberFieldInput />
          <button scNumberFieldIncrement>
            <svg siPlusIcon></svg>
            <span class="sr-only">Increase rotation</span>
          </button>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ScrubbingNumberFieldDemo {
  readonly opacity = signal<number | null>(0.5);
  readonly rotation = signal<number | null>(0);
}
