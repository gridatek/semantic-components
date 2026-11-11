import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScCombobox,
  ScComboboxEmpty,
  ScComboboxInput,
  ScComboboxItem,
  ScComboboxItemIndicator,
  ScComboboxList,
  ScComboboxListContent,
  ScComboboxPopup,
  ScComboboxPortal,
  ScComboboxTrigger,
  ScComboboxValue,
  ScField,
  ScInput,
  ScInputGroup,
  ScLabel,
  scComboboxMatches,
} from '@semantic-components/ui';
import { SiCheckIcon, SiChevronDownIcon } from '@semantic-icons/lucide-icons';

/** A trigger showing the value, the search inside the popup (the list in a scComboboxListContent template). In a field, the label names the trigger and the popup. */
@Component({
  selector: 'app-popup-combobox-demo',
  imports: [
    ScCombobox,
    ScComboboxEmpty,
    ScComboboxInput,
    ScComboboxItem,
    ScComboboxItemIndicator,
    ScComboboxList,
    ScComboboxListContent,
    ScComboboxPopup,
    ScComboboxPortal,
    ScComboboxTrigger,
    ScComboboxValue,
    ScField,
    ScInput,
    ScInputGroup,
    ScLabel,
    SiCheckIcon,
    SiChevronDownIcon,
  ],
  template: `
    <div scField class="w-64">
      <label scLabel>Country</label>
      <div scCombobox #cb="scCombobox" [(value)]="country" class="w-full">
        <button scComboboxTrigger>
          <span scComboboxValue placeholder="Select a country"></span>
          <svg siChevronDownIcon></svg>
        </button>
        <ng-template scComboboxPortal>
          <div scComboboxPopup>
            <div scInputGroup>
              <input
                scInput
                scComboboxInput
                placeholder="Search"
                aria-label="Search countries"
              />
            </div>
            <div scComboboxEmpty>No items found.</div>
            <ng-template scComboboxListContent>
              <div scComboboxList aria-label="Countries">
                @for (name of matching(cb.query()); track name) {
                  <div scComboboxItem [value]="name">
                    {{ name }}
                    <span scComboboxItemIndicator><svg siCheckIcon></svg></span>
                  </div>
                }
              </div>
            </ng-template>
          </div>
        </ng-template>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class PopupComboboxDemo {
  protected readonly countries = [
    'Algeria',
    'Argentina',
    'Australia',
    'Brazil',
    'Canada',
    'France',
    'Germany',
    'India',
    'Japan',
    'Morocco',
    'Spain',
    'United Kingdom',
  ];
  protected readonly country = signal<string | null>('Algeria');

  protected matching(query: string): string[] {
    return this.countries.filter((name) => scComboboxMatches(name, query));
  }
}
