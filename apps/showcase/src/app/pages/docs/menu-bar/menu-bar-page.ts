import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { MenuBarDemoContainer } from './demos/menu-bar-demo-container';

@Component({
  selector: 'app-menu-bar-page',
  imports: [MenuBarDemoContainer, TocHeading, ComponentBadges, ScHeading],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Menu Bar</h1>
        <p class="text-muted-foreground">
          A horizontal menu bar with keyboard navigation support.
        </p>
        <app-component-badges path="menu-bar" />
      </div>

      <section class="space-y-8">
        <h2 scHeading toc>Examples</h2>
        <app-menu-bar-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class MenuBarPage {}
