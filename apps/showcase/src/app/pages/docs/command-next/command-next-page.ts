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
import { AsyncCommandNextDemoContainer } from './demos/async-command-next-demo-container';
import { BasicCommandNextDemoContainer } from './demos/basic-command-next-demo-container';
import { CommandNextUsageDemoContainer } from './demos/command-next-usage-demo-container';
import { DialogCommandNextDemoContainer } from './demos/dialog-command-next-demo-container';
import { GroupsCommandNextDemoContainer } from './demos/groups-command-next-demo-container';
import { KeywordsCommandNextDemoContainer } from './demos/keywords-command-next-demo-container';
import { LinksCommandNextDemoContainer } from './demos/links-command-next-demo-container';
import { PagesCommandNextDemoContainer } from './demos/pages-command-next-demo-container';
import { RtlCommandNextDemoContainer } from './demos/rtl-command-next-demo-container';
import { ScrollableCommandNextDemoContainer } from './demos/scrollable-command-next-demo-container';
import { ShortcutsCommandNextDemoContainer } from './demos/shortcuts-command-next-demo-container';

@Component({
  selector: 'app-command-next-page',
  imports: [
    Anatomy,
    CommandNextUsageDemoContainer,
    BasicCommandNextDemoContainer,
    ShortcutsCommandNextDemoContainer,
    GroupsCommandNextDemoContainer,
    ScrollableCommandNextDemoContainer,
    DialogCommandNextDemoContainer,
    KeywordsCommandNextDemoContainer,
    AsyncCommandNextDemoContainer,
    PagesCommandNextDemoContainer,
    LinksCommandNextDemoContainer,
    RtlCommandNextDemoContainer,
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
        <h1 scHeading>Command Next</h1>
        <p class="text-muted-foreground">
          A search over commands: typing filters them, the arrows move the
          highlight, Enter runs it.
        </p>
        <app-component-badges path="command-next" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-command-next-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Anatomy</h2>
        <p class="text-muted-foreground">
          A search and a list of your items, in groups. It filters them itself —
          their text, value and keywords — and keeps your order; a group with no
          match hides, the lines between groups while searching. In a dialog, on
          the dialog itself.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Accessibility</h2>
        <ul class="text-muted-foreground list-disc space-y-2 ps-6">
          <li>
            The search is a combo box and the items a list box: focus stays in
            the search while the highlight moves (aria-activedescendant). Name
            both (aria-label).
          </li>
          <li>
            Up and Down move the highlight (round from the last item with
            loopFocus), Ctrl+N and Ctrl+P (or J and K) too; Alt+Up and Alt+Down
            jump between groups; Enter runs the highlighted item. Home and End
            stay the search&apos;s. The first match is always highlighted.
          </li>
          <li>
            Groups are named by their heading; disabled items are skipped.
          </li>
          <li>
            The status, read and not shown, announces your text about the
            results as they change ("3 results").
          </li>
          <li>
            In a dialog: focus in the search when it opens, Escape closes it,
            focus back to what opened it. Write its title and description
            (sr-only).
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-basic-command-next-demo-container />
        <app-shortcuts-command-next-demo-container />
        <app-groups-command-next-demo-container />
        <app-scrollable-command-next-demo-container />
        <app-dialog-command-next-demo-container />
        <app-keywords-command-next-demo-container />
        <app-async-command-next-demo-container />
        <app-pages-command-next-demo-container />
        <app-links-command-next-demo-container />
        <app-rtl-command-next-demo-container />
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
          aria-label="Command parts"
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
export default class CommandNextPage {
  protected readonly anatomy = {
    imports: [
      'import {',
      '  ScCommandNext, ScCommandNextInputGroup, ScCommandNextInput,',
      '  ScCommandNextList, ScCommandNextEmpty, ScCommandNextGroup,',
      '  ScCommandNextGroupLabel, ScCommandNextItem, ScCommandNextShortcut,',
      '  ScCommandNextSeparator, ScCommandNextStatus, ScCommandNextDialog,',
      "} from '@semantic-components/ui';",
    ].join('\n'),
    markup: [
      '<div scCommandNext #cmd="scCommandNext">',
      '  <div scCommandNextInputGroup>',
      '    <svg siSearchIcon></svg>',
      '    <input scCommandNextInput aria-label="…" />',
      '  </div>',
      '  <div scCommandNextList aria-label="…">',
      '    <div scCommandNextEmpty>…</div>',
      '    <div scCommandNextGroup>',
      '      <div scCommandNextGroupLabel>…</div>',
      '      <div scCommandNextItem (select)="…">',
      '        …',
      '        <span scCommandNextShortcut>…</span>',
      '      </div>',
      '    </div>',
      '    <div scCommandNextSeparator></div>',
      '  </div>',
      '  <div scCommandNextStatus>{{ cmd.count() }} results</div>',
      '</div>',
    ].join('\n'),
  };

  protected readonly parts = [
    {
      name: 'ScCommandNext',
      selector: 'div[scCommandNext]',
      description:
        'The command: it filters its items by the search. filter (text, search, keywords) => boolean, shouldFilter (off: yours, an async search), loopFocus, vimBindings, highlightItemOnHover. exportAs scCommandNext: count(), active(), search().',
    },
    {
      name: 'ScCommandNextInputGroup',
      selector: 'div[scCommandNextInputGroup]',
      description:
        "Around the search: your search icon (an SVG, first) and the input, in the input group's look.",
    },
    {
      name: 'ScCommandNextInput',
      selector: 'input[scCommandNextInput]',
      description:
        'The search (role combobox, aria-activedescendant): [(value)] is its text; the keys move the highlight and run it. Name it.',
    },
    {
      name: 'ScCommandNextList',
      selector: 'div[scCommandNextList]',
      description:
        'The items (role listbox), scrolling past its height, the highlighted one kept in view. Name it.',
    },
    {
      name: 'ScCommandNextEmpty',
      selector: 'div[scCommandNextEmpty]',
      description: 'Your text when no item shows.',
    },
    {
      name: 'ScCommandNextGroup, ScCommandNextGroupLabel',
      selector: 'div[scCommandNextGroup], [scCommandNextGroupLabel]',
      description:
        'Related items (role group), named by the label; hidden while none of its items shows.',
    },
    {
      name: 'ScCommandNextItem',
      selector: 'div[scCommandNextItem], a[scCommandNextItem]',
      description:
        'A command (role option): (select) on Enter or a click — a link is followed. value (what the search matches, its text when not set), keywords, disabled, forceMount (shown whatever the search). data-selected while highlighted.',
    },
    {
      name: 'ScCommandNextShortcut',
      selector: 'span[scCommandNextShortcut]',
      description: 'A key hint at the end of an item: shown, not bound.',
    },
    {
      name: 'ScCommandNextSeparator',
      selector: 'div[scCommandNextSeparator]',
      description: 'A line between groups, hidden while searching; decorative.',
    },
    {
      name: 'ScCommandNextStatus',
      selector: 'div[scCommandNextStatus]',
      description:
        'Read, not shown (a polite live region): your text about the results, outside the list.',
    },
    {
      name: 'ScCommandNextDialog',
      selector: 'div[scCommandNextDialog]',
      description:
        "On the scDialog a command opens in: no padding, the preset's corners; its items' corners follow.",
    },
  ];
}
