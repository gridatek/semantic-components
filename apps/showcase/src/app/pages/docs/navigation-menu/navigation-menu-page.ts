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
import { AlignNavigationMenuDemoContainer } from './demos/align-navigation-menu-demo-container';
import { NavigationMenuUsageDemoContainer } from './demos/navigation-menu-usage-demo-container';
import { OpenItemNavigationMenuDemoContainer } from './demos/open-item-navigation-menu-demo-container';
import { RtlNavigationMenuDemoContainer } from './demos/rtl-navigation-menu-demo-container';
import { SeparateNavigationMenuDemoContainer } from './demos/separate-navigation-menu-demo-container';

@Component({
  selector: 'app-navigation-menu-page',
  imports: [
    Anatomy,
    NavigationMenuUsageDemoContainer,
    OpenItemNavigationMenuDemoContainer,
    SeparateNavigationMenuDemoContainer,
    AlignNavigationMenuDemoContainer,
    RtlNavigationMenuDemoContainer,
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
        <h1 scHeading>Navigation Menu</h1>
        <p class="text-muted-foreground">
          Site navigation with panels of links: opened by hover, click or
          keyboard, in one box that moves from item to item.
        </p>
        <app-component-badges path="navigation-menu" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-navigation-menu-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Anatomy</h2>
        <p class="text-muted-foreground">
          A named nav and its list of items. An item holds a link, or a trigger
          and its panel — written inside the item, so Tab reaches its links
          right after the trigger.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Accessibility</h2>
        <ul class="text-muted-foreground list-disc space-y-2 ps-6">
          <li>
            A disclosure navigation (WAI-ARIA), not a menu: a nav you name
            (aria-label), triggers with aria-expanded and aria-controls, plain
            links.
          </li>
          <li>
            Tab follows the page: a trigger, then its panel&apos;s links. ← and
            → move between the top-level items (mirrored right to left), Home
            and End too; ↓ goes into the open panel, ↑ and ↓ within it.
          </li>
          <li>
            Escape closes the panel and returns to its trigger; the focus
            leaving it, or a click outside, closes it too.
          </li>
          <li>
            A closed panel is invisible: out of the tab order and of the
            accessibility tree, still in the page for search engines.
          </li>
          <li>
            The link for the page shown is active (aria-current="page"); the
            chevron is hidden from screen readers.
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-open-item-navigation-menu-demo-container />
        <app-separate-navigation-menu-demo-container />
        <app-align-navigation-menu-demo-container />
        <app-rtl-navigation-menu-demo-container />
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
          aria-label="Navigation Menu parts"
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
export default class NavigationMenuPage {
  protected readonly anatomy = {
    imports: [
      'import {',
      '  ScNavigationMenu, ScNavigationMenuList, ScNavigationMenuItem,',
      '  ScNavigationMenuTrigger, ScNavigationMenuTriggerIcon,',
      '  ScNavigationMenuContent, ScNavigationMenuLink,',
      "} from '@semantic-components/ui';",
    ].join('\n'),
    markup: [
      '<nav scNavigationMenu aria-label="…">',
      '  <ul scNavigationMenuList>',
      '    <li scNavigationMenuItem>',
      '      <button scNavigationMenuTrigger>',
      '        … <svg siChevronDownIcon scNavigationMenuTriggerIcon></svg>',
      '      </button>',
      '      <div scNavigationMenuContent>',
      '        <a scNavigationMenuLink routerLink="…">…</a>',
      '      </div>',
      '    </li>',
      '    <li scNavigationMenuItem>',
      '      <a scNavigationMenuLink routerLink="…">…</a>',
      '    </li>',
      '  </ul>',
      '</nav>',
    ].join('\n'),
  };

  protected readonly parts = [
    {
      name: 'ScNavigationMenu',
      selector: 'nav[scNavigationMenu]',
      description:
        "The navigation. [(value)] (the open item's value, or null); delay and closeDelay (ms, 50); viewport (one shared box that moves between items, default; false: each panel its own); align ('start', 'center', 'end'): where panels line up under their trigger.",
    },
    {
      name: 'ScNavigationMenuList',
      selector: 'ul[scNavigationMenuList]',
      description: 'The top-level items, in a row.',
    },
    {
      name: 'ScNavigationMenuItem',
      selector: 'li[scNavigationMenuItem]',
      description:
        'A top-level item: a link, or a trigger and its panel. value: its name in the menu’s value (one is made up if left out).',
    },
    {
      name: 'ScNavigationMenuTrigger',
      selector: 'button[scNavigationMenuTrigger]',
      description:
        "Opens its item's panel on hover or press: the preset's trigger, aria-expanded and aria-controls.",
    },
    {
      name: 'ScNavigationMenuTriggerIcon',
      selector: 'svg[scNavigationMenuTriggerIcon]',
      description:
        'Your chevron after the trigger’s text: turned over while open, hidden from screen readers.',
    },
    {
      name: 'ScNavigationMenuContent',
      selector: 'div[scNavigationMenuContent]',
      description:
        "The panel, after its trigger: the preset's padding; always in the page, invisible while closed; slides in from the side you came from. Lay out its inside as you like.",
    },
    {
      name: 'ScNavigationMenuLink',
      selector: 'a[scNavigationMenuLink]',
      description:
        'A link: the trigger\'s look at the top level, the preset\'s link in a panel. active (aria-current="page"); closeOnClick (true): following it closes the menu.',
    },
  ];
}
