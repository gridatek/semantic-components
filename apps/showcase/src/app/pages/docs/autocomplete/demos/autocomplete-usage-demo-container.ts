import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { AutocompleteUsageDemo } from './autocomplete-usage-demo';

@Component({
  selector: 'app-autocomplete-usage-demo-container',
  imports: [DemoContainer, AutocompleteUsageDemo],
  template: `
    <app-demo-container
      title="Usage"
      demoUrl="/demos/autocomplete/autocomplete-usage-demo"
      [code]="code"
    >
      <app-autocomplete-usage-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class AutocompleteUsageDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScAutocomplete,
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
  selector: 'app-autocomplete-usage-demo',
  imports: [
    ScAutocomplete,
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
  template: \`
    <div class="flex w-64 flex-col gap-3">
      <div scField>
        <label scLabel>Country</label>
        <div scAutocomplete #ac="scAutocomplete" [(value)]="country">
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
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class AutocompleteUsageDemo {
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
