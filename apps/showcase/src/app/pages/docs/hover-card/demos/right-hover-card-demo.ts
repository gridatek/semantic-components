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
} from '@semantic-components/ui';

@Component({
  selector: 'app-right-hover-card-demo',
  imports: [
    ScHoverCardProvider,
    ScHoverCardPortal,
    ScHoverCard,
    ScHoverCardTrigger,
  ],
  template: `
    <div scHoverCardProvider side="right">
      <button
        scHoverCardTrigger
        class="border-input bg-background hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring inline-flex h-9 items-center justify-center gap-2 rounded-md border px-4 py-2 text-sm font-medium shadow-xs transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
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
      <ng-template scHoverCardPortal>
        <div scHoverCard>
          <div class="space-y-2">
            <h4 class="text-sm font-semibold">Information</h4>
            <p class="text-muted-foreground text-sm">
              Hover cards display supplementary information when hovering over a
              trigger element. They're useful for showing previews or additional
              context.
            </p>
          </div>
        </div>
      </ng-template>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RightHoverCardDemo {}
