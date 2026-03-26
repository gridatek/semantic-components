import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicNumberDemo } from './basic-number-demo';

@Component({
  selector: 'app-basic-number-demo-container',
  imports: [DemoContainer, BasicNumberDemo],
  template: `
    <app-demo-container
      title="Basic"
      demoUrl="/demos/number/basic-number-demo"
      [code]="code"
    >
      <app-basic-number-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class BasicNumberDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
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
  selector: 'app-basic-number-demo',
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
    <div class="space-y-4">
      <div scNumber [(value)]="count" [min]="0" [max]="100">
        <div scNumberScrubArea>
          <label scLabel>Count</label>
        </div>

        <div scButtonGroup>
          <button scNumberDecrement>
            <svg siMinusIcon></svg>
            <span class="sr-only">Decrease</span>
          </button>
          <input scNumberInput aria-label="Count" />
          <button scNumberIncrement>
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
export class BasicNumberDemo {
  readonly count = signal<number | null>(10);
}`;
}
