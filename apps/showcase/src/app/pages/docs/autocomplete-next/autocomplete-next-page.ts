import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScKbd, ScLink, ScTypeset } from '@semantic-components/ui';
import { Anatomy } from '../../../components/anatomy/anatomy';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { PartsTable } from '../../../components/parts-table/parts-table';
import { TocHeading } from '../../../components/toc/toc-heading';
import { AsyncAutocompleteNextDemoContainer } from './demos/async-autocomplete-next-demo-container';
import { AutoHighlightAutocompleteNextDemoContainer } from './demos/auto-highlight-autocomplete-next-demo-container';
import { AutocompleteNextUsageDemoContainer } from './demos/autocomplete-next-usage-demo-container';
import { DisabledAutocompleteNextDemoContainer } from './demos/disabled-autocomplete-next-demo-container';
import { FormAutocompleteNextDemoContainer } from './demos/form-autocomplete-next-demo-container';
import { GroupsAutocompleteNextDemoContainer } from './demos/groups-autocomplete-next-demo-container';
import { InlineAutocompleteNextDemoContainer } from './demos/inline-autocomplete-next-demo-container';
import { InputGroupAutocompleteNextDemoContainer } from './demos/input-group-autocomplete-next-demo-container';
import { LimitAutocompleteNextDemoContainer } from './demos/limit-autocomplete-next-demo-container';
import { RtlAutocompleteNextDemoContainer } from './demos/rtl-autocomplete-next-demo-container';

@Component({
  selector: 'app-autocomplete-next-page',
  imports: [
    ScKbd,
    ScLink,
    RouterLink,
    PartsTable,
    Anatomy,
    AutocompleteNextUsageDemoContainer,
    InlineAutocompleteNextDemoContainer,
    GroupsAutocompleteNextDemoContainer,
    AsyncAutocompleteNextDemoContainer,
    AutoHighlightAutocompleteNextDemoContainer,
    LimitAutocompleteNextDemoContainer,
    FormAutocompleteNextDemoContainer,
    InputGroupAutocompleteNextDemoContainer,
    DisabledAutocompleteNextDemoContainer,
    RtlAutocompleteNextDemoContainer,
    TocHeading,
    ComponentBadges,
    ScTypeset,
  ],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>Autocomplete Next</h1>
        <p class="text-muted-foreground">
          Free text with suggestions: the value is what is typed, and a
          suggestion picked completes it. When the value must be one of the
          options, use the Combobox.
        </p>
        <app-component-badges path="autocomplete-next" />
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Usage</h2>
        <app-autocomplete-next-usage-demo-container />
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
        <app-inline-autocomplete-next-demo-container />
        <app-groups-autocomplete-next-demo-container />
        <app-async-autocomplete-next-demo-container />
        <app-auto-highlight-autocomplete-next-demo-container />
        <app-limit-autocomplete-next-demo-container />
        <app-form-autocomplete-next-demo-container />
        <app-input-group-autocomplete-next-demo-container />
        <app-disabled-autocomplete-next-demo-container />
        <app-rtl-autocomplete-next-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>API reference</h2>
        <p>
          The parts inside are the Combobox&apos;s: see its API reference. Each
          part takes
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">class</code>,
          merged over the style (cn: a later class wins).
        </p>
        <app-parts-table label="Autocomplete Next parts" [parts]="parts" />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class AutocompleteNextPage {
  private readonly anatomy = {
    imports: [
      'import {',
      '  ScAutocompleteNext, ScComboboxInput, ScComboboxPortal, ScComboboxPopup,',
      '  ScComboboxList, ScComboboxItem, ScComboboxEmpty, scComboboxMatches,',
      "} from '@semantic-components/ui';",
    ].join('\n'),
    markup: [
      '<div scAutocompleteNext [formField]="…" #ac="scAutocompleteNext">',
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
      name: 'ScAutocompleteNext',
      selector: 'div[scAutocompleteNext]',
      description:
        "The root: value, the input's text (two-way, or a [formField] of text — required, maxLength… in its schema); mode ('list', 'both': the highlighted suggestion completes the text inline); autoHighlight; openOnInputClick (off); disabled; readonly. exportAs scAutocompleteNext: query(), the text to filter by while open; open().",
    },
    {
      name: 'The Combobox’s parts',
      selector: '[scCombobox…]',
      description:
        'Inside, as in a Combobox: scComboboxInput, Trigger, Clear, Portal, Popup, List, Item, Group, GroupLabel, Separator, Empty, Status. A picked item writes its label into the text.',
    },
  ];
}
