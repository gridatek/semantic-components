import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { InlineAutocompleteNextDemo } from './inline-autocomplete-next-demo';

@Component({
  selector: 'app-inline-autocomplete-next-demo-container',
  imports: [DemoContainer, InlineAutocompleteNextDemo],
  template: `
    <app-demo-container
      title="Inline completion"
      demoUrl="/demos/autocomplete-next/inline-autocomplete-next-demo"
      [code]="code"
    >
      <app-inline-autocomplete-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class InlineAutocompleteNextDemoContainer {
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
} from '@semantic-components/ui';

/** mode="both": the highlighted suggestion also completes the text, selected — typing on replaces it. It completes from the start, so the suggestions begin with the text. */
@Component({
  selector: 'app-inline-autocomplete-next-demo',
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
      mode="both"
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
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class InlineAutocompleteNextDemo {
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

  // Inline completion completes from the start: suggestions that begin with
  // the text.
  private matching(query: string): string[] {
    const start = query.trim().toLowerCase();
    return this.countries.filter((name) =>
      name.toLowerCase().startsWith(start),
    );
  }
}`;
}
