import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ControlledTooltipDemo } from './controlled-tooltip-demo';

@Component({
  selector: 'app-controlled-tooltip-demo-container',
  imports: [DemoContainer, ControlledTooltipDemo],
  template: `
    <app-demo-container
      title="Controlled"
      demoUrl="/demos/tooltip/controlled-tooltip-demo"
      [code]="code"
    >
      <app-controlled-tooltip-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ControlledTooltipDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScButton,
  ScTooltip,
  ScTooltipArrow,
  ScTooltipPortal,
  ScTooltipProvider,
  ScTooltipTrigger,
} from '@semantic-components/ui';

/** [(open)]: the tooltip opened and closed by the page too. */
@Component({
  selector: 'app-controlled-tooltip-demo',
  imports: [
    ScButton,
    ScTooltip,
    ScTooltipArrow,
    ScTooltipPortal,
    ScTooltipProvider,
    ScTooltipTrigger,
  ],
  template: \`
    <div class="flex items-center gap-4">
      <div scTooltipProvider [(open)]="open">
        <button scButton scTooltipTrigger variant="outline">Trigger</button>
        <ng-template scTooltipPortal>
          <div scTooltip>
            Opened from outside
            <span scTooltipArrow></span>
          </div>
        </ng-template>
      </div>
      <button scButton variant="ghost" (click)="open.set(!open())">
        {{ open() ? 'Hide' : 'Show' }} the tooltip
      </button>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ControlledTooltipDemo {
  protected readonly open = signal(false);
}`;
}
