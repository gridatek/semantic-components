import { Component, ViewEncapsulation } from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { BasicNavigationMenuDemoContainer } from './demos/basic-navigation-menu-demo-container';
import { ControlledNavigationMenuDemoContainer } from './demos/controlled-navigation-menu-demo-container';
import { RtlNavigationMenuDemoContainer } from './demos/rtl-navigation-menu-demo-container';
import { SeparateNavigationMenuDemoContainer } from './demos/separate-navigation-menu-demo-container';

@Component({
  selector: 'app-navigation-menu-page',
  imports: [
    BasicNavigationMenuDemoContainer,
    SeparateNavigationMenuDemoContainer,
    ControlledNavigationMenuDemoContainer,
    RtlNavigationMenuDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Navigation Menu</h1>
        <p class="text-muted-foreground">
          Site navigation with panels: a trigger opens its item's panel on
          hover, click, Enter or Space, and the panels share one box that moves
          from item to item. Tab follows the page — a trigger, then its links;
          the arrow keys move between the items, Escape closes.
        </p>
        <app-component-badges path="navigation-menu" />
      </div>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-basic-navigation-menu-demo-container />
        <app-separate-navigation-menu-demo-container />
        <app-controlled-navigation-menu-demo-container />
        <app-rtl-navigation-menu-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class NavigationMenuPage {}
