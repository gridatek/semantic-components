import { Component, ViewEncapsulation } from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { BasicSidebarDemoContainer } from './demos/basic-sidebar-demo-container';
import { FloatingSidebarDemoContainer } from './demos/floating-sidebar-demo-container';
import { IconSidebarDemoContainer } from './demos/icon-sidebar-demo-container';
import { InsetSidebarDemoContainer } from './demos/inset-sidebar-demo-container';
import { RtlSidebarDemoContainer } from './demos/rtl-sidebar-demo-container';
import { SubmenuSidebarDemoContainer } from './demos/submenu-sidebar-demo-container';

@Component({
  selector: 'app-sidebar-page',
  imports: [
    BasicSidebarDemoContainer,
    IconSidebarDemoContainer,
    FloatingSidebarDemoContainer,
    InsetSidebarDemoContainer,
    SubmenuSidebarDemoContainer,
    RtlSidebarDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Sidebar</h1>
        <p class="text-muted-foreground">
          An app's side panel, as shadcn's: beside the page on wide screens —
          collapsed off the screen or to icons — and a sheet on phones. Its
          parts follow shadcn's names; the navigation is the named nav you put
          in it, its header and footer stay outside.
        </p>
        <app-component-badges path="sidebar" />
      </div>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <p class="text-muted-foreground text-sm">
          The sidebar is fixed to the window, so each example runs in its own
          frame.
        </p>
        <app-basic-sidebar-demo-container />
        <app-icon-sidebar-demo-container />
        <app-floating-sidebar-demo-container />
        <app-inset-sidebar-demo-container />
        <app-submenu-sidebar-demo-container />
        <app-rtl-sidebar-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class SidebarPage {}
