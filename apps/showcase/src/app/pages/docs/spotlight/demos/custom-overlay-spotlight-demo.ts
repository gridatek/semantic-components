import { Component, ViewEncapsulation, viewChild } from '@angular/core';
import {
  ScSpotlight,
  ScSpotlightActions,
  ScSpotlightDescription,
  ScSpotlightHighlight,
  ScSpotlightMask,
  ScSpotlightTitle,
  ScSpotlightTooltip,
} from '@semantic-components/ui-lab';
import { SiCheckIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-custom-overlay-spotlight-demo',
  imports: [
    ScSpotlight,
    ScSpotlightMask,
    ScSpotlightHighlight,
    ScSpotlightTooltip,
    ScSpotlightTitle,
    ScSpotlightDescription,
    ScSpotlightActions,
    SiCheckIcon,
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
          <svg siCheckIcon class="size-6 text-green-500"></svg>
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

      <div
        scSpotlight
        #spotlight="scSpotlight"
        [overlayOpacity]="0.8"
        [showClose]="false"
      >
        <svg scSpotlightMask></svg>

        @if (spotlight.targetRect()) {
          <div scSpotlightHighlight></div>
        }

        @if (spotlight.targetRect()) {
          <div scSpotlightTooltip>
            <h3 scSpotlightTitle>Quick Actions</h3>
            <p scSpotlightDescription>
              Access frequently used actions from here. You can customize which
              actions appear.
            </p>
            <div scSpotlightActions>
              <button
                type="button"
                (click)="spotlight.close()"
                class="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-3 py-1.5 text-sm"
              >
                Got it
              </button>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class CustomOverlaySpotlightDemo {
  private readonly spotlight = viewChild.required<ScSpotlight>('spotlight');

  showActions(): void {
    this.spotlight().show('#spotlight-actions');
  }
}
