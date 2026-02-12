import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RightHoverCardDemo } from './right-hover-card-demo';

@Component({
  selector: 'app-right-hover-card-demo-container',
  imports: [DemoContainer, RightHoverCardDemo],
  template: `
    <app-demo-container
      title="Right Side"
      demoUrl="/demos/hover-card/right-hover-card-demo"
      [code]="code"
    >
      <app-right-hover-card-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RightHoverCardDemoContainer {
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
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-right-hover-card-demo',
  imports: [
    ScHoverCardProvider,
    ScHoverCardPortal,
    ScHoverCard,
    ScHoverCardTrigger,
  ],
  template: \`
    <div sc-hover-card-provider side="right">
      <button
        sc-hover-card-trigger
        class="inline-flex h-9 items-center justify-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <svg
          class="size-4"
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
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4" />
          <path d="M12 8h.01" />
        </svg>
        More Info
      </button>
      <div sc-hover-card-portal>
        <div sc-hover-card>
          <div class="space-y-2">
            <h4 class="text-sm font-semibold">Information</h4>
            <p class="text-sm text-muted-foreground">
              Hover cards display supplementary information when hovering over a
              trigger element. They're useful for showing previews or additional
              context.
            </p>
          </div>
        </div>
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RightHoverCardDemo {}`;
}
