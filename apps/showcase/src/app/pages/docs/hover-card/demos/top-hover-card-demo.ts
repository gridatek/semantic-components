import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScHoverCardProvider,
  ScHoverCardPortal,
  ScHoverCard,
  ScHoverCardTrigger,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-top-hover-card-demo',
  imports: [
    ScHoverCardProvider,
    ScHoverCardPortal,
    ScHoverCard,
    ScHoverCardTrigger,
  ],
  template: `
    <div sc-hover-card-provider side="top" align="start">
      <span
        sc-hover-card-trigger
        class="cursor-help border-b border-dashed border-muted-foreground text-sm"
      >
        What is Angular?
      </span>
      <div sc-hover-card-portal>
        <div sc-hover-card>
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
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopHoverCardDemo {}
