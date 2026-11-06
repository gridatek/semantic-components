import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { LogicalSidesHoverCardDemo } from './logical-sides-hover-card-demo';

@Component({
  selector: 'app-logical-sides-hover-card-demo-container',
  imports: [DemoContainer, LogicalSidesHoverCardDemo],
  template: `
    <app-demo-container
      title="Logical sides"
      demoUrl="/demos/hover-card/logical-sides-hover-card-demo"
      [code]="code"
    >
      <app-logical-sides-hover-card-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class LogicalSidesHoverCardDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScHoverCard,
  ScHoverCardPortal,
  ScHoverCardProvider,
  ScHoverCardTrigger,
} from '@semantic-components/ui';

/** side: inline-start, inline-end — the reading start and end, which swap in right to left. */
@Component({
  selector: 'app-logical-sides-hover-card-demo',
  imports: [
    ScButton,
    ScHoverCard,
    ScHoverCardPortal,
    ScHoverCardProvider,
    ScHoverCardTrigger,
  ],
  template: \`
    <div class="flex flex-wrap justify-center gap-2">
      <div scHoverCardProvider side="inline-start">
        <button
          scButton
          variant="outline"
          scHoverCardTrigger
          [delay]="100"
          [closeDelay]="100"
        >
          inline-start
        </button>
        <ng-template scHoverCardPortal>
          <div scHoverCard>
            <div class="flex flex-col gap-1">
              <h4 class="font-medium">Hover Card</h4>
              <p>
                This hover card appears on the inline-start side of the trigger.
              </p>
            </div>
          </div>
        </ng-template>
      </div>
      <div scHoverCardProvider side="inline-end">
        <button
          scButton
          variant="outline"
          scHoverCardTrigger
          [delay]="100"
          [closeDelay]="100"
        >
          inline-end
        </button>
        <ng-template scHoverCardPortal>
          <div scHoverCard>
            <div class="flex flex-col gap-1">
              <h4 class="font-medium">Hover Card</h4>
              <p>
                This hover card appears on the inline-end side of the trigger.
              </p>
            </div>
          </div>
        </ng-template>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class LogicalSidesHoverCardDemo {}`;
}
