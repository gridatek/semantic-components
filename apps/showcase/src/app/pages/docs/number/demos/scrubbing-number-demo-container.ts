import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ScrubbingNumberDemo } from './scrubbing-number-demo';

@Component({
  selector: 'app-scrubbing-number-demo-container',
  imports: [DemoContainer, ScrubbingNumberDemo],
  template: `
    <app-demo-container
      title="Scrubbing"
      demoUrl="/demos/number/scrubbing-number-demo"
      [code]="code"
    >
      <app-scrubbing-number-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export default class ScrubbingNumberDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScField,
  ScLabel,
  ScNumber,
  ScNumberDecrement,
  ScNumberGroup,
  ScNumberIncrement,
  ScNumberInput,
  ScNumberScrubArea,
  ScNumberScrubAreaCursor,
} from '@semantic-components/ui';
import {
  SiMinusIcon,
  SiMoveHorizontalIcon,
  SiMoveVerticalIcon,
  SiPlusIcon,
} from '@semantic-icons/lucide-icons';

/** Drag a label: the pointer is locked and the cursor part follows; Shift for big steps, Alt for small ones. */
@Component({
  selector: 'app-scrubbing-number-demo',
  imports: [
    ScField,
    ScLabel,
    ScNumber,
    ScNumberScrubArea,
    ScNumberGroup,
    ScNumberDecrement,
    ScNumberInput,
    ScNumberIncrement,
    ScNumberScrubAreaCursor,
    SiMinusIcon,
    SiPlusIcon,
    SiMoveHorizontalIcon,
    SiMoveVerticalIcon,
  ],
  template: \`
    <div class="w-48 space-y-6">
      <div
        scField
        scNumber
        [(value)]="opacity"
        [min]="0"
        [max]="1"
        [step]="0.01"
        [smallStep]="0.001"
        [largeStep]="0.1"
        [format]="{ style: 'percent', maximumFractionDigits: 1 }"
      >
        <div scNumberScrubArea>
          <label scLabel>Opacity</label>
          <span scNumberScrubAreaCursor><svg siMoveHorizontalIcon></svg></span>
        </div>
        <div scNumberGroup>
          <button scNumberDecrement>
            <svg siMinusIcon></svg>
            <span class="sr-only">Decrease opacity</span>
          </button>
          <input scNumberInput />
          <button scNumberIncrement>
            <svg siPlusIcon></svg>
            <span class="sr-only">Increase opacity</span>
          </button>
        </div>
      </div>

      <div
        scField
        scNumber
        [(value)]="rotation"
        [min]="-180"
        [max]="180"
        [format]="{ style: 'unit', unit: 'degree' }"
      >
        <div scNumberScrubArea direction="vertical" [pixelSensitivity]="4">
          <label scLabel>Rotation (drag up or down)</label>
          <span scNumberScrubAreaCursor><svg siMoveVerticalIcon></svg></span>
        </div>
        <div scNumberGroup>
          <button scNumberDecrement>
            <svg siMinusIcon></svg>
            <span class="sr-only">Decrease rotation</span>
          </button>
          <input scNumberInput />
          <button scNumberIncrement>
            <svg siPlusIcon></svg>
            <span class="sr-only">Increase rotation</span>
          </button>
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ScrubbingNumberDemo {
  readonly opacity = signal<number | null>(0.5);
  readonly rotation = signal<number | null>(0);
}`;
}
