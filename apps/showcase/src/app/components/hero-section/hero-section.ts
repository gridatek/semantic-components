import { Component, ViewEncapsulation, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScLink, cn } from '@semantic-components/ui';
import { SiGithubIcon, SiStarIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-hero-section',
  imports: [RouterLink, ScLink, SiGithubIcon, SiStarIcon],
  template: `
    <section
      class="from-background to-muted/30 bg-linear-to-b px-4 py-24 md:px-6 md:py-32 lg:px-8 lg:py-40"
    >
      <div class="mx-auto max-w-4xl space-y-10 text-center">
        <span
          class="border-border/60 bg-background/60 text-muted-foreground inline-flex items-center rounded-full border px-4 py-1.5 text-xs font-medium tracking-wide uppercase backdrop-blur"
        >
          Built for modern Angular
        </span>
        <h1
          class="text-4xl leading-[1.1] font-bold tracking-tight text-balance md:text-5xl lg:text-6xl"
        >
          The Missing Piece in the Angular World
        </h1>
        <p
          class="text-muted-foreground mx-auto max-w-2xl text-lg leading-relaxed text-pretty md:text-xl"
        >
          Beautifully crafted UI components for modern Angular, built with
          Tailwind CSS on top of Angular Aria and Angular CDK.
        </p>
        <div
          class="flex flex-col justify-center gap-3 pt-2 sm:flex-row sm:gap-4"
        >
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
})
export class HeroSection {
  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly class = computed(() => cn('block', this.classInput()));
}
