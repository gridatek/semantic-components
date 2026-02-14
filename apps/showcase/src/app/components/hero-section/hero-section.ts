import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { cn, ScLink } from '@semantic-components/ui';

@Component({
  selector: 'app-hero-section',
  imports: [RouterLink, ScLink],
  template: `
    <section
      class="py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-background to-muted/30"
    >
      <div class="max-w-4xl mx-auto text-center space-y-6">
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
          The Missing Piece in the Angular World
        </h1>
        <p class="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Beautifully crafted UI components for modern Angular, built with
          Tailwind CSS on top of Angular Aria and Angular CDK.
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
  host: {
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroSection {
  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly class = computed(() => cn('block', this.classInput()));
}
