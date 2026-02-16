import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { MinimalTourGuideDemo } from './minimal-tour-guide-demo';

@Component({
  selector: 'app-minimal-tour-guide-demo-container',
  imports: [DemoContainer, MinimalTourGuideDemo],
  template: `
    <app-demo-container title="Minimal Tour" [code]="code">
      <app-minimal-tour-guide-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MinimalTourGuideDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { ScTourGuide, TourService, TourOptions } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-minimal-tour-guide-demo',
  imports: [ScTourGuide],
  template: \`
    <div class="space-y-8">
      <!-- Demo UI elements -->
      <div class="grid gap-6 md:grid-cols-2">
        <div id="tour-minimal-card-1" class="p-6 border rounded-lg bg-card">
          <h3 class="font-semibold mb-2">Dashboard</h3>
          <p class="text-sm text-muted-foreground">
            View your analytics and key metrics at a glance.
          </p>
        </div>

        <div id="tour-minimal-card-2" class="p-6 border rounded-lg bg-card">
          <h3 class="font-semibold mb-2">Reports</h3>
          <p class="text-sm text-muted-foreground">
            Generate and export detailed reports.
          </p>
        </div>
      </div>

      <!-- Action button -->
      <div>
        <button
          id="tour-minimal-button"
          type="button"
          (click)="startTour()"
          class="px-4 py-2 border rounded-md hover:bg-accent"
        >
          Start Minimal Tour
        </button>
      </div>

      <!-- Tour Guide Component -->
      <sc-tour-guide />
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MinimalTourGuideDemo {
  private readonly tourService = inject(TourService);

  startTour(): void {
    const options: TourOptions = {
      steps: [
        {
          target: '#tour-minimal-card-1',
          title: 'Dashboard Overview',
          content: 'Your central hub for all information.',
        },
        {
          target: '#tour-minimal-card-2',
          title: 'Reports Section',
          content: 'Generate and export detailed reports.',
        },
      ],
      showProgress: false,
      showStepNumbers: false,
      overlayOpacity: 0.6,
    };

    this.tourService.start(options);
  }
}`;
}
