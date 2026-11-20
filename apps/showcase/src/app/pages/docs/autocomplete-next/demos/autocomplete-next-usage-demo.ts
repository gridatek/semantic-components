import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScAutocompleteNext,
  ScComboboxEmpty,
  ScComboboxInput,
  ScComboboxItem,
  ScComboboxList,
  ScComboboxPopup,
  ScComboboxPortal,
  ScField,
  ScInput,
  ScLabel,
  scComboboxMatches,
} from '@semantic-components/ui';

/** Free text with suggestions: the value is what is typed; a suggestion picked writes its label. */
@Component({
  selector: 'app-autocomplete-next-usage-demo',
  imports: [
    ScAutocompleteNext,
    ScComboboxEmpty,
    ScComboboxInput,
    ScComboboxItem,
    ScComboboxList,
    ScComboboxPopup,
    ScComboboxPortal,
    ScInput,
    ScField,
    ScLabel,
  ],
  template: `
    <div class="flex w-64 flex-col gap-3">
      <div scField>
        <label scLabel>Country</label>
        <div scAutocompleteNext #ac="scAutocompleteNext" [(value)]="country">
          <input scInput scComboboxInput placeholder="Type a country" />
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
      </div>
      <p class="text-muted-foreground text-sm">Value: “{{ country() }}”</p>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class AutocompleteNextUsageDemo {
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
