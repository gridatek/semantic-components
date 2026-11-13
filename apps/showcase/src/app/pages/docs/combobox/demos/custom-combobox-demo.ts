import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScCombobox,
  ScComboboxEmpty,
  ScComboboxInput,
  ScComboboxItem,
  ScComboboxItemIndicator,
  ScComboboxList,
  ScComboboxPopup,
  ScComboboxPortal,
  ScComboboxTrigger,
  ScInput,
  ScInputGroup,
  ScInputGroupAddon,
  scComboboxMatches,
} from '@semantic-components/ui';
import { SiCheckIcon, SiChevronDownIcon } from '@semantic-icons/lucide-icons';

interface Country {
  code: string;
  name: string;
}

/** Objects as values: itemToStringLabel gives the label shown in the input, before the list has ever opened too. */
@Component({
  selector: 'app-custom-combobox-demo',
  imports: [
    ScCombobox,
    ScComboboxEmpty,
    ScComboboxInput,
    ScComboboxItem,
    ScComboboxItemIndicator,
    ScComboboxList,
    ScComboboxPopup,
    ScComboboxPortal,
    ScComboboxTrigger,
    ScInput,
    ScInputGroup,
    ScInputGroupAddon,
    SiCheckIcon,
    SiChevronDownIcon,
  ],
  template: `
    <div class="flex flex-col items-center gap-3">
      <div
        scCombobox
        #cb="scCombobox"
        [(value)]="country"
        [itemToStringLabel]="label"
        class="w-56"
      >
        <div scInputGroup>
          <input
            scInput
            scComboboxInput
            placeholder="Select a country"
            aria-label="Country"
          />
          <div scInputGroupAddon side="inline-end">
            <button scComboboxTrigger>
              <svg siChevronDownIcon></svg>
              <span class="sr-only">Show the list</span>
            </button>
          </div>
        </div>
        <ng-template scComboboxPortal>
          <div scComboboxPopup>
            <div scComboboxEmpty>No countries found.</div>
            <div scComboboxList aria-label="Countries">
              @for (country of matching(cb.query()); track country.code) {
                <div scComboboxItem [value]="country" [label]="country.name">
                  <span class="text-muted-foreground w-6 text-xs">{{
                    country.code
                  }}</span>
                  {{ country.name }}
                  <span scComboboxItemIndicator><svg siCheckIcon></svg></span>
                </div>
              }
            </div>
          </div>
        </ng-template>
      </div>
      <p class="text-muted-foreground text-sm">
        Value: {{ country()?.code ?? 'none' }}
      </p>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class CustomComboboxDemo {
  protected readonly countries: Country[] = [
    { code: 'DZ', name: 'Algeria' },
    { code: 'BR', name: 'Brazil' },
    { code: 'FR', name: 'France' },
    { code: 'JP', name: 'Japan' },
    { code: 'MA', name: 'Morocco' },
    { code: 'ES', name: 'Spain' },
  ];
  protected readonly country = signal<Country | null>(this.countries[2]);
  protected readonly label = (country: Country) => country.name;

  protected matching(query: string): Country[] {
    return this.countries.filter((country) =>
      scComboboxMatches(country.name, query),
    );
  }
}
