import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DisabledAutocompleteNextDemo } from './disabled-autocomplete-next-demo';

@Component({
  selector: 'app-disabled-autocomplete-next-demo-container',
  imports: [DemoContainer, DisabledAutocompleteNextDemo],
  template: `
    <app-demo-container
      title="Disabled"
      demoUrl="/demos/autocomplete-next/disabled-autocomplete-next-demo"
      [code]="code"
    >
      <app-disabled-autocomplete-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledAutocompleteNextDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
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

/** Disabled: the input takes no focus and no text. */
@Component({
  selector: 'app-disabled-autocomplete-next-demo',
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
  template: \`
    <div
      scAutocompleteNext
      #ac="scAutocompleteNext"
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
export class DisabledAutocompleteNextDemo {
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
