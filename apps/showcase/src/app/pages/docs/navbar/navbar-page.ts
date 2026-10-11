import { Component, ViewEncapsulation } from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { BasicNavbarDemoContainer } from './demos/basic-navbar-demo-container';
import { MobileNavbarDemoContainer } from './demos/mobile-navbar-demo-container';

@Component({
  selector: 'app-navbar-page',
  imports: [
    BasicNavbarDemoContainer,
    MobileNavbarDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Navbar</h1>
        <p class="text-muted-foreground">
          A responsive navigation bar with mobile menu support.
        </p>
        <app-component-badges path="navbar" />
      </div>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <p class="text-muted-foreground text-sm">
          The navbar adapts to the viewport, so each example runs in its own
          frame: desktop width first, then a phone.
        </p>
        <app-basic-navbar-demo-container />
        <app-mobile-navbar-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class NavbarPage {}
