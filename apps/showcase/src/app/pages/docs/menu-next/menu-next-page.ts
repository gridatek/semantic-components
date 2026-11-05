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
import { BasicMenuNextDemoContainer } from './demos/basic-menu-next-demo-container';
import { CheckboxesMenuNextDemoContainer } from './demos/checkboxes-menu-next-demo-container';
import { DestructiveMenuNextDemoContainer } from './demos/destructive-menu-next-demo-container';
import { IconsMenuNextDemoContainer } from './demos/icons-menu-next-demo-container';
import { MenuNextUsageDemoContainer } from './demos/menu-next-usage-demo-container';
import { RadioGroupMenuNextDemoContainer } from './demos/radio-group-menu-next-demo-container';
import { RtlMenuNextDemoContainer } from './demos/rtl-menu-next-demo-container';
import { ShortcutsMenuNextDemoContainer } from './demos/shortcuts-menu-next-demo-container';
import { SubmenuMenuNextDemoContainer } from './demos/submenu-menu-next-demo-container';

@Component({
  selector: 'app-menu-next-page',
  imports: [
    Anatomy,
    MenuNextUsageDemoContainer,
    BasicMenuNextDemoContainer,
    SubmenuMenuNextDemoContainer,
    ShortcutsMenuNextDemoContainer,
    IconsMenuNextDemoContainer,
    CheckboxesMenuNextDemoContainer,
    RadioGroupMenuNextDemoContainer,
    DestructiveMenuNextDemoContainer,
    RtlMenuNextDemoContainer,
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
        <h1 scHeading>Menu Next</h1>
        <p class="text-muted-foreground">
          A menu of actions from a button: groups, checkbox and radio items,
          submenus, shortcuts. In the look of the app&apos;s preset. The rewrite
          of Menu, beside it until it is validated.
        </p>
        <app-component-badges path="menu-next" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-menu-next-usage-demo-container />
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
        <app-basic-menu-next-demo-container />
        <app-submenu-menu-next-demo-container />
        <app-shortcuts-menu-next-demo-container />
        <app-icons-menu-next-demo-container />
        <app-checkboxes-menu-next-demo-container />
        <app-radio-group-menu-next-demo-container />
        <app-destructive-menu-next-demo-container />
        <app-rtl-menu-next-demo-container />
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
          aria-label="Menu Next parts"
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
export default class MenuNextPage {
  protected readonly anatomy = {
    imports: [
      'import {',
      '  ScMenuNextProvider, ScMenuNextTrigger, ScMenuNextPortal, ScMenuNext,',
      '  ScMenuNextContent, ScMenuNextGroup, ScMenuNextLabel, ScMenuNextItem,',
      '  ScMenuNextShortcut, ScMenuNextCheckboxItem, ScMenuNextRadioGroup,',
      '  ScMenuNextRadioItem, ScMenuNextItemIndicator, ScMenuNextSeparator,',
      "} from '@semantic-components/ui';",
    ].join('\n'),
    markup: [
      '<div scMenuNextProvider [(open)]="open">',
      '  <button scButton scMenuNextTrigger>…</button>',
      '  <ng-template scMenuNextPortal>',
      '    <div scMenuNext>',
      '      <ng-template scMenuNextContent>',
      '        <div scMenuNextGroup>',
      '          <div scMenuNextLabel>…</div>',
      '          <div scMenuNextItem value="…">',
      '            …<span scMenuNextShortcut>…</span>',
      '          </div>',
      '        </div>',
      '        <div scMenuNextSeparator></div>',
      '        <div scMenuNextCheckboxItem [(checked)]="…">',
      '          <span scMenuNextItemIndicator><svg></svg></span>…',
      '        </div>',
      '        <div scMenuNextRadioGroup [(value)]="…">',
      '          <div scMenuNextRadioItem value="…">…</div>',
      '        </div>',
      '        <div scMenuNextItem value="…">…',
      '          <ng-template scMenuNextPortal>…a submenu…</ng-template>',
      '        </div>',
      '      </ng-template>',
      '    </div>',
      '  </ng-template>',
      '</div>',
    ].join('\n'),
  };

  protected readonly parts = [
    {
      name: 'ScMenuNextProvider',
      selector: 'div[scMenuNextProvider]',
      description:
        "Holds the menu: [(open)]; side ('bottom' or 'top'), align, offset. Renders it in an overlay, with the trigger's direction and language.",
    },
    {
      name: 'ScMenuNextTrigger',
      selector: '[scMenuNextTrigger]',
      description:
        'Opens it; behaviour only, on any button (scButton for the look). Its name is yours.',
    },
    {
      name: 'ScMenuNextPortal, ScMenuNextContent',
      selector: 'ng-template[scMenuNextPortal], ng-template[scMenuNextContent]',
      description:
        'The menu, rendered while it is open; its items, rendered once it has opened. A portal inside an item makes a submenu.',
    },
    {
      name: 'ScMenuNext',
      selector: 'div[scMenuNext]',
      description:
        'The popup (role menu). Output itemSelected: the chosen item’s value.',
    },
    {
      name: 'ScMenuNextItem',
      selector: '[scMenuNextItem]',
      description:
        "An item: value, disabled, variant ('default' or 'destructive'), inset. data-highlighted while highlighted.",
    },
    {
      name: 'ScMenuNextCheckboxItem',
      selector: '[scMenuNextCheckboxItem]',
      description:
        'On or off (menuitemcheckbox), [(checked)]; the menu stays open. disabled, inset.',
    },
    {
      name: 'ScMenuNextRadioGroup, ScMenuNextRadioItem',
      selector: '[scMenuNextRadioGroup], [scMenuNextRadioItem]',
      description:
        'One of a group on (menuitemradio): [(value)] on the group, value on each item; the menu stays open.',
    },
    {
      name: 'ScMenuNextItemIndicator',
      selector: 'span[scMenuNextItemIndicator]',
      description:
        'The check (your icon) of a checkbox or radio item, shown when it is on.',
    },
    {
      name: 'ScMenuNextGroup, ScMenuNextLabel',
      selector: '[scMenuNextGroup], [scMenuNextLabel]',
      description: 'A titled section (role group), named by its label.',
    },
    {
      name: 'ScMenuNextSeparator, ScMenuNextShortcut',
      selector: '[scMenuNextSeparator], span[scMenuNextShortcut]',
      description: 'A line between items; the keyboard hint at an item’s end.',
    },
  ];
}
