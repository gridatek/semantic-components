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
import { AsyncComboboxNextDemoContainer } from './demos/async-combobox-next-demo-container';
import { AutoHighlightComboboxNextDemoContainer } from './demos/auto-highlight-combobox-next-demo-container';
import { ClearComboboxNextDemoContainer } from './demos/clear-combobox-next-demo-container';
import { ComboboxNextUsageDemoContainer } from './demos/combobox-next-usage-demo-container';
import { CustomComboboxNextDemoContainer } from './demos/custom-combobox-next-demo-container';
import { DisabledComboboxNextDemoContainer } from './demos/disabled-combobox-next-demo-container';
import { FormComboboxNextDemoContainer } from './demos/form-combobox-next-demo-container';
import { GroupsComboboxNextDemoContainer } from './demos/groups-combobox-next-demo-container';
import { InputGroupComboboxNextDemoContainer } from './demos/input-group-combobox-next-demo-container';
import { InvalidComboboxNextDemoContainer } from './demos/invalid-combobox-next-demo-container';
import { MultipleComboboxNextDemoContainer } from './demos/multiple-combobox-next-demo-container';
import { PopupComboboxNextDemoContainer } from './demos/popup-combobox-next-demo-container';
import { RtlComboboxNextDemoContainer } from './demos/rtl-combobox-next-demo-container';

@Component({
  selector: 'app-combobox-next-page',
  imports: [
    Anatomy,
    ComboboxNextUsageDemoContainer,
    MultipleComboboxNextDemoContainer,
    ClearComboboxNextDemoContainer,
    GroupsComboboxNextDemoContainer,
    CustomComboboxNextDemoContainer,
    InvalidComboboxNextDemoContainer,
    DisabledComboboxNextDemoContainer,
    AutoHighlightComboboxNextDemoContainer,
    PopupComboboxNextDemoContainer,
    InputGroupComboboxNextDemoContainer,
    FormComboboxNextDemoContainer,
    AsyncComboboxNextDemoContainer,
    RtlComboboxNextDemoContainer,
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
        <h1 scHeading>Combobox Next</h1>
        <p class="text-muted-foreground">
          A select to filter: an input over a list of options, one or several of
          which are its value.
        </p>
        <app-component-badges path="combobox-next" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-combobox-next-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Anatomy</h2>
        <p class="text-muted-foreground">
          Base UI&apos;s Combobox, on Angular Aria&apos;s Combobox and Listbox.
          Its value is one of its options, never free text (that is an
          autocomplete). The input goes in our input group, with a trigger and a
          clear button at its end; the popup hangs from it. You filter the
          options, by the text typed since the list opened: query().
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
        <p class="text-muted-foreground">
          Several values (multiple): chips, then the input.
        </p>
        <app-anatomy [imports]="chips.imports" [markup]="chips.markup" />
        <p class="text-muted-foreground">
          A trigger showing the value, the search inside the popup: the trigger
          takes the field&apos;s look by itself, and in a field its label names
          it and the popup. Angular Aria renders a combobox&apos;s list from a
          template, so the list goes in a list content template beside the
          search.
        </p>
        <app-anatomy [imports]="inside.imports" [markup]="inside.markup" />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Accessibility</h2>
        <ul class="text-muted-foreground list-disc space-y-2 ps-6">
          <li>
            The input is a combo box, the options a list box: focus stays in the
            input while the highlight moves (aria-activedescendant). Name the
            input (a label in a field, or aria-label) and the list.
          </li>
          <li>
            Down opens the list; Up and Down move the highlight (round with
            loopFocus), Home and End to its ends; Enter picks; Escape closes,
            and the input shows the value again.
          </li>
          <li>
            Several values: Backspace in the empty input removes the last chip;
            the arrow towards the chips reaches their remove buttons, the arrows
            move between them, Backspace or Delete removes one. One tab stop.
          </li>
          <li>
            The chevron and the clear button are not tab stops: the keyboard
            opens with Down and clears by emptying the input.
          </li>
          <li>
            With the search inside the popup, the trigger opens a dialog; focus
            goes to the search, and back to the trigger on Escape or a pick. In
            a field, the trigger is named by the label and the value it shows,
            the dialog by the label; without one, name them (aria-labelledby
            with the value&apos;s id on the trigger: an aria-label alone leaves
            its text out of its name).
          </li>
          <li>
            Invalid once touched (aria-invalid on the input, or the trigger),
            with Signal Forms on the combobox.
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-multiple-combobox-next-demo-container />
        <app-clear-combobox-next-demo-container />
        <app-groups-combobox-next-demo-container />
        <app-custom-combobox-next-demo-container />
        <app-invalid-combobox-next-demo-container />
        <app-disabled-combobox-next-demo-container />
        <app-auto-highlight-combobox-next-demo-container />
        <app-popup-combobox-next-demo-container />
        <app-input-group-combobox-next-demo-container />
        <app-form-combobox-next-demo-container />
        <app-async-combobox-next-demo-container />
        <app-rtl-combobox-next-demo-container />
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
          aria-label="Combobox parts"
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
export default class ComboboxNextPage {
  protected readonly anatomy = {
    imports: [
      'import {',
      '  ScComboboxNext, ScComboboxNextInput, ScComboboxNextTrigger, ScComboboxNextClear,',
      '  ScComboboxNextPortal, ScComboboxNextPopup, ScComboboxNextEmpty, ScComboboxNextList,',
      '  ScComboboxNextGroup, ScComboboxNextGroupLabel, ScComboboxNextSeparator,',
      '  ScComboboxNextItem, ScComboboxNextItemIndicator, scComboboxNextMatches,',
      "} from '@semantic-components/ui';",
    ].join('\n'),
    markup: [
      '<div scComboboxNext #cb="scComboboxNext" [formField]="…">',
      '  <div scInputGroup>',
      '    <input scInput scComboboxNextInput />',
      '    <div scInputGroupAddon align="inline-end">',
      '      <button scComboboxNextTrigger>…</button>',
      '      <button scComboboxNextClear>…</button>',
      '    </div>',
      '  </div>',
      '  <ng-template scComboboxNextPortal>',
      '    <div scComboboxNextPopup>',
      '      <div scComboboxNextEmpty>…</div>',
      '      <div scComboboxNextList aria-label="…">',
      '        <div scComboboxNextGroup>',
      '          <div scComboboxNextGroupLabel>…</div>',
      '          @for (item of matching(cb.query()); track item) {',
      '            <div scComboboxNextItem [value]="item">',
      '              …',
      '              <span scComboboxNextItemIndicator>…</span>',
      '            </div>',
      '          }',
      '        </div>',
      '        <div scComboboxNextSeparator></div>',
      '      </div>',
      '    </div>',
      '  </ng-template>',
      '</div>',
    ].join('\n'),
  };

  protected readonly chips = {
    imports:
      "import { ScComboboxNextMultiple, ScComboboxNextChips, ScComboboxNextChip, ScComboboxNextChipRemove } from '@semantic-components/ui';",
    markup: [
      '<div scComboboxNext multiple [(value)]="values">',
      '  <div scComboboxNextChips>',
      '    @for (value of values(); track value) {',
      '      <span scComboboxNextChip [value]="value">',
      '        …',
      '        <button scComboboxNextChipRemove>…</button>',
      '      </span>',
      '    }',
      '    <input scComboboxNextInput aria-label="…" />',
      '  </div>',
      '  <ng-template scComboboxNextPortal>…</ng-template>',
      '</div>',
    ].join('\n'),
  };

  protected readonly inside = {
    imports:
      "import { ScComboboxNextValue, ScComboboxNextListContent } from '@semantic-components/ui';",
    markup: [
      '<div scField>',
      '  <label scLabel>…</label>',
      '  <div scComboboxNext #cb="scComboboxNext">',
      '    <button scComboboxNextTrigger>',
      '      <span scComboboxNextValue placeholder="…"></span>',
      '      …',
      '    </button>',
      '    <ng-template scComboboxNextPortal>',
      '      <div scComboboxNextPopup>',
      '        <div scInputGroup><input scInput scComboboxNextInput aria-label="…" /></div>',
      '        <div scComboboxNextEmpty>…</div>',
      '        <ng-template scComboboxNextListContent>',
      '          <div scComboboxNextList aria-label="…">…</div>',
      '        </ng-template>',
      '      </div>',
      '    </ng-template>',
      '  </div>',
      '</div>',
    ].join('\n'),
  };

  protected readonly parts = [
    {
      name: 'ScComboboxNext',
      selector: 'div[scComboboxNext]',
      description:
        "One value (null when none): [formField] or [(value)]. [(inputValue)], [(open)], itemToStringLabel (a value's label: the options' texts are only known once the list has opened), isItemEqualToValue, autoHighlight, highlightItemOnHover, loopFocus, openOnInputClick. exportAs scComboboxNext: query() (the text typed since it opened, to filter by), selectedLabel(), show(), close(), clear().",
    },
    {
      name: 'ScComboboxNextMultiple',
      selector: 'div[scComboboxNext][multiple]',
      description:
        'Several values: an array. The same inputs; picking adds or removes and keeps the list open.',
    },
    {
      name: 'ScComboboxNextInput',
      selector: 'input[scComboboxNextInput]',
      description:
        "The input (Aria's Combobox). With scInput in a scInputGroup: the field. After the chips: the field of several values. Inside the popup: the search a trigger opens.",
    },
    {
      name: 'ScComboboxNextTrigger',
      selector: 'button[scComboboxNextTrigger]',
      description:
        "Opens and closes the list: the preset's button (variant, size). Beside the input, the chevron (ghost, icon-xs) — not a tab stop. With no input in the field, the field itself (outline, as wide as the combobox), holding a scComboboxNextValue; in a scField, named by its label and its value.",
    },
    {
      name: 'ScComboboxNextValue',
      selector: 'span[scComboboxNextValue]',
      description:
        "In a trigger: the selected value's label, or its placeholder; your content shows the value your way.",
    },
    {
      name: 'ScComboboxNextClear',
      selector: 'button[scComboboxNextClear]',
      description:
        "Clears the value: the preset's button, shown only while there is a value, in the trigger's place. Write its icon and name it.",
    },
    {
      name: 'ScComboboxNextChips, ScComboboxNextChip, ScComboboxNextChipRemove',
      selector: 'div[…], span[scComboboxNextChip], button[…]',
      description:
        'The field of several values, a chip for each (value), and its remove button (write its icon and name it).',
    },
    {
      name: 'ScComboboxNextPortal, ScComboboxNextPopup',
      selector: 'ng-template[…], div[scComboboxNextPopup]',
      description:
        "The popup, rendered while open: as wide as its field, below it (above without room). data-empty while no option is rendered. With the search inside, a dialog named by the field's label (or its aria-label).",
    },
    {
      name: 'ScComboboxNextListContent',
      selector: 'ng-template[scComboboxNextListContent]',
      description:
        'The list, rendered by the search beside it: only when the search is inside the popup.',
    },
    {
      name: 'ScComboboxNextList',
      selector: 'div[scComboboxNextList]',
      description:
        "The options (Aria's Listbox), scrolling past its height; its scrollbar shown (hideScrollbar hides it, as shadcn). Name it.",
    },
    {
      name: 'ScComboboxNextItem, ScComboboxNextItemIndicator',
      selector: 'div[scComboboxNextItem], span[…]',
      description:
        'An option (Aria\'s Option): value, label (its text when not set), disabled; data-active="true" highlighted. The indicator, round your check icon, shows on a selected one.',
    },
    {
      name: 'ScComboboxNextGroup, ScComboboxNextGroupLabel, ScComboboxNextSeparator',
      selector: 'div[…]',
      description:
        'Options in a group named by its label; a line between groups.',
    },
    {
      name: 'ScComboboxNextEmpty, ScComboboxNextStatus',
      selector: 'div[…]',
      description:
        'Your text when no option is rendered; a text read out and not shown, for the results or a search running.',
    },
    {
      name: 'scComboboxNextMatches',
      selector: 'function',
      description:
        '(text, query) => boolean: a match, accents and case ignored — for filtering your options by query().',
    },
  ];
}
