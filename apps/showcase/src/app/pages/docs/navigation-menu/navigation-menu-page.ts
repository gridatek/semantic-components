import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScNavigationMenuDemoContainer } from './demos/navigation-menu-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentBadges } from '../../../components/component-badges/component-badges';

import { ScHeading } from '@semantic-components/ui';

@Component({
  selector: 'app-navigation-menu-page',
  imports: [
    ScNavigationMenuDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>NavigationMenu</h1>
        <p class="text-muted-foreground">
          A collection of links for navigating websites with hover-activated
          dropdowns.
        </p>
        <app-component-badges path="navigation-menu" />
      </div>

      <section class="space-y-8">
        <h2 scHeading toc>Examples</h2>
        <app-navigation-menu-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class NavigationMenuPage {}
