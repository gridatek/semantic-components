import { Component, ViewEncapsulation } from '@angular/core';
import { ScTypeset } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { BasicHeaderDemoContainer } from './demos/basic-header-demo-container';
import { MobileHeaderDemoContainer } from './demos/mobile-header-demo-container';
import { NavigationMenuHeaderDemoContainer } from './demos/navigation-menu-header-demo-container';
import { PushHeaderDemoContainer } from './demos/push-header-demo-container';
import { RtlHeaderDemoContainer } from './demos/rtl-header-demo-container';
import { StickyHeaderDemoContainer } from './demos/sticky-header-demo-container';

@Component({
  selector: 'app-header-page',
  imports: [
    BasicHeaderDemoContainer,
    MobileHeaderDemoContainer,
    PushHeaderDemoContainer,
    NavigationMenuHeaderDemoContainer,
    StickyHeaderDemoContainer,
    RtlHeaderDemoContainer,
    TocHeading,
    ComponentBadges,
    ScTypeset,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scTypeset>Header</h1>
        <p class="text-muted-foreground">
          A site's top bar: brand, links and actions; on narrow screens a toggle
          opens a menu under the bar. The menu is part of the page — nothing is
          trapped — and closes on Escape, when a link is followed, and when the
          window grows wide enough for the links.
        </p>
        <app-component-badges path="header" />
      </div>

      <section class="space-y-8">
        <h2 scTypeset appToc>Examples</h2>
        <p class="text-muted-foreground text-sm">
          The header adapts to the viewport, so each example runs in its own
          frame.
        </p>
        <app-basic-header-demo-container />
        <app-mobile-header-demo-container />
        <app-push-header-demo-container />
        <app-navigation-menu-header-demo-container />
        <app-sticky-header-demo-container />
        <app-rtl-header-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class HeaderPage {}
