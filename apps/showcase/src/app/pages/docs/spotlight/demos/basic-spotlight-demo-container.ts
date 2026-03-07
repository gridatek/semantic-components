import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicSpotlightDemo } from './basic-spotlight-demo';

@Component({
  selector: 'app-basic-spotlight-demo-container',
  imports: [DemoContainer, BasicSpotlightDemo],
  template: `
    <app-demo-container title="Basic" [code]="code">
      <app-basic-spotlight-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicSpotlightDemoContainer {
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
import { SiSunIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-basic-spotlight-demo',
  imports: [
    ScSpotlight,
    ScSpotlightTitle,
    ScSpotlightDescription,
    ScSpotlightActions,
    SiSunIcon,
  ],
  template: \`
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
        </sc-spotlight-actions>
      </sc-spotlight>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicSpotlightDemo {
  private readonly spotlight = viewChild.required<ScSpotlight>('spotlight');

  showFeature(): void {
    this.spotlight().show('#spotlight-feature');
  }
}`;
}
