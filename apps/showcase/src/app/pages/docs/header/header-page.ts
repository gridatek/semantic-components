import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScTable,
  ScTableBody,
  ScTableCell,
  ScTableContainer,
  ScTableHeader,
  ScTableHeaderCell,
  ScTableRow,
  ScTypeset,
} from '@semantic-components/ui';
import { Anatomy } from '../../../components/anatomy/anatomy';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { BasicHeaderDemoContainer } from './demos/basic-header-demo-container';
import { HeaderUsageDemoContainer } from './demos/header-usage-demo-container';
import { MobileHeaderDemoContainer } from './demos/mobile-header-demo-container';
import { NavigationMenuHeaderDemoContainer } from './demos/navigation-menu-header-demo-container';
import { PushHeaderDemoContainer } from './demos/push-header-demo-container';
import { RtlHeaderDemoContainer } from './demos/rtl-header-demo-container';
import { StickyHeaderDemoContainer } from './demos/sticky-header-demo-container';

@Component({
  selector: 'app-header-page',
  imports: [
    Anatomy,
    HeaderUsageDemoContainer,
    BasicHeaderDemoContainer,
    MobileHeaderDemoContainer,
    PushHeaderDemoContainer,
    NavigationMenuHeaderDemoContainer,
    StickyHeaderDemoContainer,
    RtlHeaderDemoContainer,
    TocHeading,
    ComponentBadges,
    ScTypeset,
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
        <h1 scTypeset>Header</h1>
        <p class="text-muted-foreground">
          A site&apos;s top bar, the page&apos;s banner: your brand, the
          Navigation Menu&apos;s links and your actions; on narrow screens a
          toggle and a menu that covers the page below the bar. It can stay at
          the top, or slide away as the page scrolls. For an app&apos;s
          navigation beside the page, use a Sidebar.
        </p>
        <app-component-badges path="header" />
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Usage</h2>
        <app-header-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Anatomy</h2>
        <p class="text-muted-foreground">
          The bar holds your brand and your actions — your own markup, laid out
          as you like — the links — a Navigation Menu, shown from the expand
          width up — your actions, and below that width a toggle and the menu.
          The menu is an ng-template: the header renders it while it is open,
          and removes it on closing.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Accessibility</h2>
        <ul class="text-muted-foreground list-disc space-y-2 ps-6">
          <li>
            The bar is the page&apos;s banner landmark (a header element); name
            it with aria-label only if the page has more than one.
          </li>
          <li>
            Name both navs (aria-label): the links and the menu&apos;s. Only one
            of them is in the page at a time, so they can share a name.
          </li>
          <li>
            The toggle is a disclosure: aria-expanded, and aria-controls while
            the menu is open. Its name follows the state — &quot;Open
            menu&quot;, &quot;Close menu&quot; — in a sr-only span beside your
            icons.
          </li>
          <li>
            Not modal: nothing is trapped. Escape closes the menu and gives the
            focus back to the toggle; following a link, or the focus leaving the
            bar, closes it too.
          </li>
          <li>
            With reduced motion, nothing animates: the menu and the
            toggle&apos;s icons change at once.
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scTypeset appToc>Examples</h2>
        <p class="text-muted-foreground text-sm">
          The header adapts to the viewport, so each example runs in its own
          frame.
        </p>
        <app-basic-header-demo-container />
        <app-mobile-header-demo-container />
        <app-push-header-demo-container />
        <app-navigation-menu-header-demo-container />
        <app-sticky-header-demo-container />
        <app-rtl-header-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>API reference</h2>
        <p class="text-muted-foreground">
          Each part takes
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">class</code>,
          merged over its own (cn: a later class wins); the menu&apos;s goes to
          the panel the header renders.
        </p>
        <div
          scTableContainer
          tabindex="0"
          role="region"
          aria-label="Header parts"
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
export default class HeaderPage {
  private readonly anatomy = {
    imports:
      "import { ScHeader, ScHeaderMobileMenuContent, ScHeaderMenuLink, ScHeaderToggle, ScNavigationMenu, ScNavigationMenuItem, ScNavigationMenuLink, ScNavigationMenuList } from '@semantic-components/ui';",
    markup: [
      '<header scHeader #header="scHeader">',
      '  <a href="/">…</a>  <!-- your brand: your own link -->',
      '',
      '  <!-- The links: a Navigation Menu, from the expand width up -->',
      '  <nav scNavigationMenu aria-label="Main">',
      '    <ul scNavigationMenuList>',
      '      <li scNavigationMenuItem>',
      '        <a scNavigationMenuLink [active]="…">…</a>',
      '      </li>',
      '    </ul>',
      '  </nav>',
      '',
      '  <div class="ms-auto flex items-center gap-2">…</div>  <!-- your actions: your own layout -->',
      '',
      '  <!-- Below the expand width: the toggle and the menu -->',
      '  <button scHeaderToggle class="-me-2">',
      '    @if (header.open()) {',
      '      <svg siXIcon></svg><span class="sr-only">Close menu</span>',
      '    } @else {',
      '      <svg siMenuIcon></svg><span class="sr-only">Open menu</span>',
      '    }',
      '  </button>',
      '',
      '  <ng-template scHeaderMobileMenuContent>',
      '    <nav aria-label="Main">',
      '      <a scHeaderMenuLink [active]="…">…</a>',
      '    </nav>',
      '  </ng-template>',
      '</header>',
    ].join('\n'),
  };

  private readonly parts = [
    {
      name: 'ScHeader',
      selector: 'header[scHeader]',
      description:
        "The bar, the page's banner, 56px tall (more when the menu pushes the page): [(open)] the menu's state; expand ('sm', 'md', 'lg' — the width from which its links show, 'md' by default: its nav, a Navigation Menu, is hidden below it); sticky; hideOnScroll (away going down, back going up). exportAs scHeader. Renders your menu while open, and closes it on Escape, a link followed, the window growing wide enough, the focus leaving the bar.",
    },
    {
      name: 'ScHeaderToggle',
      selector: 'button[scHeaderToggle]',
      description:
        "Opens and closes the menu, below expand: aria-expanded, aria-controls while open. Your icons and a name that follows the state (sr-only); once pressed, the icon that comes in turns and fades in. The style's button: variant ('ghost'), size ('icon'). Where it sits is yours (ms-auto to reach the end, -me-2 to line its icon up with the edge).",
    },
    {
      name: 'ScHeaderMobileMenuContent',
      selector: 'ng-template[scHeaderMobileMenuContent]',
      description:
        "The menu's content — a named nav with its links, any actions — rendered by the header while open, in a panel covering the page below the bar: see-through and blurred, opening at once, fading out in 100ms. push: pushing the page down instead. class: the panel's classes.",
    },
    {
      name: 'ScHeaderMenuLink',
      selector: 'a[scHeaderMenuLink]',
      description:
        'A link of the menu, a full-width row; closes the menu when followed. active: the page shown (aria-current="page").',
    },
  ];
}
