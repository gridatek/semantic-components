import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScButton } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-hero-section',
  imports: [ScButton],
  template: `
    <section
      class="py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-background to-muted/30"
    >
      <div class="max-w-4xl mx-auto text-center space-y-6">
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
          Build Something Amazing
        </h1>
        <p class="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          A complete design system with responsive components built for modern
          web applications. Start building beautiful interfaces today.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button sc-button size="lg">Get Started Free</button>
          <button sc-button variant="outline" size="lg">
            View Documentation
          </button>
        </div>
      </div>
    </section>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroSection {}
