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
import { DrawerNextUsageDemoContainer } from './demos/drawer-next-usage-demo-container';
import { NestedDrawerNextDemoContainer } from './demos/nested-drawer-next-demo-container';
import { NonModalDrawerNextDemoContainer } from './demos/non-modal-drawer-next-demo-container';
import { ResponsiveDrawerNextDemoContainer } from './demos/responsive-drawer-next-demo-container';
import { RtlDrawerNextDemoContainer } from './demos/rtl-drawer-next-demo-container';
import { SidesDrawerNextDemoContainer } from './demos/sides-drawer-next-demo-container';
import { SnapPointsDrawerNextDemoContainer } from './demos/snap-points-drawer-next-demo-container';
import { SwipeHandleDrawerNextDemoContainer } from './demos/swipe-handle-drawer-next-demo-container';

@Component({
  selector: 'app-drawer-next-page',
  imports: [
    Anatomy,
    DrawerNextUsageDemoContainer,
    SidesDrawerNextDemoContainer,
    SwipeHandleDrawerNextDemoContainer,
    SnapPointsDrawerNextDemoContainer,
    NestedDrawerNextDemoContainer,
    NonModalDrawerNextDemoContainer,
    ResponsiveDrawerNextDemoContainer,
    RtlDrawerNextDemoContainer,
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
        <h1 scHeading>Drawer Next</h1>
        <p class="text-muted-foreground">
          A panel at the edge of the screen that a swipe dismisses — or moves
          between its snap points. In the look of the app&apos;s preset.
        </p>
        <app-component-badges path="drawer-next" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-drawer-next-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Anatomy</h2>
        <p class="text-muted-foreground">
          Every part is a directive on your element; the trigger, the title, the
          content and the close buttons are yours.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Accessibility</h2>
        <ul class="text-muted-foreground list-disc space-y-2 ps-6">
          <li>
            A dialog (role=&quot;dialog&quot;, aria-modal when modal), named by
            its title and described by its description.
          </li>
          <li>
            Focus moves into it and, unless [modal]=&quot;false&quot;, stays
            there; closing gives it back to the trigger. Escape closes it, as
            does a press outside (unless disablePointerDismissal).
          </li>
          <li>
            Swiping is for the pointer only: a keyboard closes it with Escape or
            its close button. A handle on a div is hidden from screen readers;
            on a button, named by you, it moves to the next snap point.
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-sides-drawer-next-demo-container />
        <app-swipe-handle-drawer-next-demo-container />
        <app-snap-points-drawer-next-demo-container />
        <app-nested-drawer-next-demo-container />
        <app-non-modal-drawer-next-demo-container />
        <app-responsive-drawer-next-demo-container />
        <app-rtl-drawer-next-demo-container />
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
          aria-label="Drawer Next parts"
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
export default class DrawerNextPage {
  protected readonly anatomy = {
    imports: [
      'import {',
      '  ScDrawerNextProvider, ScDrawerNextTrigger, ScDrawerNextPortal, ScDrawerNext,',
      '  ScDrawerNextHandle, ScDrawerNextHeader, ScDrawerNextTitle,',
      '  ScDrawerNextDescription, ScDrawerNextFooter, ScDrawerNextClose,',
      "} from '@semantic-components/ui';",
    ].join('\n'),
    markup: [
      '<div scDrawerNextProvider swipeDirection="…">',
      '  <button scButton scDrawerNextTrigger>…</button>',
      '  <ng-template scDrawerNextPortal>',
      '    <div scDrawerNext>',
      '      <div scDrawerNextHandle></div>',
      '      <div scDrawerNextHeader>',
      '        <h2 scDrawerNextTitle>…</h2>',
      '        <p scDrawerNextDescription>…</p>',
      '      </div>',
      '      …',
      '      <div scDrawerNextFooter>',
      '        <button scDrawerNextClose>…</button>',
      '      </div>',
      '    </div>',
      '  </ng-template>',
      '</div>',
    ].join('\n'),
  };

  protected readonly parts = [
    {
      name: 'ScDrawerNextProvider',
      selector: 'div[scDrawerNextProvider]',
      description:
        "[(open)], swipeDirection ('down', 'up', 'left', 'right', 'inline-start', 'inline-end'), snapPoints and [(snapPoint)], modal (true, 'trap-focus', false), disablePointerDismissal.",
    },
    {
      name: 'ScDrawerNextTrigger',
      selector: 'button[scDrawerNextTrigger]',
      description:
        'Opens and closes it, on any button (aria-haspopup, aria-expanded).',
    },
    {
      name: 'ScDrawerNextPortal, ScDrawerNext',
      selector: 'ng-template[…], div[scDrawerNext]',
      description:
        'The content, rendered while open; the panel (role="dialog"), named and described, sliding from its edge and following a swipe.',
    },
    {
      name: 'ScDrawerNextHandle',
      selector: 'div[scDrawerNextHandle], button[scDrawerNextHandle]',
      description:
        'The bar to drag it by. On a button (named): the next snap point.',
    },
    {
      name: 'ScDrawerNextHeader, ScDrawerNextTitle, ScDrawerNextDescription, ScDrawerNextFooter',
      selector: 'div[…], h2[…], p[…], div[…]',
      description:
        'Its title and description at the top; its actions at the bottom.',
    },
    {
      name: 'ScDrawerNextClose',
      selector: 'button[scDrawerNextClose]',
      description:
        "Closes it: the preset's button (outline by default); variant and size of your choice.",
    },
  ];
}
