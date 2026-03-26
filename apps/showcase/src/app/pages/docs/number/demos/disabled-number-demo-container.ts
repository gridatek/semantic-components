import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DisabledNumberDemo } from './disabled-number-demo';

@Component({
  selector: 'app-disabled-number-demo-container',
  imports: [DemoContainer, DisabledNumberDemo],
  template: `
    <app-demo-container
      title="Disabled"
      demoUrl="/demos/number/disabled-number-demo"
      [code]="code"
    >
      <app-disabled-number-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DisabledNumberDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScButtonGroup,
  ScLabel,
  ScNumber,
  ScNumberDecrement,
  ScNumberIncrement,
  ScNumberInput,
  ScNumberScrubArea,
} from '@semantic-components/ui';
import { SiMinusIcon, SiPlusIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-disabled-number-demo',
  imports: [
    ScNumber,
    ScNumberScrubArea,
    ScButtonGroup,
    ScNumberDecrement,
    ScNumberInput,
    ScNumberIncrement,
    ScLabel,
    SiMinusIcon,
    SiPlusIcon,
  ],
  template: \`
    <div scNumber [value]="42" [disabled]="true">
      <div scNumberScrubArea>
        <label scLabel>Locked Value</label>
      </div>

      <div scButtonGroup>
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
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledNumberDemo {}`;
}
