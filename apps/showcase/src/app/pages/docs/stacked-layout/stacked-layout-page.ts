import { Component, ViewEncapsulation } from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { StackedLayoutUsageDemoContainer } from './demos/stacked-layout-usage-demo-container';

@Component({
  selector: 'app-stacked-layout-page',
  imports: [
    TocHeading,
    ComponentBadges,
    ScHeading,
    StackedLayoutUsageDemoContainer,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Stacked Layout</h1>
        <p class="text-muted-foreground">
          A page frame: a navbar stuck to the top, the routed page below it, and
          a footer — this site is built on it.
        </p>
        <app-component-badges path="stacked-layout" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-stacked-layout-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>How It Works</h2>
        <ul class="text-muted-foreground list-inside list-disc space-y-1">
          <li>
            The element marked
            <code>scNavbar</code>
            is stuck to the top of the window. It is not wrapped in a
            <code>header</code>
            : the navbar is the page's header itself.
          </li>
          <li>
            The routed page goes in
            <code>main</code>
            , through its
            <code>router-outlet</code>
            : make the layout's component the parent route of your pages.
          </li>
          <li>
            The element marked
            <code>scFooter</code>
            goes last. The layout is at least the window's height, so the footer
            stays at the bottom of a short page.
          </li>
        </ul>
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class StackedLayoutPage {}
