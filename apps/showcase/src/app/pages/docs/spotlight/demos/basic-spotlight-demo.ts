import { Component, ViewEncapsulation, viewChild } from '@angular/core';
import {
  ScSpotlight,
  ScSpotlightActions,
  ScSpotlightClose,
  ScSpotlightDescription,
  ScSpotlightHighlight,
  ScSpotlightMask,
  ScSpotlightTitle,
  ScSpotlightTooltip,
} from '@semantic-components/ui-lab';
import { SiSunIcon, SiXIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-basic-spotlight-demo',
  imports: [
    ScSpotlight,
    ScSpotlightMask,
    ScSpotlightHighlight,
    ScSpotlightClose,
    ScSpotlightTooltip,
    ScSpotlightTitle,
    ScSpotlightDescription,
    ScSpotlightActions,
    SiSunIcon,
    SiXIcon,
  ],
  template: `
    <div class="space-y-6">
      <div
        id="spotlight-feature"
        class="bg-card rounded-lg border p-6 transition-shadow hover:shadow-md"
      >
        <div
          class="bg-primary/10 mb-4 flex size-12 items-center justify-center rounded-full"
        >
          <svg siSunIcon class="text-primary size-6"></svg>
        </div>
        <h3 class="mb-2 font-semibold">New Feature</h3>
        <p class="text-muted-foreground text-sm">
          Discover our latest feature that helps you work more efficiently.
        </p>
      </div>

      <button
        type="button"
        (click)="showFeature()"
        class="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2"
      >
        Highlight Feature
      </button>

      <div
        scSpotlight
        #spotlight="scSpotlight"
        [padding]="12"
        [borderRadius]="12"
      >
        <svg scSpotlightMask></svg>

        @if (spotlight.targetRect()) {
          <div scSpotlightHighlight></div>
        }

        @if (spotlight.showClose()) {
          <button scSpotlightClose aria-label="Close spotlight">
            <svg siXIcon class="size-5"></svg>
          </button>
        }

        @if (spotlight.targetRect()) {
          <div scSpotlightTooltip>
            <h3 scSpotlightTitle>New Feature Available!</h3>
            <p scSpotlightDescription>
              This exciting new feature helps you work more efficiently. Click
              to learn more about how it works.
            </p>
            <div scSpotlightActions>
              <button
                type="button"
                (click)="spotlight.close()"
                class="hover:bg-accent rounded-md border px-3 py-1.5 text-sm"
              >
                Maybe Later
              </button>
              <button
                type="button"
                (click)="spotlight.close()"
                class="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-3 py-1.5 text-sm"
              >
                Learn More
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
export class BasicSpotlightDemo {
  private readonly spotlight = viewChild.required<ScSpotlight>('spotlight');

  showFeature(): void {
    this.spotlight().show('#spotlight-feature');
  }
}
