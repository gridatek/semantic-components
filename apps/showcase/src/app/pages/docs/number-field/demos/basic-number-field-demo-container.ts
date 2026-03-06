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
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class BasicNumberFieldDemoContainer {
  readonly code = `import {
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
    <div scNumberField [(value)]="count" [min]="0" [max]="100">
      <div scNumberFieldScrubArea>
        <label scLabel>Count</label>
      </div>

      <div scNumberFieldGroup>
        <button scNumberFieldDecrement></button>
        <input scNumberFieldInput aria-label="Count" />
        <button scNumberFieldIncrement></button>
      </div>
    </div>

    <p class="text-muted-foreground mt-4 text-sm">
      Current value: {{ count() ?? 'null' }}
    </p>
  \`,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicNumberFieldDemo {
  readonly count = signal<number | null>(10);
}`;
}
