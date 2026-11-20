import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScAutocompleteNext,
  ScComboboxEmpty,
  ScComboboxInput,
  ScComboboxItem,
  ScComboboxList,
  ScComboboxPopup,
  ScComboboxPortal,
  ScInput,
  scComboboxMatches,
} from '@semantic-components/ui';

/** autoHighlight: the first suggestion is highlighted as you type — Enter picks it. */
@Component({
  selector: 'app-auto-highlight-autocomplete-next-demo',
  imports: [
    ScAutocompleteNext,
    ScComboboxEmpty,
    ScComboboxInput,
    ScComboboxItem,
    ScComboboxList,
    ScComboboxPopup,
    ScComboboxPortal,
    ScInput,
  ],
  template: `
    <div
      scAutocompleteNext
      #ac="scAutocompleteNext"
      autoHighlight
      [(value)]="country"
      class="w-64"
    >
      <input
        scInput
        scComboboxInput
        aria-label="Country"
        placeholder="Type a country"
      />
      <ng-template scComboboxPortal>
        <div scComboboxPopup>
          <div scComboboxEmpty>No country found.</div>
          <div scComboboxList aria-label="Countries">
            @for (country of matching(ac.query()); track country) {
              <div scComboboxItem [value]="country">{{ country }}</div>
            }
          </div>
        </div>
      </ng-template>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class AutoHighlightAutocompleteNextDemo {
  private readonly country = signal('');
  private readonly countries = [
    'Algeria',
    'Argentina',
    'Australia',
    'Belgium',
    'Brazil',
    'Canada',
    'Egypt',
    'France',
    'Germany',
    'India',
    'Italy',
    'Japan',
    'Mexico',
    'Morocco',
    'Netherlands',
    'Portugal',
    'Spain',
    'Tunisia',
    'United Kingdom',
    'United States',
  ];

  private matching(query: string): string[] {
    return this.countries.filter((name) => scComboboxMatches(name, query));
  }
}
