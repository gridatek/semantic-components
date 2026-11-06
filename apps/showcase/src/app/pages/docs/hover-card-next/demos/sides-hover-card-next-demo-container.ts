import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SidesHoverCardNextDemo } from './sides-hover-card-next-demo';

@Component({
  selector: 'app-sides-hover-card-next-demo-container',
  imports: [DemoContainer, SidesHoverCardNextDemo],
  template: `
    <app-demo-container
      title="Sides"
      demoUrl="/demos/hover-card-next/sides-hover-card-next-demo"
      [code]="code"
    >
      <app-sides-hover-card-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class SidesHoverCardNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScHoverCardNext,
  ScHoverCardNextPortal,
  ScHoverCardNextProvider,
  ScHoverCardNextTrigger,
} from '@semantic-components/ui';

/** side: bottom (default), top, left, right — it flips when there is no room. */
@Component({
  selector: 'app-sides-hover-card-next-demo',
  imports: [
    ScButton,
    ScHoverCardNext,
    ScHoverCardNextPortal,
    ScHoverCardNextProvider,
    ScHoverCardNextTrigger,
  ],
  template: \`
    <div class="flex flex-wrap justify-center gap-2">
      <div scHoverCardNextProvider side="left">
        <button
          scButton
          variant="outline"
          scHoverCardNextTrigger
          [delay]="100"
          [closeDelay]="100"
          class="capitalize"
        >
          left
        </button>
        <ng-template scHoverCardNextPortal>
          <div scHoverCardNext>
            <div class="flex flex-col gap-1">
              <h4 class="font-medium">Hover Card</h4>
              <p>This hover card appears on the left side of the trigger.</p>
            </div>
          </div>
        </ng-template>
      </div>
      <div scHoverCardNextProvider side="top">
        <button
          scButton
          variant="outline"
          scHoverCardNextTrigger
          [delay]="100"
          [closeDelay]="100"
          class="capitalize"
        >
          top
        </button>
        <ng-template scHoverCardNextPortal>
          <div scHoverCardNext>
            <div class="flex flex-col gap-1">
              <h4 class="font-medium">Hover Card</h4>
              <p>This hover card appears on the top side of the trigger.</p>
            </div>
          </div>
        </ng-template>
      </div>
      <div scHoverCardNextProvider side="bottom">
        <button
          scButton
          variant="outline"
          scHoverCardNextTrigger
          [delay]="100"
          [closeDelay]="100"
          class="capitalize"
        >
          bottom
        </button>
        <ng-template scHoverCardNextPortal>
          <div scHoverCardNext>
            <div class="flex flex-col gap-1">
              <h4 class="font-medium">Hover Card</h4>
              <p>This hover card appears on the bottom side of the trigger.</p>
            </div>
          </div>
        </ng-template>
      </div>
      <div scHoverCardNextProvider side="right">
        <button
          scButton
          variant="outline"
          scHoverCardNextTrigger
          [delay]="100"
          [closeDelay]="100"
          class="capitalize"
        >
          right
        </button>
        <ng-template scHoverCardNextPortal>
          <div scHoverCardNext>
            <div class="flex flex-col gap-1">
              <h4 class="font-medium">Hover Card</h4>
              <p>This hover card appears on the right side of the trigger.</p>
            </div>
          </div>
        </ng-template>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SidesHoverCardNextDemo {}`;
}
