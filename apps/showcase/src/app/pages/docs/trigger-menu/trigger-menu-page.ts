import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScKbd,
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
import {
  type ApiInput,
  ApiTable,
} from '../../../components/api-table/api-table';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { PartsTable } from '../../../components/parts-table/parts-table';
import { TocHeading } from '../../../components/toc/toc-heading';
import { CommandsTriggerMenuDemoContainer } from './demos/commands-trigger-menu-demo-container';
import { LoadingTriggerMenuDemoContainer } from './demos/loading-trigger-menu-demo-container';
import { RtlTriggerMenuDemoContainer } from './demos/rtl-trigger-menu-demo-container';
import { TriggerMenuUsageDemoContainer } from './demos/trigger-menu-usage-demo-container';

@Component({
  selector: 'app-trigger-menu-page',
  imports: [
    ScKbd,
    ScTable,
    ScTableBody,
    ScTableCell,
    ScTableContainer,
    ScTableHeader,
    ScTableHeaderCell,
    ScTableRow,
    ScTypeset,
    Anatomy,
    ApiTable,
    PartsTable,
    TocHeading,
    ComponentBadges,
    TriggerMenuUsageDemoContainer,
    CommandsTriggerMenuDemoContainer,
    LoadingTriggerMenuDemoContainer,
    RtlTriggerMenuDemoContainer,
  ],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>Trigger Menu</h1>
        <p class="text-muted-foreground">
          Suggestions as you type a trigger — &#64; for people, / for commands —
          in a Token Input: a list at the character, filtered by what follows
          it; the one chosen becomes a token.
        </p>
        <app-component-badges path="trigger-menu" />
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Usage</h2>
        <app-trigger-menu-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Anatomy</h2>
        <p>
          Inside a Token Input. Its template is stamped in an overlay at the
          trigger: the popup, the list of
          <code scTypeset>menu.items()</code> (already filtered), the empty
          text, a status.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Triggers</h2>
        <p>
          Each trigger is
          <code scTypeset>{{ triggerShape }}</code
          >. It opens after a space, a token or a line&apos;s start — or, with
          <code scTypeset>boundary: 'start'</code>, only at the start of a line.
          What follows it, up to a space, is the query: it filters the items by
          label and keywords, or is given to a loader. With an empty part, the
          menu shows when nothing is found; without one, it closes until
          something matches. Choosing puts a token of the trigger&apos;s type,
          and a space, in place of the trigger and the query.
        </p>
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Keyboard</h2>
        <div
          scTableContainer
          tabindex="0"
          role="region"
          aria-label="Trigger Menu keys"
        >
          <table scTable>
            <thead scTableHeader>
              <tr scTableRow>
                <th scTableHeaderCell>Key</th>
                <th scTableHeaderCell>Does (the caret stays in the editor)</th>
              </tr>
            </thead>
            <tbody scTableBody>
              <tr scTableRow>
                <td scTableCell><kbd scKbd>↓</kbd> / <kbd scKbd>↑</kbd></td>
                <td scTableCell>The next / previous item (wrapping)</td>
              </tr>
              <tr scTableRow>
                <td scTableCell>
                  <kbd scKbd>Enter</kbd> / <kbd scKbd>Tab</kbd>
                </td>
                <td scTableCell>
                  Chooses the highlighted item — Enter never sends while the
                  menu is open
                </td>
              </tr>
              <tr scTableRow>
                <td scTableCell><kbd scKbd>Escape</kbd></td>
                <td scTableCell>Dismisses this trigger</td>
              </tr>
              <tr scTableRow>
                <td scTableCell><kbd scKbd>Ctrl + Space</kbd></td>
                <td scTableCell>Brings a dismissed trigger back</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Accessibility</h2>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            The list is a listbox, its items options; the editor points at it
            (<code scTypeset>aria-autocomplete="list"</code>,
            <code scTypeset>aria-controls</code>) and at the highlighted item
            (<code scTypeset>aria-activedescendant</code>). Name the list.
          </li>
          <li>
            <code scTypeset>scTriggerMenuStatus</code> is a polite live region
            in the popup: write how many were found, or that it is loading; the
            list is <code scTypeset>aria-busy</code> while it loads.
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scTypeset appToc>Examples</h2>
        <app-commands-trigger-menu-demo-container />
        <app-loading-trigger-menu-demo-container />
        <app-rtl-trigger-menu-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>API reference</h2>
        <p>
          Each part takes <code scTypeset>class</code>, merged over its own (cn:
          a later class wins). The popup, the list and the items have the
          style&apos;s combobox look.
        </p>
        <app-parts-table label="Trigger Menu parts" [parts]="parts" />
        <app-api-table label="ScTriggerMenu inputs" [inputs]="inputs" />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class TriggerMenuPage {
  private readonly triggerShape =
    "{ char, type, items, boundary?: 'word' | 'start' }";

  private readonly anatomy = {
    imports:
      "import { ScTriggerMenu, ScTriggerMenuEmpty, ScTriggerMenuItem, ScTriggerMenuList, ScTriggerMenuPopup, ScTriggerMenuPortal, ScTriggerMenuStatus } from '@semantic-components/ui';",
    markup: [
      '<div scTokenInput>',
      '  <div scTokenInputEditor></div>',
      '  <div scTriggerMenu #menu="scTriggerMenu" [triggers]="triggers">',
      '    <ng-template scTriggerMenuPortal>',
      '      <div scTriggerMenuPopup>',
      '        <div scTriggerMenuEmpty>No one found.</div>',
      '        <div scTriggerMenuList aria-label="People">',
      '          @for (item of menu.items(); track item.value) {',
      '            <div scTriggerMenuItem [item]="item">{{ item.label }}</div>',
      '          }',
      '        </div>',
      '        <div scTriggerMenuStatus>…</div>',
      '      </div>',
      '    </ng-template>',
      '  </div>',
      '</div>',
    ].join('\n'),
  };

  private readonly parts = [
    {
      name: 'ScTriggerMenu',
      selector: 'div[scTriggerMenu]',
      description:
        'The root, in a Token Input. exportAs scTriggerMenu: match(), items(), active(), loading(), visible(), pick(); (choose) the item chosen.',
    },
    {
      name: 'ScTriggerMenuPortal',
      selector: 'ng-template[scTriggerMenuPortal]',
      description: 'Its template, stamped at the trigger while one is typed.',
    },
    {
      name: 'ScTriggerMenuPopup',
      selector: 'div[scTriggerMenuPopup]',
      description: 'The popup: below the trigger, above without room.',
    },
    {
      name: 'ScTriggerMenuList',
      selector: 'div[scTriggerMenuList]',
      description: 'The listbox. Name it.',
    },
    {
      name: 'ScTriggerMenuItem',
      selector: 'div[scTriggerMenuItem]',
      description: 'An option: [item], one of menu.items().',
    },
    {
      name: 'ScTriggerMenuEmpty',
      selector: '[scTriggerMenuEmpty]',
      description: 'Shown when nothing is found; keeps the menu open then.',
    },
    {
      name: 'ScTriggerMenuStatus',
      selector: '[scTriggerMenuStatus]',
      description: 'A polite live region (sr-only): your words.',
    },
  ];

  private readonly inputs: ApiInput[] = [
    {
      name: 'triggers',
      type: 'ScTrigger[]',
      default: '—',
      description:
        'The characters that open it: { char, type, items (an array or a loader), boundary? }.',
    },
  ];
}
