import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { cn, ScLink } from '@semantic-components/ui';
import { SiGithubIcon, SiStarIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-hero-section',
  imports: [RouterLink, ScLink, SiGithubIcon, SiStarIcon],
  template: `
    <section
      class="from-background to-muted/30 bg-gradient-to-b px-4 py-20 md:px-6 lg:px-8"
    >
      <div class="mx-auto max-w-4xl space-y-6 text-center">
        <h1 class="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
          The Missing Piece in the Angular World
        </h1>
        <p class="text-muted-foreground mx-auto max-w-2xl text-lg md:text-xl">
          Beautifully crafted UI components for modern Angular, built with
          Tailwind CSS on top of Angular Aria and Angular CDK.
        </p>
        <div class="flex flex-col justify-center gap-4 sm:flex-row">
          <a scLink size="lg" routerLink="/docs/getting-started">Get Started</a>
          <a scLink variant="outline" size="lg" routerLink="/docs/components">
            View Components
          </a>
          <a
            scLink
            variant="outline"
            size="lg"
            href="https://github.com/gridatek/semantic-components"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg siGithubIcon class="size-4"></svg>
            Star on GitHub
            <svg siStarIcon class="size-4"></svg>
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
