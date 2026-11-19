import { Component, ViewEncapsulation } from '@angular/core';
import { ScKbd, ScTypeset } from '@semantic-components/ui';
import { Anatomy } from '../../../components/anatomy/anatomy';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { PartsTable } from '../../../components/parts-table/parts-table';
import { TocHeading } from '../../../components/toc/toc-heading';
import { BasicContextMenuDemoContainer } from './demos/basic-context-menu-demo-container';
import { CheckboxesContextMenuDemoContainer } from './demos/checkboxes-context-menu-demo-container';
import { ContextMenuUsageDemoContainer } from './demos/context-menu-usage-demo-container';
import { DestructiveContextMenuDemoContainer } from './demos/destructive-context-menu-demo-container';
import { GroupsContextMenuDemoContainer } from './demos/groups-context-menu-demo-container';
import { IconsContextMenuDemoContainer } from './demos/icons-context-menu-demo-container';
import { RadioContextMenuDemoContainer } from './demos/radio-context-menu-demo-container';
import { RtlContextMenuDemoContainer } from './demos/rtl-context-menu-demo-container';
import { ShortcutsContextMenuDemoContainer } from './demos/shortcuts-context-menu-demo-container';
import { SidesContextMenuDemoContainer } from './demos/sides-context-menu-demo-container';
import { SubmenuContextMenuDemoContainer } from './demos/submenu-context-menu-demo-container';

@Component({
  selector: 'app-context-menu-page',
  imports: [
    ScKbd,
    PartsTable,
    Anatomy,
    ContextMenuUsageDemoContainer,
    BasicContextMenuDemoContainer,
    SubmenuContextMenuDemoContainer,
    ShortcutsContextMenuDemoContainer,
    GroupsContextMenuDemoContainer,
    IconsContextMenuDemoContainer,
    CheckboxesContextMenuDemoContainer,
    RadioContextMenuDemoContainer,
    DestructiveContextMenuDemoContainer,
    SidesContextMenuDemoContainer,
    RtlContextMenuDemoContainer,
    TocHeading,
    ComponentBadges,
    ScTypeset,
  ],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>Context Menu</h1>
        <p class="text-muted-foreground">
          A menu at the pointer, opened by a right-click on an area — a long
          press on touch, <kbd scKbd>Shift + F10</kbd> or the Menu key on the
          focused area. In the look of the app&apos;s style.
        </p>
        <app-component-badges path="context-menu" />
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Usage</h2>
        <app-context-menu-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Anatomy</h2>
        <p>
          The context menu holds the area (the trigger) and the menu, in a
          portal as the Menu&apos;s: rendered while it is open. The menu is made
          of the Menu&apos;s parts, which take the context menu&apos;s look in
          it. The area&apos;s look and text are yours.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Keyboard</h2>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            The area is focusable: <kbd scKbd>Shift + F10</kbd> or the Menu key
            opens the menu on it, with its first item highlighted. A right-click
            opens it with nothing highlighted, until the pointer moves or a key
            is pressed.
          </li>
          <li>
            In the menu, the Menu&apos;s keys: the arrows move, a submenu opens
            toward the reading end, <kbd scKbd>Enter</kbd> or
            <kbd scKbd>Space</kbd> chooses.
          </li>
          <li>
            <kbd scKbd>Escape</kbd>, a click outside or a choice closes it;
            focus goes back to the area.
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scTypeset appToc>Examples</h2>
        <app-basic-context-menu-demo-container />
        <app-submenu-context-menu-demo-container />
        <app-shortcuts-context-menu-demo-container />
        <app-groups-context-menu-demo-container />
        <app-icons-context-menu-demo-container />
        <app-checkboxes-context-menu-demo-container />
        <app-radio-context-menu-demo-container />
        <app-destructive-context-menu-demo-container />
        <app-sides-context-menu-demo-container />
        <app-rtl-context-menu-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>API reference</h2>
        <p>
          Each part takes
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">class</code>,
          merged over the style (cn: a later class wins). The menus&apos; parts
          are the Menu&apos;s (see Menu).
        </p>
        <app-parts-table label="Context Menu parts" [parts]="parts" />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class ContextMenuPage {
  private readonly anatomy = {
    imports: [
      'import {',
      '  ScContextMenu, ScContextMenuTrigger, ScMenuPortal, ScMenu,',
      '  ScMenuContent, ScMenuGroup, ScMenuItem, ScMenuSeparator,',
      "} from '@semantic-components/ui';",
    ].join('\n'),
    markup: [
      '<div scContextMenu>',
      '  <div scContextMenuTrigger>…</div>',
      '  <ng-template scMenuPortal>',
      '    <div scMenu>',
      '      <ng-template scMenuContent>',
      '        <div scMenuGroup>',
      '          <div scMenuItem value="…">…</div>',
      '        </div>',
      '        <div scMenuSeparator></div>',
      '        …the Menu’s other parts…',
      '      </ng-template>',
      '    </div>',
      '  </ng-template>',
      '</div>',
    ].join('\n'),
  };

  private readonly parts = [
    {
      name: 'ScContextMenu',
      selector: 'div[scContextMenu]',
      description:
        "Holds the area and its menu: catches the right-click and opens the menu there. [(open)]; side: 'inline-end' (default), 'inline-start', 'top' or 'bottom' — logical; 'left' or 'right' stay put right to left.",
    },
    {
      name: 'ScContextMenuTrigger',
      selector: '[scContextMenuTrigger]',
      description:
        'The area: focusable (Shift+F10, the Menu key), no text selection on a long press. Its look is yours.',
    },
    {
      name: 'ScMenuPortal, ScMenu, ScMenuItem…',
      selector: 'ng-template[scMenuPortal], div[scMenu]…',
      description:
        'The menu and its parts: the Menu’s, in the context menu’s look.',
    },
  ];
}
