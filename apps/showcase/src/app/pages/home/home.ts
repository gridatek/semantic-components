import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScBadge, ScLink } from '@semantic-components/ui';
import { HomeCards } from './cards/home-cards';

/**
 * The home page, as shadcn's: an announcement, the heading, what it is, two
 * ways in — then the components at work, in cards.
 */
@Component({
  selector: 'app-home',
  imports: [RouterLink, ScBadge, ScLink, HomeCards],
  template: `
    <section
      class="flex flex-col items-center gap-2 px-6 py-8 text-center md:py-16 lg:py-20 xl:gap-4"
    >
      <span scBadge variant="secondary" class="bg-muted">
        Semantic Components
      </span>
      <h1
        class="text-primary max-w-4xl text-3xl leading-tight font-semibold tracking-tight text-balance lg:leading-[1.1] xl:text-5xl xl:tracking-tighter"
      >
        The Missing Piece in the Angular World
      </h1>
      <p class="text-foreground max-w-4xl text-base text-balance sm:text-lg">
        Accessible components for modern Angular, built with Tailwind CSS on
        Angular Aria and the CDK: parts you compose, in the look of your preset.
      </p>
      <div class="flex w-full items-center justify-center gap-2 pt-2">
        <a scLink variant="button" routerLink="/docs/getting-started">
          Get Started
        </a>
        <a scLink variant="secondary" routerLink="/components">
          View Components
        </a>
      </div>
    </section>

    <app-home-cards />
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class Home {}
