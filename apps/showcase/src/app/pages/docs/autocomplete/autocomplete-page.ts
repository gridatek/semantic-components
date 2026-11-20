import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScKbd, ScLink, ScTypeset } from '@semantic-components/ui';
import { Anatomy } from '../../../components/anatomy/anatomy';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { PartsTable } from '../../../components/parts-table/parts-table';
import { TocHeading } from '../../../components/toc/toc-heading';
import { AsyncAutocompleteDemoContainer } from './demos/async-autocomplete-demo-container';
import { AutoHighlightAutocompleteDemoContainer } from './demos/auto-highlight-autocomplete-demo-container';
import { AutocompleteUsageDemoContainer } from './demos/autocomplete-usage-demo-container';
import { DisabledAutocompleteDemoContainer } from './demos/disabled-autocomplete-demo-container';
import { FormAutocompleteDemoContainer } from './demos/form-autocomplete-demo-container';
import { GroupsAutocompleteDemoContainer } from './demos/groups-autocomplete-demo-container';
import { InlineAutocompleteDemoContainer } from './demos/inline-autocomplete-demo-container';
import { InputGroupAutocompleteDemoContainer } from './demos/input-group-autocomplete-demo-container';
import { LimitAutocompleteDemoContainer } from './demos/limit-autocomplete-demo-container';
import { RtlAutocompleteDemoContainer } from './demos/rtl-autocomplete-demo-container';

@Component({
  selector: 'app-autocomplete-page',
  imports: [
    ScKbd,
    ScLink,
    RouterLink,
    PartsTable,
    Anatomy,
    AutocompleteUsageDemoContainer,
    InlineAutocompleteDemoContainer,
    GroupsAutocompleteDemoContainer,
    AsyncAutocompleteDemoContainer,
    AutoHighlightAutocompleteDemoContainer,
    LimitAutocompleteDemoContainer,
    FormAutocompleteDemoContainer,
    InputGroupAutocompleteDemoContainer,
    DisabledAutocompleteDemoContainer,
    RtlAutocompleteDemoContainer,
    TocHeading,
    ComponentBadges,
    ScTypeset,
  ],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>Autocomplete</h1>
        <p class="text-muted-foreground">
          Free text with suggestions: the value is what is typed, and a
          suggestion picked completes it. When the value must be one of the
          options, use the Combobox.
        </p>
        <app-component-badges path="autocomplete" />
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Usage</h2>
        <app-autocomplete-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Anatomy</h2>
        <p>
          A root holding the text, and inside it the
          <a scLink routerLink="/docs/components/combobox">Combobox</a>&apos;s
          parts as they are: the input, the popup, the list and its items,
          groups, an empty text, a status. You filter the suggestions by
          query().
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Accessibility</h2>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            WAI-ARIA&apos;s editable combobox: focus stays in the input.
            <kbd scKbd>↓</kbd> and <kbd scKbd>↑</kbd> open the list and move the
            highlight, <kbd scKbd>Enter</kbd> picks,
            <kbd scKbd>Escape</kbd> closes.
          </li>
          <li>
            aria-autocomplete says how it completes: list, or both with
            mode="both" — the highlighted suggestion typed in, selected.
          </li>
          <li>
            Name the input (its field&apos;s label, or aria-label) and the list;
            a status (scComboboxStatus) reads out what you write, such as the
            number of results.
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scTypeset appToc>Examples</h2>
        <app-inline-autocomplete-demo-container />
        <app-groups-autocomplete-demo-container />
        <app-async-autocomplete-demo-container />
        <app-auto-highlight-autocomplete-demo-container />
        <app-limit-autocomplete-demo-container />
        <app-form-autocomplete-demo-container />
        <app-input-group-autocomplete-demo-container />
        <app-disabled-autocomplete-demo-container />
        <app-rtl-autocomplete-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>API reference</h2>
        <p>
          The parts inside are the Combobox&apos;s: see its API reference. Each
          part takes
          <code scTypeset>class</code>, merged over the style (cn: a later class
          wins).
        </p>
        <app-parts-table label="Autocomplete parts" [parts]="parts" />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class AutocompletePage {
  private readonly anatomy = {
    imports: [
      'import {',
      '  ScAutocomplete, ScComboboxInput, ScComboboxPortal, ScComboboxPopup,',
      '  ScComboboxList, ScComboboxItem, ScComboboxEmpty, scComboboxMatches,',
      "} from '@semantic-components/ui';",
    ].join('\n'),
    markup: [
      '<div scAutocomplete [formField]="…" #ac="scAutocomplete">',
      '  <input scInput scComboboxInput />',
      '  <ng-template scComboboxPortal>',
      '    <div scComboboxPopup>',
      '      <div scComboboxEmpty>…</div>',
      '      <div scComboboxList aria-label="…">',
      '        @for (item of matching(ac.query()); track item) {',
      '          <div scComboboxItem [value]="item">{{ item }}</div>',
      '        }',
      '      </div>',
      '    </div>',
      '  </ng-template>',
      '</div>',
    ].join('\n'),
  };

  private readonly parts = [
    {
      name: 'ScAutocomplete',
      selector: 'div[scAutocomplete]',
      description:
        "The root: value, the input's text (two-way, or a [formField] of text — required, maxLength… in its schema); mode ('list', 'both': the highlighted suggestion completes the text inline); autoHighlight; openOnInputClick (off); disabled; readonly. exportAs scAutocomplete: query(), the text to filter by while open; open().",
    },
    {
      name: 'The Combobox’s parts',
      selector: '[scCombobox…]',
      description:
        'Inside, as in a Combobox: scComboboxInput, Trigger, Clear, Portal, Popup, List, Item, Group, GroupLabel, Separator, Empty, Status. A picked item writes its label into the text.',
    },
  ];
}
