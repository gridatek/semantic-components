import { Component, ViewEncapsulation } from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { BurstConfettiNextDemoContainer } from './demos/burst-confetti-next-demo-container';
import { CustomConfettiNextDemoContainer } from './demos/custom-confetti-next-demo-container';
import { ElementConfettiNextDemoContainer } from './demos/element-confetti-next-demo-container';
import { FireworksConfettiNextDemoContainer } from './demos/fireworks-confetti-next-demo-container';
import { FormConfettiNextDemoContainer } from './demos/form-confetti-next-demo-container';
import { SidesConfettiNextDemoContainer } from './demos/sides-confetti-next-demo-container';

@Component({
  selector: 'app-confetti-next-page',
  imports: [
    BurstConfettiNextDemoContainer,
    ElementConfettiNextDemoContainer,
    SidesConfettiNextDemoContainer,
    FireworksConfettiNextDemoContainer,
    CustomConfettiNextDemoContainer,
    FormConfettiNextDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Confetti Next</h1>
        <p class="text-muted-foreground">
          Confetti, rebuilt: a burst, two cannons or fireworks, in the theme’s
          colours — on a click, or from code. Decorative only, and none for
          reduced motion.
        </p>
        <app-component-badges path="confetti-next" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Installation</h2>
        <p class="text-muted-foreground">
          It draws with the
          <a
            href="https://github.com/catdad/canvas-confetti"
            target="_blank"
            rel="noopener"
            class="text-foreground underline underline-offset-4"
            >canvas-confetti</a
          >
          library — an optional peer of the lab: install it where you use
          confetti.
        </p>
        <pre
          class="bg-muted overflow-x-auto rounded-md p-4 text-sm"
        ><code>npm install canvas-confetti</code></pre>
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <p class="text-muted-foreground">
          It has its own entry point, and loads canvas-confetti on the first
          burst only:
        </p>
        <pre
          class="bg-muted overflow-x-auto rounded-md p-4 text-sm"
        ><code>import {{ '{' }} ScConfetti, ScConfettiTrigger {{ '}' }} from '&#64;semantic-components/ui-lab/confetti';</code></pre>
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Burst</h2>
        <p class="text-muted-foreground">
          scConfetti on a button: a click bursts from it, in the theme’s
          colours. Decorative — hidden from screen readers, never in the way,
          and none for reduced motion.
        </p>
        <app-burst-confetti-next-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>From the element</h2>
        <p class="text-muted-foreground">
          Each burst starts at the centre of what was clicked — wherever it is.
        </p>
        <app-element-confetti-next-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Sides</h2>
        <p class="text-muted-foreground">
          confettiEffect="sides": two cannons, from the edges of the screen.
        </p>
        <app-sides-confetti-next-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Fireworks</h2>
        <p class="text-muted-foreground">
          confettiEffect="fireworks": bursts here and there, for three seconds —
          or the duration you give.
        </p>
        <app-fireworks-confetti-next-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Colours and shapes</h2>
        <p class="text-muted-foreground">
          Any CSS colours, circles and squares, bigger pieces, a wider spread.
        </p>
        <app-custom-confetti-next-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>After a form</h2>
        <p class="text-muted-foreground">
          The service, from code: when the form is sent, sides() — and your
          words for screen readers.
        </p>
        <app-form-confetti-next-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class ConfettiNextPage {}
