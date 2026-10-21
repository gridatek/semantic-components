import { Component, ViewEncapsulation } from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { BasicSpotlightNextDemoContainer } from './demos/basic-spotlight-next-demo-container';
import { CustomSpotlightNextDemoContainer } from './demos/custom-spotlight-next-demo-container';
import { InteractiveSpotlightNextDemoContainer } from './demos/interactive-spotlight-next-demo-container';
import { SidesSpotlightNextDemoContainer } from './demos/sides-spotlight-next-demo-container';

@Component({
  selector: 'app-spotlight-next-page',
  imports: [
    BasicSpotlightNextDemoContainer,
    InteractiveSpotlightNextDemoContainer,
    SidesSpotlightNextDemoContainer,
    CustomSpotlightNextDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Spotlight Next</h1>
        <p class="text-muted-foreground">
          The spotlight, rebuilt: one element lit, the page dimmed, your content
          beside it in a native dialog — modal, or interactive: the element
          still usable through the cutout.
        </p>
        <app-component-badges path="spotlight-next" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Basic</h2>
        <p class="text-muted-foreground">
          A new feature, in the spotlight: the page dimmed and inert but for it,
          a card beside it, named by its title. Escape, a click on the dim, or
          Got it.
        </p>
        <app-basic-spotlight-next-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Interactive</h2>
        <p class="text-muted-foreground">
          The element stays usable through the cutout — type in the search while
          it is lit; the rest of the page stays dimmed and blocked. Escape still
          closes.
        </p>
        <app-interactive-spotlight-next-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Sides</h2>
        <p class="text-muted-foreground">
          The card on the side you ask — logical, start and end follow the
          direction — flipping when there is no room.
        </p>
        <app-sides-spotlight-next-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Custom dim</h2>
        <p class="text-muted-foreground">
          The dim and the cutout are classes: here a round cutout around an
          avatar, and a deeper dim.
        </p>
        <app-custom-spotlight-next-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class SpotlightNextPage {}
