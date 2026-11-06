import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SidesTooltipNextDemo } from './sides-tooltip-next-demo';

@Component({
  selector: 'app-sides-tooltip-next-demo-container',
  imports: [DemoContainer, SidesTooltipNextDemo],
  template: `
    <app-demo-container
      title="Sides"
      demoUrl="/demos/tooltip-next/sides-tooltip-next-demo"
      [code]="code"
    >
      <app-sides-tooltip-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class SidesTooltipNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScTooltipNext,
  ScTooltipNextArrow,
  ScTooltipNextPortal,
  ScTooltipNextProvider,
  ScTooltipNextTrigger,
} from '@semantic-components/ui';

/** side: top (default), bottom, left, right — or inline-start, inline-end, which follow the direction. It flips when there is no room. */
@Component({
  selector: 'app-sides-tooltip-next-demo',
  imports: [
    ScButton,
    ScTooltipNext,
    ScTooltipNextArrow,
    ScTooltipNextPortal,
    ScTooltipNextProvider,
    ScTooltipNextTrigger,
  ],
  template: \`
    <div class="flex flex-wrap gap-2">
      <div scTooltipNextProvider side="left">
        <button
          scButton
          scTooltipNextTrigger
          variant="outline"
          class="capitalize"
        >
          left
        </button>
        <ng-template scTooltipNextPortal>
          <div scTooltipNext>
            Add to library
            <span scTooltipNextArrow></span>
          </div>
        </ng-template>
      </div>
      <div scTooltipNextProvider side="top">
        <button
          scButton
          scTooltipNextTrigger
          variant="outline"
          class="capitalize"
        >
          top
        </button>
        <ng-template scTooltipNextPortal>
          <div scTooltipNext>
            Add to library
            <span scTooltipNextArrow></span>
          </div>
        </ng-template>
      </div>
      <div scTooltipNextProvider side="bottom">
        <button
          scButton
          scTooltipNextTrigger
          variant="outline"
          class="capitalize"
        >
          bottom
        </button>
        <ng-template scTooltipNextPortal>
          <div scTooltipNext>
            Add to library
            <span scTooltipNextArrow></span>
          </div>
        </ng-template>
      </div>
      <div scTooltipNextProvider side="right">
        <button
          scButton
          scTooltipNextTrigger
          variant="outline"
          class="capitalize"
        >
          right
        </button>
        <ng-template scTooltipNextPortal>
          <div scTooltipNext>
            Add to library
            <span scTooltipNextArrow></span>
          </div>
        </ng-template>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SidesTooltipNextDemo {}`;
}
