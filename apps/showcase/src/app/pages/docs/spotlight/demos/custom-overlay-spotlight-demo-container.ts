import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { CustomOverlaySpotlightDemo } from './custom-overlay-spotlight-demo';

@Component({
  selector: 'app-custom-overlay-spotlight-demo-container',
  imports: [DemoContainer, CustomOverlaySpotlightDemo],
  template: `
    <app-demo-container title="Custom Overlay" [code]="code">
      <app-custom-overlay-spotlight-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomOverlaySpotlightDemoContainer {
  readonly code = `import {
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
  template: \`
    <div class="space-y-6">
      <div
        id="spotlight-actions"
        class="p-6 border rounded-lg bg-card hover:shadow-md transition-shadow"
      >
        <div
          class="size-12 rounded-full bg-green-500/10 flex items-center justify-center mb-4"
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
        <h3 class="font-semibold mb-2">Quick Actions</h3>
        <p class="text-sm text-muted-foreground">
          Perform common tasks with just a single click.
        </p>
      </div>

      <button
        type="button"
        (click)="showActions()"
        class="px-4 py-2 border rounded-md hover:bg-accent"
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
            class="px-3 py-1.5 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Got it
          </button>
        </sc-spotlight-actions>
      </sc-spotlight>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomOverlaySpotlightDemo {
  private readonly spotlight = viewChild.required<ScSpotlight>('spotlight');

  showActions(): void {
    this.spotlight().show('#spotlight-actions');
  }
}`;
}
