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
import { CollapsibleGroupSidebarNextDemoContainer } from './demos/collapsible-group-sidebar-next-demo-container';
import { CollapsibleMenuSidebarNextDemoContainer } from './demos/collapsible-menu-sidebar-next-demo-container';
import { ControlledSidebarNextDemoContainer } from './demos/controlled-sidebar-next-demo-container';
import { FloatingSidebarNextDemoContainer } from './demos/floating-sidebar-next-demo-container';
import { FooterSidebarNextDemoContainer } from './demos/footer-sidebar-next-demo-container';
import { GroupActionSidebarNextDemoContainer } from './demos/group-action-sidebar-next-demo-container';
import { GroupSidebarNextDemoContainer } from './demos/group-sidebar-next-demo-container';
import { HeaderSidebarNextDemoContainer } from './demos/header-sidebar-next-demo-container';
import { IconSidebarNextDemoContainer } from './demos/icon-sidebar-next-demo-container';
import { InsetSidebarNextDemoContainer } from './demos/inset-sidebar-next-demo-container';
import { MenuActionSidebarNextDemoContainer } from './demos/menu-action-sidebar-next-demo-container';
import { MenuBadgeSidebarNextDemoContainer } from './demos/menu-badge-sidebar-next-demo-container';
import { MenuSidebarNextDemoContainer } from './demos/menu-sidebar-next-demo-container';
import { RtlSidebarNextDemoContainer } from './demos/rtl-sidebar-next-demo-container';
import { SidebarNextUsageDemoContainer } from './demos/sidebar-next-usage-demo-container';
import { SkeletonSidebarNextDemoContainer } from './demos/skeleton-sidebar-next-demo-container';
import { SubMenuSidebarNextDemoContainer } from './demos/sub-menu-sidebar-next-demo-container';

@Component({
  selector: 'app-sidebar-next-page',
  imports: [
    Anatomy,
    SidebarNextUsageDemoContainer,
    HeaderSidebarNextDemoContainer,
    FooterSidebarNextDemoContainer,
    GroupSidebarNextDemoContainer,
    CollapsibleGroupSidebarNextDemoContainer,
    GroupActionSidebarNextDemoContainer,
    MenuSidebarNextDemoContainer,
    MenuActionSidebarNextDemoContainer,
    SubMenuSidebarNextDemoContainer,
    CollapsibleMenuSidebarNextDemoContainer,
    MenuBadgeSidebarNextDemoContainer,
    SkeletonSidebarNextDemoContainer,
    ControlledSidebarNextDemoContainer,
    IconSidebarNextDemoContainer,
    FloatingSidebarNextDemoContainer,
    InsetSidebarNextDemoContainer,
    RtlSidebarNextDemoContainer,
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
        <h1 scHeading>Sidebar Next</h1>
        <p class="text-muted-foreground">
          A sidebar beside the page: it collapses, to icons or off the screen,
          and is a sheet on phones.
        </p>
        <app-component-badges path="sidebar-next" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-sidebar-next-usage-demo-container />
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
        <app-header-sidebar-next-demo-container />
        <app-footer-sidebar-next-demo-container />
        <app-group-sidebar-next-demo-container />
        <app-collapsible-group-sidebar-next-demo-container />
        <app-group-action-sidebar-next-demo-container />
        <app-menu-sidebar-next-demo-container />
        <app-menu-action-sidebar-next-demo-container />
        <app-sub-menu-sidebar-next-demo-container />
        <app-collapsible-menu-sidebar-next-demo-container />
        <app-menu-badge-sidebar-next-demo-container />
        <app-skeleton-sidebar-next-demo-container />
        <app-controlled-sidebar-next-demo-container />
        <app-icon-sidebar-next-demo-container />
        <app-floating-sidebar-next-demo-container />
        <app-inset-sidebar-next-demo-container />
        <app-rtl-sidebar-next-demo-container />
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
export default class SidebarNextPage {
  protected readonly anatomy = {
    imports: [
      'import {',
      '  ScSidebarNextProvider, ScSidebarNext, ScSidebarNextInset, ScSidebarNextTrigger, ScSidebarNextRail,',
      '  ScSidebarNextHeader, ScSidebarNextContent, ScSidebarNextFooter, ScSidebarNextSeparator, ScSidebarNextInput,',
      '  ScSidebarNextGroup, ScSidebarNextGroupLabel, ScSidebarNextGroupAction, ScSidebarNextGroupContent,',
      '  ScSidebarNextMenu, ScSidebarNextMenuItem, ScSidebarNextMenuButton, ScSidebarNextMenuAction,',
      '  ScSidebarNextMenuBadge, ScSidebarNextMenuSkeleton,',
      '  ScSidebarNextMenuSub, ScSidebarNextMenuSubItem, ScSidebarNextMenuSubButton,',
      "} from '@semantic-components/ui';",
    ].join('\n'),
    markup: [
      '<div scSidebarNextProvider>',
      '  <aside scSidebarNext aria-label="…">',
      '    <div scSidebarNextHeader>…</div>',
      '    <nav scSidebarNextContent aria-label="…">',
      '      <div scSidebarNextGroup>',
      '        <div scSidebarNextGroupLabel>…</div>',
      '        <button scSidebarNextGroupAction>…</button>',
      '        <div scSidebarNextGroupContent>',
      '          <ul scSidebarNextMenu>',
      '            <li scSidebarNextMenuItem>',
      '              <a scSidebarNextMenuButton href="…" tooltip="…">…</a>',
      '              <button scSidebarNextMenuAction>…</button>',
      '              <div scSidebarNextMenuBadge>…</div>',
      '              <ul scSidebarNextMenuSub>',
      '                <li scSidebarNextMenuSubItem>',
      '                  <a scSidebarNextMenuSubButton href="…">…</a>',
      '                </li>',
      '              </ul>',
      '            </li>',
      '          </ul>',
      '        </div>',
      '      </div>',
      '    </nav>',
      '    <div scSidebarNextFooter>…</div>',
      '    <button scSidebarNextRail></button>',
      '  </aside>',
      '  <main scSidebarNextInset>',
      '    <button scSidebarNextTrigger>…</button>',
      '  </main>',
      '</div>',
    ].join('\n'),
  };

  protected readonly parts = [
    {
      name: 'ScSidebarNextProvider',
      selector: 'div[scSidebarNextProvider]',
      description:
        "Round the sidebar and the page: [(open)] (wide screens), storageKey (where the state is kept, a cookie and localStorage; null keeps nothing), shortcut (with Ctrl or ⌘; 'b', null for none). exportAs scSidebarNextProvider: state.",
    },
    {
      name: 'ScSidebarNext',
      selector: 'aside[scSidebarNext], div[scSidebarNext]',
      description:
        "The sidebar. side ('start', 'end'), variant ('sidebar', 'floating', 'inset'), collapsible ('offcanvas', 'icon', 'none'); aria-label names the aside, and the sheet on phones.",
    },
    {
      name: 'ScSidebarNextInset',
      selector: 'main[scSidebarNextInset]',
      description:
        'The page beside the sidebar; a raised card with the inset variant.',
    },
    {
      name: 'ScSidebarNextTrigger',
      selector: 'button[scSidebarNextTrigger]',
      description:
        "Opens and closes the sidebar (the sheet on phones): the preset's button (ghost, icon-sm; variant, size), aria-expanded, aria-controls. Write its icon and its name.",
    },
    {
      name: 'ScSidebarNextRail',
      selector: 'button[scSidebarNextRail]',
      description:
        "The sidebar's edge, for the pointer: a click opens or closes it.",
    },
    {
      name: 'ScSidebarNextHeader, ScSidebarNextFooter',
      selector: 'div[…]',
      description: 'They stay at the top and the bottom.',
    },
    {
      name: 'ScSidebarNextContent',
      selector: 'nav[scSidebarNextContent], div[scSidebarNextContent]',
      description:
        'The part that scrolls, between them; its scrollbar shown (hideScrollbar hides it, as shadcn).',
    },
    {
      name: 'ScSidebarNextSeparator, ScSidebarNextInput',
      selector: 'div[…], input[…]',
      description: 'A line between sections; a search input in the sidebar.',
    },
    {
      name: 'ScSidebarNextGroup, ScSidebarNextGroupLabel, ScSidebarNextGroupAction, ScSidebarNextGroupContent',
      selector: 'div[…], div|button[…Label], button[…Action], div[…]',
      description:
        'A group: its label (a button when it is a Collapsible trigger), a button at its end (name it), its content.',
    },
    {
      name: 'ScSidebarNextMenu, ScSidebarNextMenuItem',
      selector: 'ul[…], li[…]',
      description: 'A list of items.',
    },
    {
      name: 'ScSidebarNextMenuButton',
      selector: 'a[scSidebarNextMenuButton], button[scSidebarNextMenuButton]',
      description:
        "An item's link or button: your icon, then its text in a span. active (aria-current=\"page\"), variant ('default', 'outline'), size ('default', 'sm', 'lg'), tooltip (its name, shown while collapsed to icons).",
    },
    {
      name: 'ScSidebarNextMenuAction, ScSidebarNextMenuBadge',
      selector: 'button[…], div[…]',
      description:
        "At an item's end: a button (showOnHover; name it), or a count.",
    },
    {
      name: 'ScSidebarNextMenuSkeleton',
      selector: 'div[scSidebarNextMenuSkeleton]',
      description: 'A row shown while the menu loads; showIcon.',
    },
    {
      name: 'ScSidebarNextMenuSub, ScSidebarNextMenuSubItem, ScSidebarNextMenuSubButton',
      selector: 'ul[…], li[…], a|button[…]',
      description:
        "A list under an item, its items and their links: active, size ('sm', 'md').",
    },
  ];
}
