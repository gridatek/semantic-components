import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { MenuBarDemoContainer } from './demos/menu-bar-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentBadges } from '../../../components/component-badges/component-badges';

@Component({
  selector: 'app-menu-bar-page',
  imports: [MenuBarDemoContainer, TocHeading, ComponentBadges],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">Menu Bar</h1>
        <p class="text-muted-foreground">
          A horizontal menu bar with keyboard navigation support.
        </p>
        <app-component-badges path="menu-bar" />
      </div>

      <section class="space-y-8">
        <h2 toc class="text-xl font-semibold tracking-tight">Examples</h2>
        <app-menu-bar-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class MenuBarPage {}
