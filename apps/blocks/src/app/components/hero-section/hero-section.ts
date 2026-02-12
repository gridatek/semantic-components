import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-hero-section',
  template: `
    <section
      class="py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-background to-muted/30"
    >
      <div class="max-w-4xl px-4 md:px-6 lg:px-8 mx-auto text-center space-y-6">
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
          Build Something Amazing
        </h1>
        <p class="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          A complete design system with responsive components built for modern
          web applications. Start building beautiful interfaces today.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            class="h-11 px-8 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Get Started Free
          </button>
          <button
            class="h-11 px-8 text-sm font-medium rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground"
          >
            View Documentation
          </button>
        </div>
      </div>
    </section>
  `,
  host: {
    'data-slot': 'hero-section',
    class: 'block',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroSection {}
