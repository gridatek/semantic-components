import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import {
  ScTourGuide,
  ScTourGuideAction,
  ScTourGuideCounter,
  ScTourGuideDescription,
  ScTourGuideHighlight,
  ScTourGuideMask,
  ScTourGuideNavigation,
  ScTourGuideTitle,
  ScTourGuideTooltip,
  TourService,
} from '@semantic-components/ui-lab';
import type { TourOptions } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-minimal-tour-guide-demo',
  imports: [
    ScTourGuide,
    ScTourGuideMask,
    ScTourGuideHighlight,
    ScTourGuideTooltip,
    ScTourGuideTitle,
    ScTourGuideDescription,
    ScTourGuideNavigation,
    ScTourGuideCounter,
    ScTourGuideAction,
  ],
  template: `
    <div class="space-y-8">
      <!-- Demo UI elements -->
      <div class="grid gap-6 md:grid-cols-2">
        <div id="tour-minimal-card-1" class="bg-card rounded-lg border p-6">
          <h3 class="mb-2 font-semibold">Dashboard</h3>
          <p class="text-muted-foreground text-sm">
            View your analytics and key metrics at a glance.
          </p>
        </div>

        <div id="tour-minimal-card-2" class="bg-card rounded-lg border p-6">
          <h3 class="mb-2 font-semibold">Reports</h3>
          <p class="text-muted-foreground text-sm">
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
          class="hover:bg-accent rounded-md border px-4 py-2"
        >
          Start Minimal Tour
        </button>
      </div>

      <!-- Tour Guide (no close, no step numbers, no progress) -->
      @if (tourService.isActive()) {
        <div scTourGuide #guide="scTourGuide">
          <svg scTourGuideMask></svg>

          @if (guide.targetRect()) {
            <div scTourGuideHighlight></div>
          }

          @if (guide.currentStep()) {
            <div scTourGuideTooltip>
              <h3 scTourGuideTitle></h3>
              <p scTourGuideDescription></p>

              <div scTourGuideNavigation>
                <span scTourGuideCounter></span>
                <div class="flex gap-2">
                  @if (!guide.isFirstStep()) {
                    <button scTourGuideAction action="previous">
                      Previous
                    </button>
                  }
                  @if (guide.isLastStep()) {
                    <button scTourGuideAction action="finish">Finish</button>
                  } @else {
                    <button scTourGuideAction action="next">Next</button>
                  }
                </div>
              </div>
            </div>
          }
        </div>
      }
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MinimalTourGuideDemo {
  protected readonly tourService = inject(TourService);

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
}
