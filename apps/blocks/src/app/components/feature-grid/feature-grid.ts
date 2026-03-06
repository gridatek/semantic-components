import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import {
  SiCircleChevronDownIcon,
  SiLayoutDashboardIcon,
  SiMoonIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-feature-grid',
  imports: [SiLayoutDashboardIcon, SiCircleChevronDownIcon, SiMoonIcon],
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
                siLayoutDashboardIcon
                class="text-primary"
                aria-hidden="true"
              ></svg>
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
                siCircleChevronDownIcon
                class="text-primary"
                aria-hidden="true"
              ></svg>
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
              <svg siMoonIcon class="text-primary" aria-hidden="true"></svg>
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
