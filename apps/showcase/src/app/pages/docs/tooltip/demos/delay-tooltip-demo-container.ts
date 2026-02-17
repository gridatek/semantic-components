import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DelayTooltipDemo } from './delay-tooltip-demo';

@Component({
  selector: 'app-delay-tooltip-demo-container',
  imports: [DemoContainer, DelayTooltipDemo],
  template: `
    <app-demo-container
      title="Delay"
      demoUrl="/demos/tooltip/delay-tooltip-demo"
      [code]="code"
    >
      <app-delay-tooltip-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DelayTooltipDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScButton, ScTooltipTrigger } from '@semantic-components/ui';

@Component({
  selector: 'app-delay-tooltip-demo',
  imports: [ScButton, ScTooltipTrigger],
  template: \`
    <div class="flex flex-wrap items-center gap-4">
      <button
        scButton
        variant="outline"
        scTooltipTrigger="Instant tooltip (no delay)"
        [tooltipDelay]="0"
      >
        No delay
      </button>
      <button
        scButton
        variant="outline"
        scTooltipTrigger="Default delay (200ms)"
      >
        Default (200ms)
      </button>
      <button
        scButton
        variant="outline"
        scTooltipTrigger="Slow tooltip (500ms)"
        [tooltipDelay]="500"
      >
        Slow (500ms)
      </button>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DelayTooltipDemo {}`;
}
