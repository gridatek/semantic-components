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
  selector: 'app-basic-hover-card-demo',
  imports: [
    ScHoverCardProvider,
    ScHoverCardPortal,
    ScHoverCard,
    ScHoverCardTrigger,
  ],
  template: `
    <div sc-hover-card-provider>
      <a
        sc-hover-card-trigger
        href="https://github.com/angular"
        target="_blank"
        rel="noopener noreferrer"
        class="text-sm font-medium underline underline-offset-4"
      >
        &#64;angular
      </a>
      <div sc-hover-card-portal>
        <div sc-hover-card>
          <div class="flex justify-between gap-4">
            <div
              class="flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-red-700 text-xl font-bold text-white"
            >
              A
            </div>
            <div class="space-y-1">
              <h4 class="text-sm font-semibold">&#64;angular</h4>
              <p class="text-sm text-muted-foreground">
                The modern web developer's platform.
              </p>
              <div class="flex items-center pt-2">
                <svg
                  class="mr-2 size-4 text-muted-foreground"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                  <line x1="16" x2="16" y1="2" y2="6" />
                  <line x1="8" x2="8" y1="2" y2="6" />
                  <line x1="3" x2="21" y1="10" y2="10" />
                </svg>
                <span class="text-xs text-muted-foreground">
                  Joined September 2014
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicHoverCardDemo {}
