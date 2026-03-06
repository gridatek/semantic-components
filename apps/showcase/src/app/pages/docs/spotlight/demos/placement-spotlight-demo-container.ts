import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { PlacementSpotlightDemo } from './placement-spotlight-demo';

@Component({
  selector: 'app-placement-spotlight-demo-container',
  imports: [DemoContainer, PlacementSpotlightDemo],
  template: `
    <app-demo-container title="Placement" [code]="code">
      <app-placement-spotlight-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlacementSpotlightDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  viewChild,
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
  template: \`
    <div class="space-y-6">
      <div
        id="spotlight-help"
        class="bg-card rounded-lg border p-6 transition-shadow hover:shadow-md"
      >
        <div
          class="mb-4 flex size-12 items-center justify-center rounded-full bg-blue-500/10"
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
        <h3 class="mb-2 font-semibold">Help Center</h3>
        <p class="text-muted-foreground text-sm">
          Get support and learn more about using the application.
        </p>
      </div>

      <button
        type="button"
        (click)="showHelp()"
        class="hover:bg-accent rounded-md border px-4 py-2"
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
            class="hover:bg-accent rounded-md border px-3 py-1.5 text-sm"
          >
            Close
          </button>
          <button
            type="button"
            (click)="spotlight.close()"
            class="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-3 py-1.5 text-sm"
          >
            Open Help
          </button>
        </sc-spotlight-actions>
      </sc-spotlight>
    </div>
  \`,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlacementSpotlightDemo {
  private readonly spotlight = viewChild.required<ScSpotlight>('spotlight');

  showHelp(): void {
    this.spotlight().show('#spotlight-help');
  }
}`;
}
