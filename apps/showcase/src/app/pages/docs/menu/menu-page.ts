import { Component, ViewEncapsulation } from '@angular/core';
import { ScKbd, ScTypeset } from '@semantic-components/ui';
import { Anatomy } from '../../../components/anatomy/anatomy';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { PartsTable } from '../../../components/parts-table/parts-table';
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
    ScKbd,
    PartsTable,
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
    ScTypeset,
  ],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>Menu</h1>
        <p class="text-muted-foreground">
          A menu of actions from a button: groups, checkbox and radio items,
          submenus, shortcuts. In the look of the app&apos;s style.
        </p>
        <app-component-badges path="menu" />
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Usage</h2>
        <app-menu-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Anatomy</h2>
        <p>
          Every part is a directive on your element; the text, the icons and the
          trigger&apos;s name are yours. The menu is in a template, rendered
          while it is open; its items in another, rendered once it has opened.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Keyboard</h2>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            On the trigger, <kbd scKbd>Enter</kbd>, <kbd scKbd>Space</kbd> or
            <kbd scKbd>ArrowDown</kbd> opens the menu on its first item,
            <kbd scKbd>ArrowUp</kbd> on its last. A click opens it with nothing
            highlighted, until the pointer moves or a key is pressed.
          </li>
          <li>
            The arrows move, <kbd scKbd>Home</kbd> and <kbd scKbd>End</kbd> go
            to the ends, a letter goes to the item it starts.
          </li>
          <li>
            The arrow toward the reading end opens a submenu, the other way
            closes it (mirrored right to left).
          </li>
          <li>
            <kbd scKbd>Enter</kbd> or <kbd scKbd>Space</kbd> chooses an item; a
            checkbox or radio item toggles and the menu stays open.
          </li>
          <li>
            <kbd scKbd>Escape</kbd> closes the menu and gives focus back to the
            trigger; <kbd scKbd>Tab</kbd>
            closes it and moves on.
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scTypeset appToc>Examples</h2>
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
        <h2 scTypeset appToc>API reference</h2>
        <p>
          Each part takes
          <code scTypeset>class</code>, merged over the style (cn: a later class
          wins).
        </p>
        <app-parts-table label="Menu parts" [parts]="parts" />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class MenuPage {
  private readonly anatomy = {
    imports: [
      'import {',
      '  ScMenuProvider, ScMenuTrigger, ScMenuPortal, ScMenu,',
      '  ScMenuContent, ScMenuGroup, ScMenuLabel, ScMenuItem,',
      '  ScMenuCheckboxItem, ScMenuRadioGroup,',
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
      '            …<kbd scKbd>…</kbd>',
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

  private readonly parts = [
    {
      name: 'ScMenuProvider',
      selector: 'div[scMenuProvider], span[scMenuProvider]',
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
      name: 'ScMenuSeparator',
      selector: '[scMenuSeparator]',
      description:
        'A line between items. A key hint is yours: a scKbd in the item (⌘S) — the menu places it at the item’s end.',
    },
  ];
}
