import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';

@Component({
  selector: 'app-sidebar-page',
  imports: [TocHeading, ComponentBadges, ScHeading],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Sidebar</h1>
        <p class="text-muted-foreground">
          A composable, themeable and customizable sidebar component.
        </p>
        <app-component-badges path="sidebar" />
      </div>

      <section class="space-y-8">
        <h2 scHeading toc>Examples</h2>
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SidebarPage {}
