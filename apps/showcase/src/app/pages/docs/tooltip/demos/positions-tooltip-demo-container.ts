import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { PositionsTooltipDemo } from './positions-tooltip-demo';

@Component({
  selector: 'app-positions-tooltip-demo-container',
  imports: [DemoContainer, PositionsTooltipDemo],
  template: `
    <app-demo-container
      title="Positions"
      demoUrl="/demos/tooltip/positions-tooltip-demo"
      [code]="code"
    >
      <app-positions-tooltip-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PositionsTooltipDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScButton, ScTooltipTrigger } from '@semantic-components/ui';

@Component({
  selector: 'app-positions-tooltip-demo',
  imports: [ScButton, ScTooltipTrigger],
  template: \`
    <div class="flex flex-wrap items-center gap-4">
      <button
        scButton
        variant="outline"
        scTooltipTrigger="Tooltip on top"
        tooltipPosition="top"
      >
        Top
      </button>
      <button
        scButton
        variant="outline"
        scTooltipTrigger="Tooltip on right"
        tooltipPosition="right"
      >
        Right
      </button>
      <button
        scButton
        variant="outline"
        scTooltipTrigger="Tooltip on bottom"
        tooltipPosition="bottom"
      >
        Bottom
      </button>
      <button
        scButton
        variant="outline"
        scTooltipTrigger="Tooltip on left"
        tooltipPosition="left"
      >
        Left
      </button>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PositionsTooltipDemo {}`;
}
