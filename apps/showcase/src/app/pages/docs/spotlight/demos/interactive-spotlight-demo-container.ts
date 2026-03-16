import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { InteractiveSpotlightDemo } from './interactive-spotlight-demo';

@Component({
  selector: 'app-interactive-spotlight-demo-container',
  imports: [DemoContainer, InteractiveSpotlightDemo],
  template: `
    <app-demo-container title="Interactive" [code]="code">
      <app-interactive-spotlight-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InteractiveSpotlightDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  viewChild,
} from '@angular/core';
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
import { SiXIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-interactive-spotlight-demo',
  imports: [
    ScSpotlight,
    ScSpotlightMask,
    ScSpotlightHighlight,
    ScSpotlightClose,
    ScSpotlightTooltip,
    ScSpotlightTitle,
    ScSpotlightDescription,
    ScSpotlightActions,
    SiXIcon,
  ],
  template: \`
    <div class="space-y-6">
      <button
        id="spotlight-cta"
        type="button"
        (click)="showCTA()"
        class="from-primary text-primary-foreground rounded-lg bg-linear-to-r to-purple-600 px-6 py-3 font-medium transition-opacity hover:opacity-90"
      >
        Try Premium Feature
      </button>

      <div
        scSpotlight
        #spotlight="scSpotlight"
        [padding]="16"
        [borderRadius]="12"
        [overlayOpacity]="0.85"
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
            <h3 scSpotlightTitle>Unlock Premium Features</h3>
            <p scSpotlightDescription>
              Upgrade to premium to access advanced analytics, priority support,
              and exclusive features.
            </p>
            <div scSpotlightActions>
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
            </div>
          </div>
        }
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InteractiveSpotlightDemo {
  private readonly spotlight = viewChild.required<ScSpotlight>('spotlight');

  showCTA(): void {
    this.spotlight().show('#spotlight-cta');
  }
}`;
}
