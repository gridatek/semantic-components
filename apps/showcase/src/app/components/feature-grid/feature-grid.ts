import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '@semantic-components/ui';

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
                <path d="m18 16 4-4-4-4" />
                <path d="m6 8-4 4 4 4" />
                <path d="m14.5 4-5 16" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold mb-2">Semantic</h3>
            <p class="text-muted-foreground">
              Components with meaningful names and intuitive APIs that make your
              templates read like documentation.
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
                <path
                  d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"
                />
              </svg>
            </div>
            <h3 class="text-lg font-semibold mb-2">Declarative</h3>
            <p class="text-muted-foreground">
              Configure components through clean, readable templates instead of
              imperative code.
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
                <rect width="8" height="8" x="2" y="2" rx="1" />
                <rect width="8" height="8" x="14" y="2" rx="1" />
                <rect width="8" height="8" x="2" y="14" rx="1" />
                <rect width="8" height="8" x="14" y="14" rx="1" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold mb-2">Composable</h3>
            <p class="text-muted-foreground">
              Mix and match small, focused components to build complex UIs that
              fit your needs.
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
                <path
                  d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"
                />
              </svg>
            </div>
            <h3 class="text-lg font-semibold mb-2">Modern</h3>
            <p class="text-muted-foreground">
              Powered by signals, standalone components, control flow, and the
              latest Angular APIs.
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
                <polyline points="4 17 10 11 4 5" />
                <line x1="12" x2="20" y1="19" y2="19" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold mb-2">Type Safe</h3>
            <p class="text-muted-foreground">
              Built with strict TypeScript for full type checking and
              autocompletion out of the box.
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
                <path
                  d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"
                />
                <path d="M7 7h.01" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold mb-2">Tailwind CSS & CVA</h3>
            <p class="text-muted-foreground">
              Styled with Tailwind CSS and class-variance-authority for
              consistent, customizable variants.
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
  host: {
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureGrid {
  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly class = computed(() => cn('block', this.classInput()));
}
