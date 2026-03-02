import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';

@Component({
  selector: 'app-feature-grid',
  template: `
    <section class="px-4 py-16 md:px-6 lg:px-8">
      <div class="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">
        <h2 class="mb-12 text-center text-2xl font-bold md:text-3xl">
          Features
        </h2>
        <div class="grid gap-8 md:grid-cols-3">
          <div class="bg-card rounded-lg border p-6">
            <div
              class="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-lg"
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
            <h3 class="mb-2 text-lg font-semibold">Responsive Design</h3>
            <p class="text-muted-foreground">
              Automatically adapts between desktop and mobile layouts with
              smooth transitions.
            </p>
          </div>
          <div class="bg-card rounded-lg border p-6">
            <div
              class="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-lg"
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
            <h3 class="mb-2 text-lg font-semibold">Accessible</h3>
            <p class="text-muted-foreground">
              Built with ARIA attributes, keyboard navigation, and screen reader
              support.
            </p>
          </div>
          <div class="bg-card rounded-lg border p-6">
            <div
              class="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-lg"
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
            <h3 class="mb-2 text-lg font-semibold">Dark Mode Ready</h3>
            <p class="text-muted-foreground">
              Seamlessly supports light and dark themes with CSS variables.
            </p>
          </div>
        </div>
      </div>
    </section>
  `,
  host: {
    'data-slot': 'feature-grid',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureGrid {
  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly class = computed(() => cn('block', this.classInput()));
}
