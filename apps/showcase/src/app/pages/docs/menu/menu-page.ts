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
import { BasicMenuDemoContainer } from './demos/basic-menu-demo-container';
import { CheckboxesMenuDemoContainer } from './demos/checkboxes-menu-demo-container';
import { DestructiveMenuDemoContainer } from './demos/destructive-menu-demo-container';
import { IconsMenuDemoContainer } from './demos/icons-menu-demo-container';
import { MenuUsageDemoContainer } from './demos/menu-usage-demo-container';
import { RadioGroupMenuDemoContainer } from './demos/radio-group-menu-demo-container';
import { RtlMenuDemoContainer } from './demos/rtl-menu-demo-container';
import { ShortcutsMenuDemoContainer } from './demos/shortcuts-menu-demo-container';
import { StandaloneMenuDemoContainer } from './demos/standalone-menu-demo-container';
import { SubmenuMenuDemoContainer } from './demos/submenu-menu-demo-container';

@Component({
  selector: 'app-menu-page',
  imports: [
    Anatomy,
    MenuUsageDemoContainer,
    BasicMenuDemoContainer,
    SubmenuMenuDemoContainer,
    ShortcutsMenuDemoContainer,
    IconsMenuDemoContainer,
    CheckboxesMenuDemoContainer,
    RadioGroupMenuDemoContainer,
    DestructiveMenuDemoContainer,
    StandaloneMenuDemoContainer,
    RtlMenuDemoContainer,
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
        <h1 scHeading>Menu</h1>
        <p class="text-muted-foreground">
          A menu of actions from a button: groups, checkbox and radio items,
          submenus, shortcuts. In the look of the app&apos;s preset.
        </p>
        <app-component-badges path="menu" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-menu-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Anatomy</h2>
        <p class="text-muted-foreground">
          Every part is a directive on your element; the text, the icons and the
          trigger&apos;s name are yours. The menu is in a template, rendered
          while it is open; its items in another, rendered once it has opened.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Keyboard</h2>
        <ul class="text-muted-foreground list-disc space-y-2 ps-6">
          <li>
            On the trigger, Enter, Space or ArrowDown opens the menu on its
            first item, ArrowUp on its last. A click opens it with nothing
            highlighted, until the pointer moves or a key is pressed.
          </li>
          <li>
            The arrows move, Home and End go to the ends, a letter goes to the
            item it starts.
          </li>
          <li>
            The arrow toward the reading end opens a submenu, the other way
            closes it (mirrored right to left).
          </li>
          <li>
            Enter or Space chooses an item; a checkbox or radio item toggles and
            the menu stays open.
          </li>
          <li>
            Escape closes the menu and gives focus back to the trigger; Tab
            closes it and moves on.
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-basic-menu-demo-container />
        <app-submenu-menu-demo-container />
        <app-shortcuts-menu-demo-container />
        <app-icons-menu-demo-container />
        <app-checkboxes-menu-demo-container />
        <app-radio-group-menu-demo-container />
        <app-destructive-menu-demo-container />
        <app-standalone-menu-demo-container />
        <app-rtl-menu-demo-container />
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
          aria-label="Menu parts"
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
export default class MenuPage {
  protected readonly anatomy = {
    imports: [
      'import {',
      '  ScMenuProvider, ScMenuTrigger, ScMenuPortal, ScMenu,',
      '  ScMenuContent, ScMenuGroup, ScMenuLabel, ScMenuItem,',
      '  ScMenuShortcut, ScMenuCheckboxItem, ScMenuRadioGroup,',
      '  ScMenuRadioItem, ScMenuItemIndicator, ScMenuSeparator, ScMenuSubmenuIcon,',
      "} from '@semantic-components/ui';",
    ].join('\n'),
    markup: [
      '<div scMenuProvider [(open)]="open">',
      '  <button scButton scMenuTrigger>…</button>',
      '  <ng-template scMenuPortal>',
      '    <div scMenu>',
      '      <ng-template scMenuContent>',
      '        <div scMenuGroup>',
      '          <div scMenuLabel>…</div>',
      '          <div scMenuItem value="…">',
      '            …<span scMenuShortcut>…</span>',
      '          </div>',
      '        </div>',
      '        <div scMenuSeparator></div>',
      '        <div scMenuCheckboxItem [(checked)]="…">',
      '          <span scMenuItemIndicator><svg></svg></span>…',
      '        </div>',
      '        <div scMenuRadioGroup [(value)]="…">',
      '          <div scMenuRadioItem value="…">…</div>',
      '        </div>',
      '        <div scMenuItem value="…">…',
      '          <svg scMenuSubmenuIcon></svg>',
      '          <ng-template scMenuPortal>…a submenu…</ng-template>',
      '        </div>',
      '      </ng-template>',
      '    </div>',
      '  </ng-template>',
      '</div>',
    ].join('\n'),
  };

  protected readonly parts = [
    {
      name: 'ScMenuProvider',
      selector: 'div[scMenuProvider]',
      description:
        "Holds the menu: [(open)]; side ('bottom' or 'top'), align, offset. Renders it in an overlay, with the trigger's direction and language.",
    },
    {
      name: 'ScMenuTrigger',
      selector: '[scMenuTrigger]',
      description:
        'Opens it; behaviour only, on any button (scButton for the look). Its name is yours.',
    },
    {
      name: 'ScMenuPortal, ScMenuContent',
      selector: 'ng-template[scMenuPortal], ng-template[scMenuContent]',
      description:
        'The menu, rendered while it is open; its items, rendered once it has opened. A portal inside an item makes a submenu.',
    },
    {
      name: 'ScMenu',
      selector: 'div[scMenu]',
      description:
        'The popup (role menu). Output itemSelected: the chosen item’s value.',
    },
    {
      name: 'ScMenuItem',
      selector: '[scMenuItem]',
      description:
        "An item: value, disabled, variant ('default' or 'destructive'), inset. data-highlighted while highlighted.",
    },
    {
      name: 'ScMenuCheckboxItem',
      selector: '[scMenuCheckboxItem]',
      description:
        'On or off (menuitemcheckbox), [(checked)]; the menu stays open. disabled, inset.',
    },
    {
      name: 'ScMenuRadioGroup, ScMenuRadioItem',
      selector: '[scMenuRadioGroup], [scMenuRadioItem]',
      description:
        'One of a group on (menuitemradio): [(value)] on the group, value on each item; the menu stays open.',
    },
    {
      name: 'ScMenuItemIndicator',
      selector: 'span[scMenuItemIndicator]',
      description:
        'The check (your icon) of a checkbox or radio item, shown when it is on.',
    },
    {
      name: 'ScMenuGroup, ScMenuLabel',
      selector: '[scMenuGroup], [scMenuLabel]',
      description: 'A titled section (role group), named by its label.',
    },
    {
      name: 'ScMenuSubmenuIcon',
      selector: 'svg[scMenuSubmenuIcon]',
      description:
        'The icon (yours) of an item that opens a submenu: at its end, turned right to left.',
    },
    {
      name: 'ScMenuSeparator, ScMenuShortcut',
      selector: '[scMenuSeparator], span[scMenuShortcut]',
      description: 'A line between items; the keyboard hint at an item’s end.',
    },
  ];
}
