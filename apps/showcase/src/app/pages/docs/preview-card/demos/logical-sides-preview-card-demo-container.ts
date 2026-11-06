import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { LogicalSidesPreviewCardDemo } from './logical-sides-preview-card-demo';

@Component({
  selector: 'app-logical-sides-preview-card-demo-container',
  imports: [DemoContainer, LogicalSidesPreviewCardDemo],
  template: `
    <app-demo-container
      title="Logical sides"
      demoUrl="/demos/preview-card/logical-sides-preview-card-demo"
      [code]="code"
    >
      <app-logical-sides-preview-card-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class LogicalSidesPreviewCardDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScPreviewCard,
  ScPreviewCardPortal,
  ScPreviewCardProvider,
  ScPreviewCardTrigger,
} from '@semantic-components/ui';

/** side: inline-start, inline-end — the reading start and end, which swap in right to left. */
@Component({
  selector: 'app-logical-sides-preview-card-demo',
  imports: [
    ScButton,
    ScPreviewCard,
    ScPreviewCardPortal,
    ScPreviewCardProvider,
    ScPreviewCardTrigger,
  ],
  template: \`
    <div class="flex flex-wrap justify-center gap-2">
      <div scPreviewCardProvider side="inline-start">
        <button
          scButton
          variant="outline"
          scPreviewCardTrigger
          [delay]="100"
          [closeDelay]="100"
        >
          inline-start
        </button>
        <ng-template scPreviewCardPortal>
          <div scPreviewCard>
            <div class="flex flex-col gap-1">
              <h4 class="font-medium">Preview Card</h4>
              <p>
                This preview card appears on the inline-start side of the
                trigger.
              </p>
            </div>
          </div>
        </ng-template>
      </div>
      <div scPreviewCardProvider side="inline-end">
        <button
          scButton
          variant="outline"
          scPreviewCardTrigger
          [delay]="100"
          [closeDelay]="100"
        >
          inline-end
        </button>
        <ng-template scPreviewCardPortal>
          <div scPreviewCard>
            <div class="flex flex-col gap-1">
              <h4 class="font-medium">Preview Card</h4>
              <p>
                This preview card appears on the inline-end side of the trigger.
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
export class LogicalSidesPreviewCardDemo {}`;
}
