import { Component, ViewEncapsulation } from '@angular/core';
import { ScTypeset } from '@semantic-components/ui';
import { Anatomy } from '../../../components/anatomy/anatomy';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { PartsTable } from '../../../components/parts-table/parts-table';
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
    PartsTable,
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
          The bar holds your brand, the links — a Navigation Menu, shown from
          the expand width up — and your actions, your own markup laid out as
          you like. Below the expand width, the header shows the mobile
          menu&apos;s toggle, wherever you put it (here, with your actions), and
          hides the links. The menu is an ng-template: the header renders it
          while it is open, and removes it on closing.
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
            focus back to the toggle; following a link closes it too, and, over
            the page, a click or the focus outside the bar.
          </li>
          <li>
            With reduced motion, nothing animates: the menu opens and closes at
            once, and hiding on scroll hides without sliding.
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
          The header and the toggle take
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">class</code>,
          merged over their own (cn: a later class wins). The menu&apos;s
          template has no element of its own: style the content you put in it.
        </p>
        <app-parts-table label="Header parts" [parts]="parts" />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class HeaderPage {
  private readonly anatomy = {
    imports:
      "import { ScHeader, ScHeaderMobileMenu, ScHeaderMobileMenuToggle, ScNavigationMenu, ScNavigationMenuItem, ScNavigationMenuLink, ScNavigationMenuList } from '@semantic-components/ui';",
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
      '  <!-- Your actions: your own layout -->',
      '  <div class="ms-auto flex items-center gap-2">',
      '    …',
      '    <!-- Below the expand width only: the toggle of the mobile menu -->',
      '    <button scHeaderMobileMenuToggle class="-me-2">',
      '      @if (header.mobileMenuOpen()) {',
      '        <svg siXIcon></svg><span class="sr-only">Close menu</span>',
      '      } @else {',
      '        <svg siMenuIcon></svg><span class="sr-only">Open menu</span>',
      '      }',
      '    </button>',
      '  </div>',
      '',
      '  <ng-template scHeaderMobileMenu>',
      '    <nav aria-label="Main">',
      '      <a scNavigationMenuLink [active]="…">…</a>',
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
        "The bar, the page's banner, 56px tall (more when the menu pushes the page): [(mobileMenuOpen)] the mobile menu's state; expand ('sm', 'md', 'lg' — the width from which its links show, 'md' by default: its nav, a Navigation Menu, is hidden below it); mobileMenu ('cover' over the page below the bar, by default, or 'push' pushing it down); sticky; hideOnScroll (away going down, back going up). exportAs scHeader. Renders your menu while open, and closes it on Escape, a link followed (at once), a navigation ending, the window growing wide enough, and (covering the page) a click or the focus outside the bar.",
    },
    {
      name: 'ScHeaderMobileMenuToggle',
      selector: 'button[scHeaderMobileMenuToggle]',
      description:
        "Opens and closes the menu, below expand: aria-expanded, aria-controls while open. Your icons and a name that follows the state (sr-only). The style's button: variant ('ghost'), size ('icon'). Where it sits is yours (ms-auto to reach the end, -me-2 to line its icon up with the edge).",
    },
    {
      name: 'ScHeaderMobileMenu',
      selector: 'ng-template[scHeaderMobileMenu]',
      description:
        "The menu's content — a named nav with its links (scNavigationMenuLink: the Navigation Menu's link, with its states; following one closes the menu), any actions — rendered by the header while open, in its panel: over the page below the bar, see-through and blurred, opening at once, fading out in 100ms — or, with the header's mobileMenu set to 'push', pushing the page down. No class: the template has no element; style the content you put in it.",
    },
  ];
}
