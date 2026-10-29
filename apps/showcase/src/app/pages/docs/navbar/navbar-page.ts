import { Component, ViewEncapsulation } from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { BasicNavbarDemoContainer } from './demos/basic-navbar-demo-container';
import { MobileNavbarDemoContainer } from './demos/mobile-navbar-demo-container';
import { NavigationMenuNavbarDemoContainer } from './demos/navigation-menu-navbar-demo-container';
import { OverlayNavbarDemoContainer } from './demos/overlay-navbar-demo-container';
import { RtlNavbarDemoContainer } from './demos/rtl-navbar-demo-container';
import { StickyNavbarDemoContainer } from './demos/sticky-navbar-demo-container';

@Component({
  selector: 'app-navbar-page',
  imports: [
    BasicNavbarDemoContainer,
    MobileNavbarDemoContainer,
    OverlayNavbarDemoContainer,
    NavigationMenuNavbarDemoContainer,
    StickyNavbarDemoContainer,
    RtlNavbarDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Navbar</h1>
        <p class="text-muted-foreground">
          A site's top bar: brand, links and actions; on narrow screens a toggle
          opens a menu under the bar. The menu is part of the page — nothing is
          trapped — and closes on Escape, when a link is followed, and when the
          window grows wide enough for the links.
        </p>
        <app-component-badges path="navbar" />
      </div>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <p class="text-muted-foreground text-sm">
          The navbar adapts to the viewport, so each example runs in its own
          frame.
        </p>
        <app-basic-navbar-demo-container />
        <app-mobile-navbar-demo-container />
        <app-overlay-navbar-demo-container />
        <app-navigation-menu-navbar-demo-container />
        <app-sticky-navbar-demo-container />
        <app-rtl-navbar-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class NavbarPage {}
