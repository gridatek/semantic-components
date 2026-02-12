import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicNumberFieldDemo } from './basic-number-field-demo';

@Component({
  selector: 'app-basic-number-field-demo-container',
  imports: [DemoContainer, BasicNumberFieldDemo],
  template: `
    <app-demo-container
      title="Basic"
      demoUrl="/demos/number-field/basic-number-field-demo"
      [code]="code"
    >
      <app-basic-number-field-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class BasicNumberFieldDemoContainer {
  readonly code = `import {
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
import { ScLabel } from '@semantic-components/ui-lab';

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
  ],
  template: \`
    <div sc-number-field [(value)]="count" [min]="0" [max]="100">
      <div sc-number-field-scrub-area>
        <label sc-label>Count</label>
      </div>

      <div sc-number-field-group>
        <button sc-number-field-decrement></button>
        <input sc-number-field-input />
        <button sc-number-field-increment></button>
      </div>
    </div>

    <p class="mt-4 text-sm text-muted-foreground">
      Current value: {{ count() ?? 'null' }}
    </p>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicNumberFieldDemo {
  readonly count = signal<number | null>(10);
}`;
}
