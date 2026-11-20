import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { InputGroupAutocompleteNextDemo } from './input-group-autocomplete-next-demo';

@Component({
  selector: 'app-input-group-autocomplete-next-demo-container',
  imports: [DemoContainer, InputGroupAutocompleteNextDemo],
  template: `
    <app-demo-container
      title="Icon and clear"
      demoUrl="/demos/autocomplete-next/input-group-autocomplete-next-demo"
      [code]="code"
    >
      <app-input-group-autocomplete-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class InputGroupAutocompleteNextDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScAutocompleteNext,
  ScComboboxClear,
  ScComboboxEmpty,
  ScComboboxInput,
  ScComboboxItem,
  ScComboboxList,
  ScComboboxPopup,
  ScComboboxPortal,
  ScInput,
  ScInputGroup,
  ScInputGroupAddon,
  scComboboxMatches,
} from '@semantic-components/ui';
import { SiSearchIcon, SiXIcon } from '@semantic-icons/lucide-icons';

/** In an input group: a search icon, and the Combobox’s clear button (shown with text). */
@Component({
  selector: 'app-input-group-autocomplete-next-demo',
  imports: [
    ScAutocompleteNext,
    ScComboboxEmpty,
    ScComboboxInput,
    ScComboboxItem,
    ScComboboxList,
    ScComboboxPopup,
    ScComboboxPortal,
    ScInput,
    ScComboboxClear,
    ScInputGroup,
    ScInputGroupAddon,
    SiSearchIcon,
    SiXIcon,
  ],
  template: \`
    <div
      scAutocompleteNext
      #ac="scAutocompleteNext"
      [(value)]="country"
      class="w-64"
    >
      <div scInputGroup>
        <div scInputGroupAddon side="inline-start">
          <svg siSearchIcon></svg>
        </div>
        <input
          scInput
          scComboboxInput
          aria-label="Country"
          placeholder="Search a country"
        />
        <div scInputGroupAddon side="inline-end">
          <button scComboboxClear>
            <svg siXIcon></svg>
            <span class="sr-only">Clear</span>
          </button>
        </div>
      </div>
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
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class InputGroupAutocompleteNextDemo {
  private readonly country = signal('France');
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
}`;
}
