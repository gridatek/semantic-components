import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScLink } from '@semantic-components/ui';

@Component({
  selector: 'app-hero-section',
  imports: [RouterLink, ScLink],
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
          <a sc-link size="lg" routerLink="/docs/getting-started">
            Get Started
          </a>
          <a sc-link variant="outline" size="lg" routerLink="/docs/components">
            View Components
          </a>
        </div>
      </div>
    </section>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroSection {}
