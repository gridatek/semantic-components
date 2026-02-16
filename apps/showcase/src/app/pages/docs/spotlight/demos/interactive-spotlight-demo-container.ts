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
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InteractiveSpotlightDemoContainer {
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
  selector: 'app-interactive-spotlight-demo',
  imports: [
    ScSpotlight,
    ScSpotlightTitle,
    ScSpotlightDescription,
    ScSpotlightActions,
  ],
  template: \`
    <div class="space-y-6">
      <button
        id="spotlight-cta"
        type="button"
        (click)="showCTA()"
        class="px-6 py-3 bg-gradient-to-r from-primary to-purple-600 text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
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
            class="px-3 py-1.5 text-sm border rounded-md hover:bg-accent"
          >
            Not Now
          </button>
          <button
            type="button"
            (click)="spotlight.close()"
            class="px-3 py-1.5 text-sm bg-gradient-to-r from-primary to-purple-600 text-primary-foreground rounded-md"
          >
            Upgrade Now
          </button>
        </sc-spotlight-actions>
      </sc-spotlight>
    </div>
  \`,
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
