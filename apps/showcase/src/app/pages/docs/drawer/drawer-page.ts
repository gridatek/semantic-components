import { Component, ViewEncapsulation } from '@angular/core';
import { ScKbd, ScTypeset } from '@semantic-components/ui';
import { Anatomy } from '../../../components/anatomy/anatomy';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { PartsTable } from '../../../components/parts-table/parts-table';
import { TocHeading } from '../../../components/toc/toc-heading';
import { DrawerUsageDemoContainer } from './demos/drawer-usage-demo-container';
import { NestedDrawerDemoContainer } from './demos/nested-drawer-demo-container';
import { NonModalDrawerDemoContainer } from './demos/non-modal-drawer-demo-container';
import { ResponsiveDrawerDemoContainer } from './demos/responsive-drawer-demo-container';
import { RtlDrawerDemoContainer } from './demos/rtl-drawer-demo-container';
import { SidesDrawerDemoContainer } from './demos/sides-drawer-demo-container';
import { SnapPointsDrawerDemoContainer } from './demos/snap-points-drawer-demo-container';
import { SwipeHandleDrawerDemoContainer } from './demos/swipe-handle-drawer-demo-container';

@Component({
  selector: 'app-drawer-page',
  imports: [
    ScKbd,
    PartsTable,
    Anatomy,
    DrawerUsageDemoContainer,
    SidesDrawerDemoContainer,
    SwipeHandleDrawerDemoContainer,
    SnapPointsDrawerDemoContainer,
    NestedDrawerDemoContainer,
    NonModalDrawerDemoContainer,
    ResponsiveDrawerDemoContainer,
    RtlDrawerDemoContainer,
    TocHeading,
    ComponentBadges,
    ScTypeset,
  ],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>Drawer</h1>
        <p class="text-muted-foreground">
          A panel at the edge of the screen that a swipe dismisses — or moves
          between its snap points. In the look of the app&apos;s style.
        </p>
        <app-component-badges path="drawer" />
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Usage</h2>
        <app-drawer-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Anatomy</h2>
        <p>
          Every part is a directive on your element; the trigger, the title, the
          content and the close buttons are yours.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Accessibility</h2>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            A dialog (role=&quot;dialog&quot;, aria-modal when modal), named by
            its title and described by its description.
          </li>
          <li>
            Focus moves into it and, unless [modal]=&quot;false&quot;, stays
            there; closing gives it back to the trigger.
            <kbd scKbd>Escape</kbd> closes it, as does a press outside (unless
            disablePointerDismissal).
          </li>
          <li>
            Swiping is for the pointer only: a keyboard closes it with
            <kbd scKbd>Escape</kbd> or its close button. A handle on a div is
            hidden from screen readers; on a button, named by you, it moves to
            the next snap point.
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scTypeset appToc>Examples</h2>
        <app-sides-drawer-demo-container />
        <app-swipe-handle-drawer-demo-container />
        <app-snap-points-drawer-demo-container />
        <app-nested-drawer-demo-container />
        <app-non-modal-drawer-demo-container />
        <app-responsive-drawer-demo-container />
        <app-rtl-drawer-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>API reference</h2>
        <p>
          Each part takes
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">class</code>,
          merged over the style (cn: a later class wins).
        </p>
        <app-parts-table label="Drawer parts" [parts]="parts" />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class DrawerPage {
  private readonly anatomy = {
    imports: [
      'import {',
      '  ScDrawerProvider, ScDrawerTrigger, ScDrawerPortal, ScDrawer,',
      '  ScDrawerHandle, ScDrawerHeader, ScDrawerTitle,',
      '  ScDrawerDescription, ScDrawerFooter, ScDrawerClose,',
      "} from '@semantic-components/ui';",
    ].join('\n'),
    markup: [
      '<div scDrawerProvider swipeDirection="…">',
      '  <button scButton scDrawerTrigger>…</button>',
      '  <ng-template scDrawerPortal>',
      '    <div scDrawer>',
      '      <div scDrawerHandle></div>',
      '      <div scDrawerHeader>',
      '        <h2 scDrawerTitle>…</h2>',
      '        <p scDrawerDescription>…</p>',
      '      </div>',
      '      …',
      '      <div scDrawerFooter>',
      '        <button scDrawerClose>…</button>',
      '      </div>',
      '    </div>',
      '  </ng-template>',
      '</div>',
    ].join('\n'),
  };

  private readonly parts = [
    {
      name: 'ScDrawerProvider',
      selector: 'div[scDrawerProvider], span[scDrawerProvider]',
      description:
        "[(open)], swipeDirection ('down', 'up', 'left', 'right', 'inline-start', 'inline-end'), snapPoints and [(snapPoint)], modal (true, 'trap-focus', false), disablePointerDismissal.",
    },
    {
      name: 'ScDrawerTrigger',
      selector: 'button[scDrawerTrigger]',
      description:
        'Opens and closes it, on any button (aria-haspopup, aria-expanded).',
    },
    {
      name: 'ScDrawerPortal, ScDrawer',
      selector: 'ng-template[…], div[scDrawer]',
      description:
        'The content, rendered while open; the panel (role="dialog"), named and described, sliding from its edge and following a swipe.',
    },
    {
      name: 'ScDrawerHandle',
      selector: 'div[scDrawerHandle], button[scDrawerHandle]',
      description:
        'The bar to drag it by. On a button (named): the next snap point.',
    },
    {
      name: 'ScDrawerHeader, ScDrawerTitle, ScDrawerDescription, ScDrawerFooter',
      selector: 'div[…], h2[…], p[…], div[…]',
      description:
        'Its title and description at the top; its actions at the bottom.',
    },
    {
      name: 'ScDrawerClose',
      selector: 'button[scDrawerClose]',
      description:
        "Closes it: the style's button (outline by default); variant and size of your choice.",
    },
  ];
}
