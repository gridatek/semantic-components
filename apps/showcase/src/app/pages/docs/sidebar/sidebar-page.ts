import { Component, ViewEncapsulation } from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { BasicSidebarDemoContainer } from './demos/basic-sidebar-demo-container';
import { FloatingSidebarDemoContainer } from './demos/floating-sidebar-demo-container';
import { IconSidebarDemoContainer } from './demos/icon-sidebar-demo-container';

@Component({
  selector: 'app-sidebar-page',
  imports: [
    BasicSidebarDemoContainer,
    IconSidebarDemoContainer,
    FloatingSidebarDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
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
        <h2 scHeading appToc>Examples</h2>
        <p class="text-muted-foreground text-sm">
          A sidebar lays out the whole page, so each example runs in its own
          frame.
        </p>
        <app-basic-sidebar-demo-container />
        <app-icon-sidebar-demo-container />
        <app-floating-sidebar-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class SidebarPage {}
