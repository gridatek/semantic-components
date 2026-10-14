import { Component, ViewEncapsulation } from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { BackdropUsageDemoContainer } from './demos/backdrop-usage-demo-container';
import BasicBackdropDemoContainer from './demos/basic-backdrop-demo-container';

@Component({
  selector: 'app-backdrop-page',
  imports: [
    TocHeading,
    ComponentBadges,
    ScHeading,
    BackdropUsageDemoContainer,
    BasicBackdropDemoContainer,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Backdrop</h1>
        <p class="text-muted-foreground">
          A dimmed, blurred layer that fades in and out behind an overlay — the
          dialog, alert dialog, drawer, sheet and lightbox use it.
        </p>
        <app-component-badges path="backdrop" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-backdrop-usage-demo-container />
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-basic-backdrop-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>How It Works</h2>
        <ul class="text-muted-foreground list-inside list-disc space-y-1">
          <li>
            It fades in when it is shown and out when it goes (
            <code>animate.enter</code>
            /
            <code>animate.leave</code>
            ): Angular removes it once it has faded out. Show it with
            <code>&#64;if</code>
            , or as part of an overlay.
          </li>
          <li>
            It covers the window (
            <code>fixed inset-0</code>
            ) behind the overlay's content; a
            <code>class</code>
            changes that.
          </li>
          <li>
            It doesn't take clicks or focus: closing on a click outside, and
            trapping focus, are the overlay's.
          </li>
        </ul>
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class BackdropPage {}
