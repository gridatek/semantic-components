import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { StepsNumberFieldDemo } from './steps-number-field-demo';

@Component({
  selector: 'app-steps-number-field-demo-container',
  imports: [DemoContainer, StepsNumberFieldDemo],
  template: `
    <app-demo-container
      title="Steps, snapping and the wheel"
      demoUrl="/demos/number-field/steps-number-field-demo"
      [code]="code"
    >
      <app-steps-number-field-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export default class StepsNumberFieldDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScField,
  ScLabel,
  ScNumberField,
  ScNumberFieldDecrement,
  ScNumberFieldGroup,
  ScNumberFieldIncrement,
  ScNumberFieldInput,
  ScNumberFieldScrubArea,
} from '@semantic-components/ui';
import { SiMinusIcon, SiPlusIcon } from '@semantic-icons/lucide-icons';

/** Steps of 5 (Alt: 1, Shift or Page Up / Down: 50), snapped to multiples of 5; Home / End for the bounds; the wheel steps it while focused. */
@Component({
  selector: 'app-steps-number-field-demo',
  imports: [
    ScField,
    ScLabel,
    ScNumberField,
    ScNumberFieldScrubArea,
    ScNumberFieldGroup,
    ScNumberFieldDecrement,
    ScNumberFieldInput,
    ScNumberFieldIncrement,
    SiMinusIcon,
    SiPlusIcon,
  ],
  template: \`
    <div class="w-48 space-y-4">
      <div
        scField
        scNumberField
        [(value)]="width"
        [min]="0"
        [max]="1000"
        [step]="5"
        [smallStep]="1"
        [largeStep]="50"
        snapOnStep
        allowWheelScrub
      >
        <div scNumberFieldScrubArea>
          <label scLabel>Width (px)</label>
        </div>
        <div scNumberFieldGroup>
          <button scNumberFieldDecrement>
            <svg siMinusIcon></svg>
            <span class="sr-only">Decrease width</span>
          </button>
          <input scNumberFieldInput />
          <button scNumberFieldIncrement>
            <svg siPlusIcon></svg>
            <span class="sr-only">Increase width</span>
          </button>
        </div>
      </div>
      <p class="text-muted-foreground text-sm">
        Type 12, then press ↑: it snaps to 15.
      </p>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class StepsNumberFieldDemo {
  readonly width = signal<number | null>(120);
}`;
}
