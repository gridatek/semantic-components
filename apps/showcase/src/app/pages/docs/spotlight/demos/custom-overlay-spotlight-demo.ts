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
  selector: 'app-custom-overlay-spotlight-demo',
  imports: [
    ScSpotlight,
    ScSpotlightTitle,
    ScSpotlightDescription,
    ScSpotlightActions,
  ],
  template: `
    <div class="space-y-6">
      <div
        id="spotlight-actions"
        class="bg-card rounded-lg border p-6 transition-shadow hover:shadow-md"
      >
        <div
          class="mb-4 flex size-12 items-center justify-center rounded-full bg-green-500/10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            class="size-6 text-green-500"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 class="mb-2 font-semibold">Quick Actions</h3>
        <p class="text-muted-foreground text-sm">
          Perform common tasks with just a single click.
        </p>
      </div>

      <button
        type="button"
        (click)="showActions()"
        class="hover:bg-accent rounded-md border px-4 py-2"
      >
        Highlight Actions
      </button>

      <sc-spotlight #spotlight [overlayOpacity]="0.8" [showClose]="false">
        <sc-spotlight-title>Quick Actions</sc-spotlight-title>
        <sc-spotlight-description>
          Access frequently used actions from here. You can customize which
          actions appear.
        </sc-spotlight-description>
        <sc-spotlight-actions>
          <button
            type="button"
            (click)="spotlight.close()"
            class="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-3 py-1.5 text-sm"
          >
            Got it
          </button>
        </sc-spotlight-actions>
      </sc-spotlight>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomOverlaySpotlightDemo {
  private readonly spotlight = viewChild.required<ScSpotlight>('spotlight');

  showActions(): void {
    this.spotlight().show('#spotlight-actions');
  }
}
