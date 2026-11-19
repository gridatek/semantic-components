import { Component, ViewEncapsulation } from '@angular/core';
import { ScKbd, ScTypeset } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ControlledTourGuideDemoContainer } from './demos/controlled-tour-guide-demo-container';
import { MinimalTourGuideDemoContainer } from './demos/minimal-tour-guide-demo-container';
import { ScrollingTourGuideDemoContainer } from './demos/scrolling-tour-guide-demo-container';
import { TourTourGuideDemoContainer } from './demos/tour-tour-guide-demo-container';

@Component({
  selector: 'app-tour-guide-page',
  imports: [
    ScKbd,
    TourTourGuideDemoContainer,
    MinimalTourGuideDemoContainer,
    ScrollingTourGuideDemoContainer,
    ControlledTourGuideDemoContainer,
    TocHeading,
    ComponentBadges,
    ScTypeset,
  ],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>Tour Guide</h1>
        <p class="text-muted-foreground">
          Your steps as markup on their targets, one at a time in a native modal
          dialog — a spotlight on the target, the card beside it, flipping to
          stay on screen; scrolled into view, named and described, with the
          keys.
        </p>
        <app-component-badges path="tour-guide" />
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Tour</h2>
        <p>
          A welcome (centred, no target), three steps on their targets — the
          page dimmed but for each — and a farewell. <kbd scKbd>←</kbd>
          <kbd scKbd>→</kbd> step; <kbd scKbd>Escape</kbd>, or the ×, ends it.
        </p>
        <app-tour-tour-guide-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Minimal</h2>
        <p>Three steps, Next and Done — no progress, no Back.</p>
        <app-minimal-tour-guide-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Scrolling</h2>
        <p>
          Targets far apart in a long page: each is scrolled into view (smoothly
          — at once for reduced motion), and the card follows.
        </p>
        <app-scrolling-tour-guide-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Controlled</h2>
        <p>
          Open and step are two-way: start at any step from outside; (finished)
          at Done — closed is not finished.
        </p>
        <app-controlled-tour-guide-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class TourGuidePage {}
