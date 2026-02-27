import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '@semantic-components/ui';

@Component({
  selector: 'app-hero-section',
  template: `
    <section
      class="from-background to-muted/30 bg-linear-to-b px-4 py-20 md:px-6 lg:px-8"
    >
      <div class="mx-auto max-w-4xl space-y-6 px-4 text-center md:px-6 lg:px-8">
        <h1 class="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
          Build Something Amazing
        </h1>
        <p class="text-muted-foreground mx-auto max-w-2xl text-lg md:text-xl">
          A complete design system with responsive components built for modern
          web applications. Start building beautiful interfaces today.
        </p>
        <div class="flex flex-col justify-center gap-4 sm:flex-row">
          <button
            class="bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-md px-8 text-sm font-medium"
          >
            Get Started Free
          </button>
          <button
            class="border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 rounded-md border px-8 text-sm font-medium"
          >
            View Documentation
          </button>
        </div>
      </div>
    </section>
  `,
  host: {
    'data-slot': 'hero-section',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroSection {
  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly class = computed(() => cn('block', this.classInput()));
}
