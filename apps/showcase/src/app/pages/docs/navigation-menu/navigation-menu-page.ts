import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScNavigationMenuDemoContainer } from './demos/navigation-menu-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentStatusBadge } from '../../../components/component-status-badge/component-status-badge';
import { COMPONENTS } from '../../../data/components';

@Component({
  selector: 'app-navigation-menu-page',
  imports: [ScNavigationMenuDemoContainer, TocHeading, ComponentStatusBadge],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">NavigationMenu</h1>
        <p class="text-muted-foreground">
          A collection of links for navigating websites with hover-activated
          dropdowns.
        </p>
        <app-component-status-badge [status]="componentStatus" />
      </div>

      <section class="space-y-8">
        <h2 toc class="text-xl font-semibold tracking-tight">Examples</h2>
        <app-navigation-menu-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class NavigationMenuPage {
  readonly componentStatus = COMPONENTS.find(
    (c) => c.path === 'navigation-menu',
  )!.status;
}
