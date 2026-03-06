import {
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
  selector: 'app-interactive-spotlight-demo',
  imports: [
    ScSpotlight,
    ScSpotlightTitle,
    ScSpotlightDescription,
    ScSpotlightActions,
  ],
  template: `
    <div class="space-y-6">
      <button
        id="spotlight-cta"
        type="button"
        (click)="showCTA()"
        class="from-primary text-primary-foreground rounded-lg bg-linear-to-r to-purple-600 px-6 py-3 font-medium transition-opacity hover:opacity-90"
      >
        Try Premium Feature
      </button>

      <sc-spotlight
        #spotlight
        [padding]="16"
        [borderRadius]="12"
        [overlayOpacity]="0.85"
      >
        <sc-spotlight-title>Unlock Premium Features</sc-spotlight-title>
        <sc-spotlight-description>
          Upgrade to premium to access advanced analytics, priority support, and
          exclusive features.
        </sc-spotlight-description>
        <sc-spotlight-actions>
          <button
            type="button"
            (click)="spotlight.close()"
            class="hover:bg-accent rounded-md border px-3 py-1.5 text-sm"
          >
            Not Now
          </button>
          <button
            type="button"
            (click)="spotlight.close()"
            class="from-primary text-primary-foreground rounded-md bg-linear-to-r to-purple-600 px-3 py-1.5 text-sm"
          >
            Upgrade Now
          </button>
        </sc-spotlight-actions>
      </sc-spotlight>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InteractiveSpotlightDemo {
  private readonly spotlight = viewChild.required<ScSpotlight>('spotlight');

  showCTA(): void {
    this.spotlight().show('#spotlight-cta');
  }
}
