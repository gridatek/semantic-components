import { Component, ViewEncapsulation } from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { BasicNavbarNextDemoContainer } from './demos/basic-navbar-next-demo-container';
import { MobileNavbarNextDemoContainer } from './demos/mobile-navbar-next-demo-container';
import { NavigationMenuNavbarNextDemoContainer } from './demos/navigation-menu-navbar-next-demo-container';
import { OverlayNavbarNextDemoContainer } from './demos/overlay-navbar-next-demo-container';
import { RtlNavbarNextDemoContainer } from './demos/rtl-navbar-next-demo-container';
import { StickyNavbarNextDemoContainer } from './demos/sticky-navbar-next-demo-container';

@Component({
  selector: 'app-navbar-next-page',
  imports: [
    BasicNavbarNextDemoContainer,
    MobileNavbarNextDemoContainer,
    OverlayNavbarNextDemoContainer,
    NavigationMenuNavbarNextDemoContainer,
    StickyNavbarNextDemoContainer,
    RtlNavbarNextDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Navbar Next</h1>
        <p class="text-muted-foreground">
          A site's top bar: brand, links and actions; on narrow screens a toggle
          opens a menu under the bar. The menu is part of the page — nothing is
          trapped — and closes on Escape, when a link is followed, and when the
          window grows wide enough for the links.
        </p>
        <app-component-badges path="navbar-next" />
      </div>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <p class="text-muted-foreground text-sm">
          The navbar adapts to the viewport, so each example runs in its own
          frame.
        </p>
        <app-basic-navbar-next-demo-container />
        <app-mobile-navbar-next-demo-container />
        <app-overlay-navbar-next-demo-container />
        <app-navigation-menu-navbar-next-demo-container />
        <app-sticky-navbar-next-demo-container />
        <app-rtl-navbar-next-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class NavbarNextPage {}
