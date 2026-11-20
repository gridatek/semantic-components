import { JsonPipe } from '@angular/common';
import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form, maxLength, required } from '@angular/forms/signals';
import {
  ScAutocomplete,
  ScComboboxEmpty,
  ScComboboxInput,
  ScComboboxItem,
  ScComboboxList,
  ScComboboxPopup,
  ScComboboxPortal,
  ScField,
  ScFieldDescription,
  ScFieldErrors,
  ScFrame,
  ScInput,
  ScLabel,
  scComboboxMatches,
} from '@semantic-components/ui';

/** A Signal Forms field of text: required and maxLength in the schema, the errors once touched. */
@Component({
  selector: 'app-form-autocomplete-demo',
  imports: [
    FormField,
    JsonPipe,
    ScAutocomplete,
    ScComboboxEmpty,
    ScComboboxInput,
    ScComboboxItem,
    ScComboboxList,
    ScComboboxPopup,
    ScComboboxPortal,
    ScInput,
    ScField,
    ScFieldDescription,
    ScFieldErrors,
    ScFrame,
    ScLabel,
  ],
  template: `
    <div class="flex w-72 flex-col gap-4">
      <div scField>
        <label scLabel>Destination</label>
        <div
          scAutocomplete
          #ac="scAutocomplete"
          [formField]="tripForm.destination"
        >
          <input scInput scComboboxInput placeholder="A country, or anywhere" />
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
        <p scFieldDescription>Pick a country, or write your own.</p>
        <div scFieldErrors></div>
      </div>
      <pre scFrame class="bg-muted p-4 text-xs">{{ model() | json }}</pre>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class FormAutocompleteDemo {
  private readonly model = signal({ destination: '' });
  private readonly tripForm = form(this.model, (path) => {
    required(path.destination, { message: 'Where are you going?' });
    maxLength(path.destination, 40, { message: 'At most 40 characters.' });
  });
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
