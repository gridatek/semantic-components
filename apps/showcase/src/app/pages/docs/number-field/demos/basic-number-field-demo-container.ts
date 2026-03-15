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
import {
  ScLabel,
  ScNumberField,
  ScNumberFieldDecrement,
  ScNumberFieldIncrement,
  ScNumberFieldInput,
  ScNumberFieldInputGroup,
  ScNumberFieldScrubArea,
} from '@semantic-components/ui';
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
  template: \`
    <div class="space-y-4">
      <div scNumberField [(value)]="count" [min]="0" [max]="100">
        <div scNumberFieldScrubArea>
          <label scLabel>Count</label>
        </div>

        <div scNumberFieldGroup>
          <button scNumberFieldDecrement>
            <svg siMinusIcon></svg>
            <span class="sr-only">Decrease</span>
          </button>
          <input scNumberFieldInput aria-label="Count" />
          <button scNumberFieldIncrement>
            <svg siPlusIcon></svg>
            <span class="sr-only">Increase</span>
          </button>
        </div>
      </div>

      <p class="text-muted-foreground text-sm">
        Current value: {{ count() ?? 'null' }}
      </p>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicNumberFieldDemo {
  readonly count = signal<number | null>(10);
}`;
}
