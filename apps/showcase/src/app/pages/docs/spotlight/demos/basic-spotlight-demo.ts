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
  selector: 'app-basic-spotlight-demo',
  imports: [
    ScSpotlight,
    ScSpotlightTitle,
    ScSpotlightDescription,
    ScSpotlightActions,
  ],
  template: `
    <div class="space-y-6">
      <div
        id="spotlight-feature"
        class="p-6 border rounded-lg bg-card hover:shadow-md transition-shadow"
      >
        <div
          class="size-12 rounded-full bg-primary/10 flex items-center justify-center mb-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            class="size-6 text-primary"
          >
            <path
              d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"
            />
          </svg>
        </div>
        <h3 class="font-semibold mb-2">New Feature</h3>
        <p class="text-sm text-muted-foreground">
          Discover our latest feature that helps you work more efficiently.
        </p>
      </div>

      <button
        type="button"
        (click)="showFeature()"
        class="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
      >
        Highlight Feature
      </button>

      <sc-spotlight #spotlight [padding]="12" [borderRadius]="12">
        <sc-spotlight-title>New Feature Available!</sc-spotlight-title>
        <sc-spotlight-description>
          This exciting new feature helps you work more efficiently. Click to
          learn more about how it works.
        </sc-spotlight-description>
        <sc-spotlight-actions>
          <button
            type="button"
            (click)="spotlight.close()"
            class="px-3 py-1.5 text-sm border rounded-md hover:bg-accent"
          >
            Maybe Later
          </button>
          <button
            type="button"
            (click)="spotlight.close()"
            class="px-3 py-1.5 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Learn More
          </button>
        </sc-spotlight-actions>
      </sc-spotlight>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicSpotlightDemo {
  private readonly spotlight = viewChild.required<ScSpotlight>('spotlight');

  showFeature(): void {
    this.spotlight().show('#spotlight-feature');
  }
}
