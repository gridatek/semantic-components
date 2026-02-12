import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-feature-grid',
  template: `
    <section class="py-16 px-4 md:px-6 lg:px-8">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-2xl md:text-3xl font-bold text-center mb-12">
          Features
        </h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div class="p-6 rounded-lg border bg-card">
            <div
              class="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="text-primary"
                aria-hidden="true"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M3 9h18" />
                <path d="M9 21V9" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold mb-2">Responsive Design</h3>
            <p class="text-muted-foreground">
              Automatically adapts between desktop and mobile layouts with
              smooth transitions.
            </p>
          </div>
          <div class="p-6 rounded-lg border bg-card">
            <div
              class="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="text-primary"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="m16 10-4 4-4-4" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold mb-2">Accessible</h3>
            <p class="text-muted-foreground">
              Built with ARIA attributes, keyboard navigation, and screen reader
              support.
            </p>
          </div>
          <div class="p-6 rounded-lg border bg-card">
            <div
              class="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="text-primary"
                aria-hidden="true"
              >
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold mb-2">Dark Mode Ready</h3>
            <p class="text-muted-foreground">
              Seamlessly supports light and dark themes with CSS variables.
            </p>
          </div>
        </div>
      </div>
    </section>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureGrid {}
