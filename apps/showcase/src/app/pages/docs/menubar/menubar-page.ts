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
import { CheckboxMenubarDemoContainer } from './demos/checkbox-menubar-demo-container';
import { IconsMenubarDemoContainer } from './demos/icons-menubar-demo-container';
import { MenubarUsageDemoContainer } from './demos/menubar-usage-demo-container';
import { RadioMenubarDemoContainer } from './demos/radio-menubar-demo-container';
import { RtlMenubarDemoContainer } from './demos/rtl-menubar-demo-container';
import { SubmenuMenubarDemoContainer } from './demos/submenu-menubar-demo-container';

@Component({
  selector: 'app-menubar-page',
  imports: [
    Anatomy,
    MenubarUsageDemoContainer,
    CheckboxMenubarDemoContainer,
    RadioMenubarDemoContainer,
    SubmenuMenubarDemoContainer,
    IconsMenubarDemoContainer,
    RtlMenubarDemoContainer,
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
        <h1 scHeading>Menubar</h1>
        <p class="text-muted-foreground">
          A row of menus, as at the top of a desktop app: File, Edit, View. In
          the look of the app&apos;s preset.
        </p>
        <app-component-badges path="menubar" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-menubar-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Anatomy</h2>
        <p class="text-muted-foreground">
          The bar and its items are the Menubar&apos;s; each item&apos;s menu is
          made of the Menu&apos;s parts — groups, checkbox and radio items,
          submenus, shortcuts — which take the menu bar&apos;s look inside it.
          The bar&apos;s name is yours (aria-label).
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Keyboard</h2>
        <ul class="text-muted-foreground list-disc space-y-2 ps-6">
          <li>
            The bar is one tab stop: ArrowLeft and ArrowRight move along it
            (mirrored right to left), Home and End go to its ends, a letter goes
            to the item it starts.
          </li>
          <li>
            Enter, Space or ArrowDown opens an item&apos;s menu on its first
            item, ArrowUp on its last. With a menu open, ArrowLeft and
            ArrowRight open the next item&apos;s menu.
          </li>
          <li>
            In a menu, the keys are the Menu&apos;s: the arrows move, a submenu
            opens toward the reading end, Enter or Space chooses.
          </li>
          <li>
            Escape closes the menu and gives focus back to its item; Tab closes
            it and leaves the bar.
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-checkbox-menubar-demo-container />
        <app-radio-menubar-demo-container />
        <app-submenu-menubar-demo-container />
        <app-icons-menubar-demo-container />
        <app-rtl-menubar-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>API reference</h2>
        <p class="text-muted-foreground">
          Each part takes
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">class</code>,
          merged over the preset (cn: a later class wins). The menus&apos; parts
          are the Menu&apos;s (see Menu).
        </p>
        <div
          scTableContainer
          tabindex="0"
          role="region"
          aria-label="Menubar parts"
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
export default class MenubarPage {
  protected readonly anatomy = {
    imports: [
      'import {',
      '  ScMenubar, ScMenubarItem, ScMenuPortal, ScMenu, ScMenuContent,',
      '  ScMenuGroup, ScMenuItem, ScMenuShortcut, ScMenuSeparator,',
      "} from '@semantic-components/ui';",
    ].join('\n'),
    markup: [
      '<div scMenubar aria-label="…">',
      '  <div scMenubarItem value="…">',
      '    …',
      '    <ng-template scMenuPortal>',
      '      <div scMenu>',
      '        <ng-template scMenuContent>',
      '          <div scMenuGroup>',
      '            <div scMenuItem value="…">',
      '              …<span scMenuShortcut>…</span>',
      '            </div>',
      '          </div>',
      '          <div scMenuSeparator></div>',
      '          …the Menu’s other parts…',
      '        </ng-template>',
      '      </div>',
      '    </ng-template>',
      '  </div>',
      '</div>',
    ].join('\n'),
  };

  protected readonly parts = [
    {
      name: 'ScMenubar',
      selector: '[scMenubar]',
      description:
        'The bar (role menubar): one tab stop, the arrows along it. Name it with aria-label.',
    },
    {
      name: 'ScMenubarItem',
      selector: '[scMenubarItem]',
      description:
        'An item of the bar: value, disabled. Holding a portal, it opens its menu below it.',
    },
    {
      name: 'ScMenuPortal, ScMenu, ScMenuContent…',
      selector: 'ng-template[scMenuPortal], div[scMenu]…',
      description:
        'The menu and its parts: the Menu’s, in the menu bar’s look (the check at the start of a checkbox or radio item).',
    },
  ];
}
