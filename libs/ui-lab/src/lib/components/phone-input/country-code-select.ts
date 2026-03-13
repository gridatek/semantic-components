import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  effect,
  input,
  linkedSignal,
  model,
  signal,
} from '@angular/core';
import {
  ScCombobox,
  ScComboboxDialog,
  ScComboboxDisplayValue,
  ScComboboxEmpty,
  ScComboboxIcon,
  ScComboboxInput,
  ScComboboxInputGroup,
  ScComboboxItem,
  ScComboboxItemLabel,
  ScComboboxList,
  ScComboboxListContainer,
  ScComboboxPopupContainer,
  ScComboboxSearchInput,
  ScComboboxSearchInputGroup,
  ScComboboxSearchInputIcon,
  ScComboboxSearchPanel,
  cn,
} from '@semantic-components/ui';
import {
  SiChevronsUpDownIcon,
  SiSearchIcon,
} from '@semantic-icons/lucide-icons';
import { COUNTRIES, Country, getCountryByCode } from './countries';

@Component({
  selector: 'div[scCountryCodeSelect]',
  imports: [
    ScCombobox,
    ScComboboxDialog,
    ScComboboxDisplayValue,
    ScComboboxIcon,
    ScComboboxInput,
    ScComboboxInputGroup,
    ScComboboxItem,
    ScComboboxItemLabel,
    ScComboboxList,
    ScComboboxListContainer,
    ScComboboxPopupContainer,
    ScComboboxSearchInput,
    ScComboboxSearchInputGroup,
    ScComboboxSearchInputIcon,
    ScComboboxSearchPanel,
    ScComboboxEmpty,
    SiChevronsUpDownIcon,
    SiSearchIcon,
  ],
  template: `
    <div scCombobox [readonly]="true" class="w-full">
      <div
        scComboboxInputGroup
        class="min-w-28 rounded-none border-0 shadow-none ring-0 focus-visible:ring-0"
      >
        <span scComboboxDisplayValue></span>
        <input
          scComboboxInput
          [placeholder]="displayLabel()"
          [value]="displayLabel()"
          [disabled]="disabled()"
        />
        <svg siChevronsUpDownIcon scComboboxIcon></svg>
      </div>
      <ng-template scComboboxPopupContainer>
        <dialog scComboboxDialog class="min-w-72">
          <div scComboboxSearchPanel>
            <div scComboboxSearchInputGroup>
              <svg siSearchIcon scComboboxSearchInputIcon></svg>
              <input
                scComboboxSearchInput
                placeholder="Search countries..."
                [(value)]="searchString"
              />
            </div>
            <ng-template scComboboxListContainer>
              @if (filteredCountries().length === 0) {
                <div scComboboxEmpty>No countries found</div>
              }
              <div scComboboxList [(values)]="selectedValues">
                @for (country of filteredCountries(); track country.code) {
                  <div
                    scComboboxItem
                    [value]="country.code"
                    [label]="country.code + ' ' + country.dialCode"
                  >
                    <span scComboboxItemLabel class="flex items-center gap-2">
                      <span class="text-muted-foreground w-7 text-xs">
                        {{ country.code }}
                      </span>
                      <span class="flex-1 truncate">{{ country.name }}</span>
                      <span class="text-muted-foreground text-xs">
                        {{ country.dialCode }}
                      </span>
                    </span>
                  </div>
                }
              </div>
            </ng-template>
          </div>
        </dialog>
      </ng-template>
    </div>
  `,
  host: {
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScCountryCodeSelect {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly countries = input<Country[]>(COUNTRIES);
  readonly disabled = input<boolean>(false);
  readonly value = model<string>('US');

  protected readonly searchString = signal('');

  protected readonly selectedValues = linkedSignal(() => [this.value()]);

  constructor() {
    effect(() => {
      const values = this.selectedValues();
      if (values.length > 0) {
        const last = values[values.length - 1];
        if (last !== this.value()) {
          this.value.set(last);
        }
      }
    });
  }

  protected readonly displayLabel = computed(() => {
    const country = getCountryByCode(this.value());
    return country ? `${country.code} ${country.dialCode}` : 'Select...';
  });

  protected readonly filteredCountries = computed(() => {
    const query = this.searchString().toLowerCase();
    if (!query) return this.countries();

    return this.countries().filter(
      (c) =>
        c.name.toLowerCase().includes(query) ||
        c.dialCode.includes(query) ||
        c.code.toLowerCase().includes(query),
    );
  });

  protected readonly class = computed(() => cn('block', this.classInput()));
}
