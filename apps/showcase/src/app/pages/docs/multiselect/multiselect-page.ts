import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScKbd, ScLink, ScTypeset } from '@semantic-components/ui';
import { Anatomy } from '../../../components/anatomy/anatomy';
import { TocHeading } from '../../../components/toc/toc-heading';
import { FormMultiselectDemoContainer } from './demos/form-multiselect-demo-container';
import { MultiselectUsageDemoContainer } from './demos/multiselect-usage-demo-container';
import { RtlMultiselectDemoContainer } from './demos/rtl-multiselect-demo-container';
import { SelectAllMultiselectDemoContainer } from './demos/select-all-multiselect-demo-container';

@Component({
  selector: 'app-multiselect-page',
  imports: [
    Anatomy,
    RouterLink,
    ScKbd,
    ScLink,
    ScTypeset,
    MultiselectUsageDemoContainer,
    FormMultiselectDemoContainer,
    SelectAllMultiselectDemoContainer,
    RtlMultiselectDemoContainer,
    TocHeading,
  ],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>Multiselect</h1>
        <p class="text-muted-foreground">
          A recipe: several values from a list, an array for Signal Forms — the
          <a scLink routerLink="/docs/components/combobox">Combobox</a> with
          several values: chips for the chosen, a search for the list. No
          component of its own.
        </p>
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Usage</h2>
        <app-multiselect-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>How it is made</h2>
        <p>
          scCombobox with
          <code scTypeset>multiple</code>
          holds the value, an array: the chips show it (each with its remove
          button), the input searches, and the list stays open while options are
          checked. Its value is two-way or a [formField]; your buttons can set
          it too (Select all, Clear).
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Accessibility</h2>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            The Combobox&apos;s: one tab stop; <kbd scKbd>↓</kbd> opens the
            list, <kbd scKbd>Enter</kbd> checks or unchecks the option,
            <kbd scKbd>Escape</kbd> closes it; the list is multi-selectable.
          </li>
          <li>
            <kbd scKbd>Backspace</kbd> in an empty input removes the last chip;
            <kbd scKbd>←</kbd> and <kbd scKbd>→</kbd> reach the chips, each
            remove button named by you («Remove Bug»).
          </li>
          <li>Name it: a field&apos;s label, or aria-label on the input.</li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scTypeset appToc>Examples</h2>
        <app-form-multiselect-demo-container />
        <app-select-all-multiselect-demo-container />
        <app-rtl-multiselect-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class MultiselectPage {
  private readonly anatomy = {
    imports: [
      'import {',
      '  ScComboboxMultiple, ScComboboxChips, ScComboboxChip, ScComboboxChipRemove, ScComboboxInput,',
      '  ScComboboxPortal, ScComboboxPopup, ScComboboxEmpty, ScComboboxList,',
      '  ScComboboxItem, ScComboboxItemIndicator,',
      "} from '@semantic-components/ui';",
    ].join('\n'),
    markup: [
      '<div scCombobox multiple #picker="scCombobox" [(value)]="labels">',
      '  <div scComboboxChips>',
      '    @for (item of picker.value(); track item) {',
      '      <span scComboboxChip [value]="item">',
      '        {{ item }} <button scComboboxChipRemove>…</button>',
      '      </span>',
      '    }',
      '    <input scComboboxInput aria-label="Labels" />',
      '  </div>',
      '  <ng-template scComboboxPortal>',
      '    <div scComboboxPopup>',
      '      <div scComboboxList aria-label="Labels">',
      '        <div scComboboxItem value="Bug">Bug <span scComboboxItemIndicator>…</span></div>',
      '      </div>',
      '    </div>',
      '  </ng-template>',
      '</div>',
    ].join('\n'),
  };
}
