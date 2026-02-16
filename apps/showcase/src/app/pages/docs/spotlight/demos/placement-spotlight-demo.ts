import {
  ChangeDetectionStrategy,
  Component,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScSpotlight,
  ScSpotlightActions,
  ScSpotlightDescription,
  ScSpotlightTitle,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-placement-spotlight-demo',
  imports: [
    ScSpotlight,
    ScSpotlightTitle,
    ScSpotlightDescription,
    ScSpotlightActions,
  ],
  template: `
    <div class="space-y-6">
      <div
        id="spotlight-help"
        class="p-6 border rounded-lg bg-card hover:shadow-md transition-shadow"
      >
        <div
          class="size-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            class="size-6 text-blue-500"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4M12 8h.01" />
          </svg>
        </div>
        <h3 class="font-semibold mb-2">Help Center</h3>
        <p class="text-sm text-muted-foreground">
          Get support and learn more about using the application.
        </p>
      </div>

      <button
        type="button"
        (click)="showHelp()"
        class="px-4 py-2 border rounded-md hover:bg-accent"
      >
        Highlight Help
      </button>

      <sc-spotlight #spotlight [contentPlacement]="'bottom'">
        <sc-spotlight-title>Need Help?</sc-spotlight-title>
        <sc-spotlight-description>
          Our help center has guides, tutorials, and FAQs to help you get the
          most out of the application.
        </sc-spotlight-description>
        <sc-spotlight-actions>
          <button
            type="button"
            (click)="spotlight.close()"
            class="px-3 py-1.5 text-sm border rounded-md hover:bg-accent"
          >
            Close
          </button>
          <button
            type="button"
            (click)="spotlight.close()"
            class="px-3 py-1.5 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Open Help
          </button>
        </sc-spotlight-actions>
      </sc-spotlight>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlacementSpotlightDemo {
  private readonly spotlight = viewChild.required<ScSpotlight>('spotlight');

  showHelp(): void {
    this.spotlight().show('#spotlight-help');
  }
}
