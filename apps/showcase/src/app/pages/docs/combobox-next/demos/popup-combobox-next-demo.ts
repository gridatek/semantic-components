import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScComboboxNext,
  ScComboboxNextEmpty,
  ScComboboxNextInput,
  ScComboboxNextItem,
  ScComboboxNextItemIndicator,
  ScComboboxNextList,
  ScComboboxNextListContainer,
  ScComboboxNextPopup,
  ScComboboxNextPortal,
  ScComboboxNextTrigger,
  ScComboboxNextValue,
  ScInput,
  ScInputGroup,
  scComboboxNextMatches,
} from '@semantic-components/ui';
import { SiCheckIcon, SiChevronDownIcon } from '@semantic-icons/lucide-icons';

/** A trigger showing the value, the search inside the popup: the list goes in a scComboboxNextListContainer template. */
@Component({
  selector: 'app-popup-combobox-next-demo',
  imports: [
    ScComboboxNext,
    ScComboboxNextEmpty,
    ScComboboxNextInput,
    ScComboboxNextItem,
    ScComboboxNextItemIndicator,
    ScComboboxNextList,
    ScComboboxNextListContainer,
    ScComboboxNextPopup,
    ScComboboxNextPortal,
    ScComboboxNextTrigger,
    ScComboboxNextValue,
    ScInput,
    ScInputGroup,
    SiCheckIcon,
    SiChevronDownIcon,
  ],
  template: `
    <div
      scComboboxNext
      #cb="scComboboxNext"
      [(value)]="country"
      class="flex w-64 flex-col gap-2"
    >
      <span id="country-label" class="text-sm font-medium">Country</span>
      <!-- Named by its label and its value: the text it shows is in its name. -->
      <button
        scComboboxNextTrigger
        variant="outline"
        size="default"
        aria-labelledby="country-label country-value"
        class="w-full justify-between font-normal"
      >
        <span
          scComboboxNextValue
          id="country-value"
          placeholder="Select a country"
        ></span>
        <svg siChevronDownIcon></svg>
      </button>
      <ng-template scComboboxNextPortal>
        <div scComboboxNextPopup aria-label="Country">
          <div scInputGroup>
            <input
              scInput
              scComboboxNextInput
              placeholder="Search"
              aria-label="Search countries"
            />
          </div>
          <div scComboboxNextEmpty>No items found.</div>
          <ng-template scComboboxNextListContainer>
            <div scComboboxNextList aria-label="Countries">
              @for (name of matching(cb.query()); track name) {
                <div scComboboxNextItem [value]="name">
                  {{ name }}
                  <span scComboboxNextItemIndicator
                    ><svg siCheckIcon></svg
                  ></span>
                </div>
              }
            </div>
          </ng-template>
        </div>
      </ng-template>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class PopupComboboxNextDemo {
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
    return this.countries.filter((name) => scComboboxNextMatches(name, query));
  }
}
