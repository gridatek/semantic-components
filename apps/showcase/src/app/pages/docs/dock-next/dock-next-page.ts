import { Component, ViewEncapsulation } from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { AppsDockNextDemoContainer } from './demos/apps-dock-next-demo-container';
import { NavigationDockNextDemoContainer } from './demos/navigation-dock-next-demo-container';
import { PlainDockNextDemoContainer } from './demos/plain-dock-next-demo-container';
import { VerticalDockNextDemoContainer } from './demos/vertical-dock-next-demo-container';

@Component({
  selector: 'app-dock-next-page',
  imports: [
    AppsDockNextDemoContainer,
    NavigationDockNextDemoContainer,
    VerticalDockNextDemoContainer,
    PlainDockNextDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Dock Next</h1>
        <p class="text-muted-foreground">
          The dock, rebuilt: your links and buttons in a bar, magnified by their
          distance to the pointer — and when focused — with labels, counts, dots
          and separators.
        </p>
        <app-component-badges path="dock-next" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Apps</h2>
        <p class="text-muted-foreground">
          A launcher: the items near the pointer grow, their neighbours move
          aside. Dots for open apps, a count on Mail, a separator before the
          bin. From the keyboard, Tab: the focused item grows and shows its
          name.
        </p>
        <app-apps-dock-next-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Navigation</h2>
        <p class="text-muted-foreground">
          Links in a nav: the current page marked (aria-current), its dot shown.
        </p>
        <app-navigation-dock-next-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Vertical</h2>
        <p class="text-muted-foreground">
          On a side: items grow outward, their labels beside them.
        </p>
        <app-vertical-dock-next-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Plain</h2>
        <p class="text-muted-foreground">
          Without magnification: magnification set to 1. Under reduced motion,
          the dock is always so.
        </p>
        <app-plain-dock-next-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class DockNextPage {}
