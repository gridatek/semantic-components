import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { TopHoverCardDemo } from './top-hover-card-demo';

@Component({
  selector: 'app-top-hover-card-demo-container',
  imports: [DemoContainer, TopHoverCardDemo],
  template: `
    <app-demo-container
      title="Top Aligned"
      demoUrl="/demos/hover-card/top-hover-card-demo"
      [code]="code"
    >
      <app-top-hover-card-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopHoverCardDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScHoverCardProvider,
  ScHoverCardPortal,
  ScHoverCard,
  ScHoverCardTrigger,
} from '@semantic-components/ui';

@Component({
  selector: 'app-top-hover-card-demo',
  imports: [
    ScHoverCardProvider,
    ScHoverCardPortal,
    ScHoverCard,
    ScHoverCardTrigger,
  ],
  template: \`
    <div scHoverCardProvider side="top" align="start">
      <span
        scHoverCardTrigger
        class="cursor-help border-b border-dashed border-muted-foreground text-sm"
      >
        What is Angular?
      </span>
      <ng-template scHoverCardPortal>
        <div scHoverCard>
          <div class="space-y-2">
            <h4 class="text-sm font-semibold">Angular</h4>
            <p class="text-sm text-muted-foreground">
              Angular is a TypeScript-based web application framework led by the
              Angular Team at Google. It's a complete rewrite of AngularJS.
            </p>
            <div class="flex gap-2 pt-2">
              <span
                class="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
              >
                TypeScript
              </span>
              <span
                class="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
              >
                Framework
              </span>
            </div>
          </div>
        </div>
      </ng-template>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopHoverCardDemo {}`;
}
