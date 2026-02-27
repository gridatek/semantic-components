import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScTourGuide,
  TourService,
  TourOptions,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-full-tour-guide-demo',
  imports: [ScTourGuide],
  template: `
    <div class="space-y-8">
      <!-- Demo UI elements -->
      <div class="grid gap-6 md:grid-cols-3">
        <div id="tour-full-card-1" class="bg-card rounded-lg border p-6">
          <h3 class="mb-2 font-semibold">Dashboard</h3>
          <p class="text-muted-foreground text-sm">
            View your analytics and key metrics at a glance.
          </p>
        </div>

        <div id="tour-full-card-2" class="bg-card rounded-lg border p-6">
          <h3 class="mb-2 font-semibold">Settings</h3>
          <p class="text-muted-foreground text-sm">
            Configure your preferences and account details.
          </p>
        </div>

        <div id="tour-full-card-3" class="bg-card rounded-lg border p-6">
          <h3 class="mb-2 font-semibold">Reports</h3>
          <p class="text-muted-foreground text-sm">
            Generate and export detailed reports.
          </p>
        </div>
      </div>

      <!-- Sample form -->
      <div id="tour-full-form" class="bg-card max-w-md rounded-lg border p-6">
        <h3 class="mb-4 font-semibold">Quick Action Form</h3>
        <div class="space-y-4">
          <div>
            <label class="mb-1 block text-sm font-medium">Name</label>
            <input
              type="text"
              class="bg-background w-full rounded-md border px-3 py-2"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label class="mb-1 block text-sm font-medium">Email</label>
            <input
              type="email"
              class="bg-background w-full rounded-md border px-3 py-2"
              placeholder="Enter your email"
            />
          </div>
          <button
            type="button"
            class="bg-primary text-primary-foreground hover:bg-primary/90 w-full rounded-md px-4 py-2"
          >
            Submit
          </button>
        </div>
      </div>

      <!-- Action button -->
      <div>
        <button
          id="tour-full-button"
          type="button"
          (click)="startTour()"
          class="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2"
        >
          Start Tour
        </button>
      </div>

      <!-- Tour Guide Component -->
      <sc-tour-guide
        (stepChange)="onStepChange($event)"
        (tourComplete)="onTourComplete()"
        (tourClosed)="onTourClosed()"
      />
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FullTourGuideDemo {
  private readonly tourService = inject(TourService);

  startTour(): void {
    const options: TourOptions = {
      steps: [
        {
          target: '#tour-full-card-1',
          title: 'Welcome to Dashboard',
          content:
            'This is your main dashboard where you can view all your analytics and key performance metrics.',
          placement: 'bottom',
        },
        {
          target: '#tour-full-card-2',
          title: 'Settings Panel',
          content:
            'Configure your account settings, preferences, and notification options here.',
          placement: 'bottom',
        },
        {
          target: '#tour-full-card-3',
          title: 'Reports Section',
          content:
            'Generate detailed reports and export them in various formats for analysis.',
          placement: 'bottom',
        },
        {
          target: '#tour-full-form',
          title: 'Quick Actions',
          content:
            'Use this form to quickly perform common actions. Fill in the details and submit.',
          placement: 'right',
          highlightPadding: 12,
        },
        {
          target: '#tour-full-button',
          title: 'Start Again',
          content:
            'Click this button anytime to restart the tour and learn about new features.',
          placement: 'bottom',
        },
      ],
      showProgress: true,
      showStepNumbers: true,
      allowClose: true,
      allowKeyboardNavigation: true,
      scrollBehavior: 'smooth',
    };

    this.tourService.start(options);
  }

  onStepChange(step: number): void {
    console.log('Step changed to:', step);
  }

  onTourComplete(): void {
    console.log('Tour completed!');
  }

  onTourClosed(): void {
    console.log('Tour closed');
  }
}
