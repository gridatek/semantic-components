import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DisabledNumberFieldDemo } from './disabled-number-field-demo';

@Component({
  selector: 'app-disabled-number-field-demo-container',
  imports: [DemoContainer, DisabledNumberFieldDemo],
  template: `
    <app-demo-container
      title="Disabled"
      demoUrl="/demos/number-field/disabled-number-field-demo"
      [code]="code"
    >
      <app-disabled-number-field-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DisabledNumberFieldDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
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
import { ScLabel } from '@semantic-components/ui-lab';

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
  ],
  template: \`
    <div sc-number-field [value]="42" [disabled]="true">
      <div sc-number-field-scrub-area>
        <label sc-label>Locked Value</label>
      </div>

      <div sc-number-field-group>
        <button sc-number-field-decrement></button>
        <input sc-number-field-input />
        <button sc-number-field-increment></button>
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledNumberFieldDemo {}`;
}
