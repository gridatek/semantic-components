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
import { ActivationListboxDemoContainer } from './demos/activation-listbox-demo-container';
import { DeselectableListboxDemoContainer } from './demos/deselectable-listbox-demo-container';
import { DisabledListboxDemoContainer } from './demos/disabled-listbox-demo-container';
import { FormListboxDemoContainer } from './demos/form-listbox-demo-container';
import { GroupsListboxDemoContainer } from './demos/groups-listbox-demo-container';
import { HorizontalListboxDemoContainer } from './demos/horizontal-listbox-demo-container';
import { IconsListboxDemoContainer } from './demos/icons-listbox-demo-container';
import { ListboxUsageDemoContainer } from './demos/listbox-usage-demo-container';
import { ManualListboxDemoContainer } from './demos/manual-listbox-demo-container';
import { MethodsListboxDemoContainer } from './demos/methods-listbox-demo-container';
import { MultipleListboxDemoContainer } from './demos/multiple-listbox-demo-container';
import { ObjectValuesListboxDemoContainer } from './demos/object-values-listbox-demo-container';
import { ReadOnlyListboxDemoContainer } from './demos/read-only-listbox-demo-container';
import { RtlListboxDemoContainer } from './demos/rtl-listbox-demo-container';
import { ScrollableListboxDemoContainer } from './demos/scrollable-listbox-demo-container';
import { VirtualFocusListboxDemoContainer } from './demos/virtual-focus-listbox-demo-container';

@Component({
  selector: 'app-listbox-page',
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
    ListboxUsageDemoContainer,
    MultipleListboxDemoContainer,
    ActivationListboxDemoContainer,
    ManualListboxDemoContainer,
    VirtualFocusListboxDemoContainer,
    DeselectableListboxDemoContainer,
    GroupsListboxDemoContainer,
    IconsListboxDemoContainer,
    HorizontalListboxDemoContainer,
    DisabledListboxDemoContainer,
    ReadOnlyListboxDemoContainer,
    FormListboxDemoContainer,
    ObjectValuesListboxDemoContainer,
    MethodsListboxDemoContainer,
    ScrollableListboxDemoContainer,
    RtlListboxDemoContainer,
  ],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>Listbox</h1>
        <p class="text-muted-foreground">
          One option or several, chosen from a list always in view — like a
          native select with several rows. In a form, the value chosen, or the
          values.
        </p>
        <app-component-badges path="listbox" />
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Usage</h2>
        <app-listbox-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Anatomy</h2>
        <p>
          The list holds options only — and groups, separators. Buttons, a
          search, an empty message go beside it.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Choosing</h2>
        <p>
          <code scTypeset>scListbox</code> holds one value (or
          <code scTypeset>null</code>);
          <code scTypeset>scListbox multiple</code> an array, in the list&apos;s
          order. With <code scTypeset>activation</code>
          <code scTypeset>automatic</code> — one value&apos;s default — the
          option under focus is chosen; with <code scTypeset>manual</code> —
          several&apos;s default — Space, Enter or a click chooses.
          <code scTypeset>deselectable</code> lets the chosen option be pressed
          off. In a form, an empty array is not <em>empty</em> to Signal
          Forms&apos; <code scTypeset>required()</code>: use
          <code scTypeset>minLength(path, 1)</code>.
        </p>
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Keyboard</h2>
        <div
          scTableContainer
          tabindex="0"
          role="region"
          aria-label="Listbox keys"
        >
          <table scTable>
            <thead scTableHeader>
              <tr scTableRow>
                <th scTableHeaderCell>Key</th>
                <th scTableHeaderCell>Does</th>
              </tr>
            </thead>
            <tbody scTableBody>
              <tr scTableRow>
                <td scTableCell>
                  <kbd scKbd>↑</kbd> <kbd scKbd>↓</kbd> (<kbd scKbd>←</kbd>
                  <kbd scKbd>→</kbd> horizontal)
                </td>
                <td scTableCell>
                  The previous / next option (wrapping, unless
                  <code scTypeset>loop</code> is off)
                </td>
              </tr>
              <tr scTableRow>
                <td scTableCell>
                  <kbd scKbd>Home</kbd> / <kbd scKbd>End</kbd>
                </td>
                <td scTableCell>The first / last option</td>
              </tr>
              <tr scTableRow>
                <td scTableCell>Letters</td>
                <td scTableCell>The next option starting with them</td>
              </tr>
              <tr scTableRow>
                <td scTableCell>
                  <kbd scKbd>Space</kbd> / <kbd scKbd>Enter</kbd>
                </td>
                <td scTableCell>Chooses (toggles, with several)</td>
              </tr>
              <tr scTableRow>
                <td scTableCell>
                  <kbd scKbd>Shift + ↑</kbd> <kbd scKbd>Shift + ↓</kbd>
                </td>
                <td scTableCell>With several: a range</td>
              </tr>
              <tr scTableRow>
                <td scTableCell>
                  <kbd scKbd>Ctrl + Shift + Home</kbd> /
                  <kbd scKbd>Ctrl + Shift + End</kbd>
                </td>
                <td scTableCell>With several: the range to the first / last</td>
              </tr>
              <tr scTableRow>
                <td scTableCell><kbd scKbd>Ctrl + A</kbd></td>
                <td scTableCell>With several: all (again: none)</td>
              </tr>
              <tr scTableRow>
                <td scTableCell>
                  <kbd scKbd>Ctrl + ↑</kbd> <kbd scKbd>Ctrl + ↓</kbd>,
                  <kbd scKbd>Ctrl + Space</kbd>
                </td>
                <td scTableCell>
                  With several, automatic: move without choosing; toggle
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Accessibility</h2>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            A listbox (multiselectable with several), its options saying whether
            they are chosen; named by its field&apos;s label or
            <code scTypeset>aria-label</code>.
          </li>
          <li>
            One Tab stop: the chosen option (or the first). With
            <code scTypeset>virtualFocus</code>, focus stays on the list, which
            points at the option under it.
          </li>
          <li>
            Groups are named by their label; separators and icons are hidden
            from screen readers; the check is decorative.
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scTypeset appToc>Examples</h2>
        <app-multiple-listbox-demo-container />
        <app-activation-listbox-demo-container />
        <app-manual-listbox-demo-container />
        <app-virtual-focus-listbox-demo-container />
        <app-deselectable-listbox-demo-container />
        <app-groups-listbox-demo-container />
        <app-icons-listbox-demo-container />
        <app-horizontal-listbox-demo-container />
        <app-disabled-listbox-demo-container />
        <app-read-only-listbox-demo-container />
        <app-form-listbox-demo-container />
        <app-object-values-listbox-demo-container />
        <app-methods-listbox-demo-container />
        <app-scrollable-listbox-demo-container />
        <app-rtl-listbox-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>API reference</h2>
        <p>
          Each part takes <code scTypeset>class</code>, merged over its own (cn:
          a later class wins). The box is the style&apos;s (<code scTypeset
            >listbox</code
          >, as its textarea); options, indicator, group labels and separators
          are its combobox&apos;s.
        </p>
        <app-parts-table label="Listbox parts" [parts]="parts" />
        <app-api-table label="ScListbox inputs" [inputs]="inputs" />
        <app-api-table label="ScListboxItem inputs" [inputs]="itemInputs" />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class ListboxPage {
  private readonly anatomy = {
    imports:
      "import { ScListbox, ScListboxGroup, ScListboxGroupLabel, ScListboxItem, ScListboxItemIcon, ScListboxItemIndicator, ScListboxMultiple, ScListboxSeparator } from '@semantic-components/ui';",
    markup: [
      '<div scListbox [formField]="form.topping">',
      '  <div scListboxGroup>',
      '    <div scListboxGroupLabel>Cheeses</div>',
      '    <div scListboxItem value="brie">',
      '      <span scListboxItemIcon><svg …></svg></span>',
      '      Brie',
      '      <span scListboxItemIndicator><svg siCheckIcon></svg></span>',
      '    </div>',
      '  </div>',
      '  <div scListboxSeparator></div>',
      '</div>',
    ].join('\n'),
  };

  private readonly parts = [
    {
      name: 'ScListbox',
      selector: 'div[scListbox]',
      description:
        'The list, one value (T | null). exportAs scListbox: clear(), focus().',
    },
    {
      name: 'ScListboxMultiple',
      selector: 'div[scListbox][multiple]',
      description:
        'The list, several values (T[]). exportAs scListbox: selectAll(), clear(), focus().',
    },
    {
      name: 'ScListboxItem',
      selector: '[scListboxItem]',
      description:
        'An option: [value], label, disabled. data-selected, data-active.',
    },
    {
      name: 'ScListboxItemIndicator',
      selector: '[scListboxItemIndicator]',
      description: 'Its content shown while the option is chosen.',
    },
    {
      name: 'ScListboxItemIcon',
      selector: '[scListboxItemIcon]',
      description: 'An icon at the start: hidden from screen readers; mirror.',
    },
    {
      name: 'ScListboxGroup',
      selector: 'div[scListboxGroup]',
      description: 'Options together, named by their label.',
    },
    {
      name: 'ScListboxGroupLabel',
      selector: '[scListboxGroupLabel]',
      description: "A group's name.",
    },
    {
      name: 'ScListboxSeparator',
      selector: '[scListboxSeparator]',
      description: 'A line between groups; hidden from screen readers.',
    },
  ];

  private readonly inputs: ApiInput[] = [
    {
      name: 'value',
      type: 'T | null (several: T[])',
      default: 'null ([])',
      description: 'Two-way, or [formField].',
    },
    {
      name: 'activation',
      type: "'automatic' | 'manual'",
      default: 'automatic (several: manual)',
      description: 'Whether the option under focus is chosen.',
    },
    {
      name: 'deselectable',
      type: 'boolean',
      default: 'false',
      description: 'One value: the chosen option, pressed again, is not.',
    },
    {
      name: 'orientation',
      type: "'vertical' | 'horizontal'",
      default: "'vertical'",
      description: 'Which arrows move.',
    },
    {
      name: 'loop',
      type: 'boolean',
      default: 'true',
      description: 'The arrows wrap.',
    },
    {
      name: 'virtualFocus',
      type: 'boolean',
      default: 'false',
      description: 'Focus stays on the list (aria-activedescendant).',
    },
    {
      name: 'disabled, readonly, required, invalid, touched',
      type: 'boolean',
      default: 'false',
      description: 'Bound by [formField].',
    },
  ];

  private readonly itemInputs: ApiInput[] = [
    {
      name: 'value',
      type: 'T',
      default: '—',
      description: 'Required: what choosing it gives.',
    },
    {
      name: 'label',
      type: 'string',
      default: 'its text',
      description: 'What typing finds it by.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Not chosen; skipped by the arrows, typing and ranges.',
    },
  ];
}
