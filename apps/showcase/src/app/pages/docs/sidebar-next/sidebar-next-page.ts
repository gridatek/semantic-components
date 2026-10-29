import { Component, ViewEncapsulation } from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { BasicSidebarNextDemoContainer } from './demos/basic-sidebar-next-demo-container';
import { FloatingSidebarNextDemoContainer } from './demos/floating-sidebar-next-demo-container';
import { IconSidebarNextDemoContainer } from './demos/icon-sidebar-next-demo-container';
import { InsetSidebarNextDemoContainer } from './demos/inset-sidebar-next-demo-container';
import { RtlSidebarNextDemoContainer } from './demos/rtl-sidebar-next-demo-container';
import { SubmenuSidebarNextDemoContainer } from './demos/submenu-sidebar-next-demo-container';

@Component({
  selector: 'app-sidebar-next-page',
  imports: [
    BasicSidebarNextDemoContainer,
    IconSidebarNextDemoContainer,
    FloatingSidebarNextDemoContainer,
    InsetSidebarNextDemoContainer,
    SubmenuSidebarNextDemoContainer,
    RtlSidebarNextDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Sidebar Next</h1>
        <p class="text-muted-foreground">
          An app's side panel, as shadcn's: beside the page on wide screens —
          collapsed off the screen or to icons — and a sheet on phones. Its
          parts follow shadcn's names; the navigation is the named nav you put
          in it, its header and footer stay outside.
        </p>
        <app-component-badges path="sidebar-next" />
      </div>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <p class="text-muted-foreground text-sm">
          The sidebar is fixed to the window, so each example runs in its own
          frame.
        </p>
        <app-basic-sidebar-next-demo-container />
        <app-icon-sidebar-next-demo-container />
        <app-floating-sidebar-next-demo-container />
        <app-inset-sidebar-next-demo-container />
        <app-submenu-sidebar-next-demo-container />
        <app-rtl-sidebar-next-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class SidebarNextPage {}
