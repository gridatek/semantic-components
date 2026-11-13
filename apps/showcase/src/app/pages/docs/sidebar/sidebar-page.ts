import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScHeading,
  ScTable,
  ScTableBody,
  ScTableCell,
  ScTableContainer,
  ScTableHeader,
  ScTableHeaderCell,
  ScTableRow,
} from '@semantic-components/ui';
import { Anatomy } from '../../../components/anatomy/anatomy';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { CollapsibleGroupSidebarDemoContainer } from './demos/collapsible-group-sidebar-demo-container';
import { CollapsibleMenuSidebarDemoContainer } from './demos/collapsible-menu-sidebar-demo-container';
import { ControlledSidebarDemoContainer } from './demos/controlled-sidebar-demo-container';
import { FloatingSidebarDemoContainer } from './demos/floating-sidebar-demo-container';
import { FooterSidebarDemoContainer } from './demos/footer-sidebar-demo-container';
import { GroupActionSidebarDemoContainer } from './demos/group-action-sidebar-demo-container';
import { GroupSidebarDemoContainer } from './demos/group-sidebar-demo-container';
import { HeaderSidebarDemoContainer } from './demos/header-sidebar-demo-container';
import { IconSidebarDemoContainer } from './demos/icon-sidebar-demo-container';
import { InsetSidebarDemoContainer } from './demos/inset-sidebar-demo-container';
import { MenuActionSidebarDemoContainer } from './demos/menu-action-sidebar-demo-container';
import { MenuBadgeSidebarDemoContainer } from './demos/menu-badge-sidebar-demo-container';
import { MenuSidebarDemoContainer } from './demos/menu-sidebar-demo-container';
import { RtlSidebarDemoContainer } from './demos/rtl-sidebar-demo-container';
import { SidebarUsageDemoContainer } from './demos/sidebar-usage-demo-container';
import { SkeletonSidebarDemoContainer } from './demos/skeleton-sidebar-demo-container';
import { SubMenuSidebarDemoContainer } from './demos/sub-menu-sidebar-demo-container';

@Component({
  selector: 'app-sidebar-page',
  imports: [
    Anatomy,
    SidebarUsageDemoContainer,
    HeaderSidebarDemoContainer,
    FooterSidebarDemoContainer,
    GroupSidebarDemoContainer,
    CollapsibleGroupSidebarDemoContainer,
    GroupActionSidebarDemoContainer,
    MenuSidebarDemoContainer,
    MenuActionSidebarDemoContainer,
    SubMenuSidebarDemoContainer,
    CollapsibleMenuSidebarDemoContainer,
    MenuBadgeSidebarDemoContainer,
    SkeletonSidebarDemoContainer,
    ControlledSidebarDemoContainer,
    IconSidebarDemoContainer,
    FloatingSidebarDemoContainer,
    InsetSidebarDemoContainer,
    RtlSidebarDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
    ScTable,
    ScTableBody,
    ScTableCell,
    ScTableContainer,
    ScTableHeader,
    ScTableHeaderCell,
    ScTableRow,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Sidebar</h1>
        <p class="text-muted-foreground">
          A sidebar beside the page: it collapses, to icons or off the screen,
          and is a sheet on phones.
        </p>
        <app-component-badges path="sidebar" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-sidebar-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Anatomy</h2>
        <p class="text-muted-foreground">
          shadcn&apos;s Sidebar, in the look of the app&apos;s preset. A
          provider round the sidebar and the page beside it holds their shared
          state. The sidebar has a header and a footer that stay, and a content
          that scrolls between them: groups, each with a label and a menu of
          items.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Accessibility</h2>
        <ul class="text-muted-foreground list-disc space-y-2 ps-6">
          <li>
            On an aside, the sidebar is a landmark holding its header, its
            navigation and its footer: name it (aria-label), and name the nav
            inside it. On a div it is none; only your nav is.
          </li>
          <li>
            The trigger says whether the sidebar is open (aria-expanded) and
            which one (aria-controls): write its icon and its name. Ctrl or ⌘ +
            B opens and closes it too (the provider&apos;s shortcut).
          </li>
          <li>
            The rail, its edge, is for the pointer only: out of the tab order
            and hidden from screen readers.
          </li>
          <li>
            On a phone it is a sheet: a dialog named by the sidebar&apos;s
            aria-label, focus kept inside, closed by Escape or by following a
            link.
          </li>
          <li>
            The page shown is marked on its link (active: aria-current).
            Collapsed to icons, a button keeps its text as its name, and its
            tooltip shows it on hover and focus.
          </li>
          <li>
            The content shows its scrollbar when it has more than fits
            (hideScrollbar hides it).
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <p class="text-muted-foreground">
          Each example is a page of its own, shown in a frame.
        </p>
        <app-header-sidebar-demo-container />
        <app-footer-sidebar-demo-container />
        <app-group-sidebar-demo-container />
        <app-collapsible-group-sidebar-demo-container />
        <app-group-action-sidebar-demo-container />
        <app-menu-sidebar-demo-container />
        <app-menu-action-sidebar-demo-container />
        <app-sub-menu-sidebar-demo-container />
        <app-collapsible-menu-sidebar-demo-container />
        <app-menu-badge-sidebar-demo-container />
        <app-skeleton-sidebar-demo-container />
        <app-controlled-sidebar-demo-container />
        <app-icon-sidebar-demo-container />
        <app-floating-sidebar-demo-container />
        <app-inset-sidebar-demo-container />
        <app-rtl-sidebar-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>API reference</h2>
        <p class="text-muted-foreground">
          Each part takes
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">class</code>,
          merged over the preset (cn: a later class wins).
        </p>
        <div
          scTableContainer
          tabindex="0"
          role="region"
          aria-label="Sidebar parts"
        >
          <table scTable>
            <thead scTableHeader>
              <tr scTableRow>
                <th scTableHeaderCell>Part</th>
                <th scTableHeaderCell>Selector</th>
                <th scTableHeaderCell>Description</th>
              </tr>
            </thead>
            <tbody scTableBody>
              @for (part of parts; track part.name) {
                <tr scTableRow>
                  <td scTableCell>
                    <code class="font-mono text-sm">{{ part.name }}</code>
                  </td>
                  <td scTableCell>
                    <code class="font-mono text-sm">{{ part.selector }}</code>
                  </td>
                  <td
                    scTableCell
                    class="text-muted-foreground whitespace-normal"
                  >
                    {{ part.description }}
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class SidebarPage {
  protected readonly anatomy = {
    imports: [
      'import {',
      '  ScSidebarProvider, ScSidebar, ScSidebarInset, ScSidebarTrigger, ScSidebarRail,',
      '  ScSidebarHeader, ScSidebarContent, ScSidebarFooter, ScSidebarSeparator, ScSidebarInput,',
      '  ScSidebarGroup, ScSidebarGroupLabel, ScSidebarGroupAction, ScSidebarGroupContent,',
      '  ScSidebarMenu, ScSidebarMenuItem, ScSidebarMenuButton, ScSidebarMenuAction,',
      '  ScSidebarMenuBadge, ScSidebarMenuSkeleton,',
      '  ScSidebarMenuSub, ScSidebarMenuSubItem, ScSidebarMenuSubButton,',
      "} from '@semantic-components/ui';",
    ].join('\n'),
    markup: [
      '<div scSidebarProvider>',
      '  <aside scSidebar aria-label="…">',
      '    <div scSidebarHeader>…</div>',
      '    <nav scSidebarContent aria-label="…">',
      '      <div scSidebarGroup>',
      '        <div scSidebarGroupLabel>…</div>',
      '        <button scSidebarGroupAction>…</button>',
      '        <div scSidebarGroupContent>',
      '          <ul scSidebarMenu>',
      '            <li scSidebarMenuItem>',
      '              <a scSidebarMenuButton href="…" tooltip="…">…</a>',
      '              <button scSidebarMenuAction>…</button>',
      '              <div scSidebarMenuBadge>…</div>',
      '              <ul scSidebarMenuSub>',
      '                <li scSidebarMenuSubItem>',
      '                  <a scSidebarMenuSubButton href="…">…</a>',
      '                </li>',
      '              </ul>',
      '            </li>',
      '          </ul>',
      '        </div>',
      '      </div>',
      '    </nav>',
      '    <div scSidebarFooter>…</div>',
      '    <button scSidebarRail></button>',
      '  </aside>',
      '  <main scSidebarInset>',
      '    <button scSidebarTrigger>…</button>',
      '  </main>',
      '</div>',
    ].join('\n'),
  };

  protected readonly parts = [
    {
      name: 'ScSidebarProvider',
      selector: 'div[scSidebarProvider]',
      description:
        "Round the sidebar and the page: [(open)] (wide screens), storageKey (where the state is kept, a cookie and localStorage; null keeps nothing), shortcut (with Ctrl or ⌘; 'b', null for none). exportAs scSidebarProvider: state.",
    },
    {
      name: 'ScSidebar',
      selector: 'aside[scSidebar], div[scSidebar]',
      description:
        "The sidebar. side ('inline-start' default, 'inline-end'; or 'left', 'right', which stay put), variant ('sidebar', 'floating', 'inset'), collapsible ('offcanvas', 'icon', 'none'); aria-label names the aside, and the sheet on phones.",
    },
    {
      name: 'ScSidebarInset',
      selector: 'main[scSidebarInset]',
      description:
        'The page beside the sidebar; a raised card with the inset variant.',
    },
    {
      name: 'ScSidebarTrigger',
      selector: 'button[scSidebarTrigger]',
      description:
        "Opens and closes the sidebar (the sheet on phones): the preset's button (ghost, icon-sm; variant, size), aria-expanded, aria-controls. Write its icon and its name.",
    },
    {
      name: 'ScSidebarRail',
      selector: 'button[scSidebarRail]',
      description:
        "The sidebar's edge, for the pointer: a click opens or closes it.",
    },
    {
      name: 'ScSidebarHeader, ScSidebarFooter',
      selector: 'div[…]',
      description: 'They stay at the top and the bottom.',
    },
    {
      name: 'ScSidebarContent',
      selector: 'nav[scSidebarContent], div[scSidebarContent]',
      description:
        'The part that scrolls, between them; its scrollbar shown (hideScrollbar hides it, as shadcn).',
    },
    {
      name: 'ScSidebarSeparator, ScSidebarInput',
      selector: 'div[…], input[…]',
      description: 'A line between sections; a search input in the sidebar.',
    },
    {
      name: 'ScSidebarGroup, ScSidebarGroupLabel, ScSidebarGroupAction, ScSidebarGroupContent',
      selector: 'div[…], div|button[…Label], button[…Action], div[…]',
      description:
        'A group: its label (a button when it is a Collapsible trigger), a button at its end (name it), its content.',
    },
    {
      name: 'ScSidebarMenu, ScSidebarMenuItem',
      selector: 'ul[…], li[…]',
      description: 'A list of items.',
    },
    {
      name: 'ScSidebarMenuButton',
      selector: 'a[scSidebarMenuButton], button[scSidebarMenuButton]',
      description:
        "An item's link or button: your icon, then its text in a span. active (aria-current=\"page\"), variant ('default', 'outline'), size ('default', 'sm', 'lg'), tooltip (its name, shown while collapsed to icons).",
    },
    {
      name: 'ScSidebarMenuAction, ScSidebarMenuBadge',
      selector: 'button[…], div[…]',
      description:
        "At an item's end: a button (showOnHover; name it), or a count.",
    },
    {
      name: 'ScSidebarMenuSkeleton',
      selector: 'div[scSidebarMenuSkeleton]',
      description: 'A row shown while the menu loads; showIcon.',
    },
    {
      name: 'ScSidebarMenuSub, ScSidebarMenuSubItem, ScSidebarMenuSubButton',
      selector: 'ul[…], li[…], a|button[…]',
      description:
        "A list under an item, its items and their links: active, size ('sm', 'md').",
    },
  ];
}
