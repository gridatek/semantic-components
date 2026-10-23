import { Component, ViewEncapsulation } from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { SidebarLayoutUsageDemoContainer } from './demos/sidebar-layout-usage-demo-container';

@Component({
  selector: 'app-sidebar-layout-page',
  imports: [
    TocHeading,
    ComponentBadges,
    ScHeading,
    SidebarLayoutUsageDemoContainer,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Sidebar Layout</h1>
        <p class="text-muted-foreground">
          A page frame: a sidebar beside the routed page, which scrolls on its
          own.
        </p>
        <app-component-badges path="sidebar-layout" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-sidebar-layout-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>How It Works</h2>
        <ul class="text-muted-foreground list-inside list-disc space-y-1">
          <li>
            The element marked <code>scSidebar</code> goes first, beside the
            page.
          </li>
          <li>
            The routed page goes in <code>main</code>, through its
            <code>router-outlet</code>: make the layout's component the parent
            route of your pages. <code>main</code> scrolls on its own, so the
            sidebar stays in view.
          </li>
          <li>The layout is at least the window's height.</li>
        </ul>
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class SidebarLayoutPage {}
