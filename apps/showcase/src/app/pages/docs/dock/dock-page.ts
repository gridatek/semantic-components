import { Component, ViewEncapsulation } from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { AppsDockDemoContainer } from './demos/apps-dock-demo-container';
import { NavigationDockDemoContainer } from './demos/navigation-dock-demo-container';
import { PlainDockDemoContainer } from './demos/plain-dock-demo-container';
import { VerticalDockDemoContainer } from './demos/vertical-dock-demo-container';

@Component({
  selector: 'app-dock-page',
  imports: [
    AppsDockDemoContainer,
    NavigationDockDemoContainer,
    VerticalDockDemoContainer,
    PlainDockDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Dock</h1>
        <p class="text-muted-foreground">
          Your links and buttons in a bar, magnified by their distance to the
          pointer — and when focused — with labels, counts, dots and separators.
        </p>
        <app-component-badges path="dock" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Apps</h2>
        <p class="text-muted-foreground">
          A launcher: the items near the pointer grow, their neighbours move
          aside. Dots for open apps, a count on Mail, a separator before the
          bin. From the keyboard, Tab: the focused item grows and shows its
          name.
        </p>
        <app-apps-dock-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Navigation</h2>
        <p class="text-muted-foreground">
          Links in a nav: the current page marked (aria-current), its dot shown.
        </p>
        <app-navigation-dock-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Vertical</h2>
        <p class="text-muted-foreground">
          On a side: items grow outward, their labels beside them.
        </p>
        <app-vertical-dock-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Plain</h2>
        <p class="text-muted-foreground">
          Without magnification: magnification set to 1. Under reduced motion,
          the dock is always so.
        </p>
        <app-plain-dock-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class DockPage {}
