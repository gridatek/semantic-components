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
import { ScTooltipTrigger } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-positions-tooltip-demo',
  imports: [ScTooltipTrigger],
  template: \`
    <div class="flex flex-wrap items-center gap-4">
      <button
        scTooltipTrigger="Tooltip on top"
        tooltipPosition="top"
        class="inline-flex h-9 cursor-pointer items-center justify-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        Top
      </button>
      <button
        scTooltipTrigger="Tooltip on right"
        tooltipPosition="right"
        class="inline-flex h-9 cursor-pointer items-center justify-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        Right
      </button>
      <button
        scTooltipTrigger="Tooltip on bottom"
        tooltipPosition="bottom"
        class="inline-flex h-9 cursor-pointer items-center justify-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        Bottom
      </button>
      <button
        scTooltipTrigger="Tooltip on left"
        tooltipPosition="left"
        class="inline-flex h-9 cursor-pointer items-center justify-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
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
