import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ControlledTooltipNextDemo } from './controlled-tooltip-next-demo';

@Component({
  selector: 'app-controlled-tooltip-next-demo-container',
  imports: [DemoContainer, ControlledTooltipNextDemo],
  template: `
    <app-demo-container
      title="Controlled"
      demoUrl="/demos/tooltip-next/controlled-tooltip-next-demo"
      [code]="code"
    >
      <app-controlled-tooltip-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ControlledTooltipNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScButton,
  ScTooltipNext,
  ScTooltipNextArrow,
  ScTooltipNextPortal,
  ScTooltipNextProvider,
  ScTooltipNextTrigger,
} from '@semantic-components/ui';

/** [(open)]: the tooltip opened and closed by the page too. */
@Component({
  selector: 'app-controlled-tooltip-next-demo',
  imports: [
    ScButton,
    ScTooltipNext,
    ScTooltipNextArrow,
    ScTooltipNextPortal,
    ScTooltipNextProvider,
    ScTooltipNextTrigger,
  ],
  template: \`
    <div class="flex items-center gap-4">
      <div scTooltipNextProvider [(open)]="open">
        <button scButton scTooltipNextTrigger variant="outline">Trigger</button>
        <ng-template scTooltipNextPortal>
          <div scTooltipNext>
            Opened from outside
            <span scTooltipNextArrow></span>
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
export class ControlledTooltipNextDemo {
  protected readonly open = signal(false);
}`;
}
