import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DisabledAutocompleteDemo } from './disabled-autocomplete-demo';

@Component({
  selector: 'app-disabled-autocomplete-demo-container',
  imports: [DemoContainer, DisabledAutocompleteDemo],
  template: `
    <app-demo-container
      title="Disabled"
      demoUrl="/demos/autocomplete/disabled-autocomplete-demo"
      [code]="code"
    >
      <app-disabled-autocomplete-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledAutocompleteDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScAutocomplete,
  ScComboboxEmpty,
  ScComboboxInput,
  ScComboboxItem,
  ScComboboxList,
  ScComboboxPopup,
  ScComboboxPortal,
  ScInput,
  scComboboxMatches,
} from '@semantic-components/ui';

/** Disabled: the input takes no focus and no text. */
@Component({
  selector: 'app-disabled-autocomplete-demo',
  imports: [
    ScAutocomplete,
    ScComboboxEmpty,
    ScComboboxInput,
    ScComboboxItem,
    ScComboboxList,
    ScComboboxPopup,
    ScComboboxPortal,
    ScInput,
  ],
  template: \`
    <div
      scAutocomplete
      #ac="scAutocomplete"
      disabled
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
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledAutocompleteDemo {
  private readonly country = signal('Japan');
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
