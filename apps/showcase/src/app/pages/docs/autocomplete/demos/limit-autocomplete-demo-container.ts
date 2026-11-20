import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { LimitAutocompleteDemo } from './limit-autocomplete-demo';

@Component({
  selector: 'app-limit-autocomplete-demo-container',
  imports: [DemoContainer, LimitAutocompleteDemo],
  template: `
    <app-demo-container
      title="Limit results"
      demoUrl="/demos/autocomplete/limit-autocomplete-demo"
      [code]="code"
    >
      <app-limit-autocomplete-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class LimitAutocompleteDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScAutocomplete,
  ScComboboxEmpty,
  ScComboboxInput,
  ScComboboxItem,
  ScComboboxList,
  ScComboboxPopup,
  ScComboboxPortal,
  ScComboboxStatus,
  ScInput,
  scComboboxMatches,
} from '@semantic-components/ui';

/** The first five matches only, and a status that says how many there are. */
@Component({
  selector: 'app-limit-autocomplete-demo',
  imports: [
    ScAutocomplete,
    ScComboboxEmpty,
    ScComboboxInput,
    ScComboboxItem,
    ScComboboxList,
    ScComboboxPopup,
    ScComboboxPortal,
    ScInput,
    ScComboboxStatus,
  ],
  template: \`
    <div
      scAutocomplete
      #ac="scAutocomplete"
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
            @for (country of matching(ac.query()).slice(0, 5); track country) {
              <div scComboboxItem [value]="country">{{ country }}</div>
            }
          </div>
          @if (matching(ac.query()).length > 5) {
            <p class="text-muted-foreground px-2 py-1.5 text-xs">
              5 of {{ matching(ac.query()).length }} — type more to narrow.
            </p>
          }
          <div scComboboxStatus>
            {{ matching(ac.query()).length }} countries
          </div>
        </div>
      </ng-template>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class LimitAutocompleteDemo {
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
}`;
}
