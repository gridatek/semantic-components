import { Component, ViewEncapsulation, computed, signal } from '@angular/core';
import { FormField, form, required } from '@angular/forms/signals';
import {
  ScPhoneInput,
  ScPhoneInputCountry,
  ScPhoneInputFlag,
  ScPhoneInputNumber,
  phoneCountries,
  phoneNumber,
} from '@semantic-components/phone-input';
import {
  ScCombobox,
  ScComboboxEmpty,
  ScComboboxIcon,
  ScComboboxItem,
  ScComboboxItemLabel,
  ScComboboxList,
  ScComboboxListContainer,
  ScComboboxPopup,
  ScComboboxPortal,
  ScComboboxSearch,
  ScComboboxTrigger,
  ScComboboxValue,
  ScField,
  ScFieldErrors,
  ScInput,
  ScInputGroup,
  ScInputGroupAddon,
  ScLabel,
} from '@semantic-components/ui';
import { SiChevronDownIcon, SiSearchIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-country-selector-phone-input-demo',
  imports: [
    FormField,
    ScCombobox,
    ScComboboxEmpty,
    ScComboboxIcon,
    ScComboboxItem,
    ScComboboxItemLabel,
    ScComboboxList,
    ScComboboxListContainer,
    ScComboboxPopup,
    ScComboboxPortal,
    ScComboboxSearch,
    ScComboboxTrigger,
    ScComboboxValue,
    ScField,
    ScFieldErrors,
    ScInput,
    ScInputGroup,
    ScInputGroupAddon,
    ScLabel,
    ScPhoneInput,
    ScPhoneInputCountry,
    ScPhoneInputFlag,
    ScPhoneInputNumber,
    SiChevronDownIcon,
    SiSearchIcon,
  ],
  template: `
    <div class="flex w-full max-w-sm flex-col gap-4">
      <div scField>
        <label scLabel>Phone number</label>
        <div
          scPhoneInput
          [formField]="contactForm.phone"
          defaultCountry="US"
          #phone="scPhoneInput"
        >
          <div scCombobox scPhoneInputCountry>
            <div scComboboxTrigger aria-label="Country">
              <span scComboboxValue>
                <img scPhoneInputFlag alt="" />
                +{{ phone.callingCode() }}
              </span>
              <svg scComboboxIcon siChevronDownIcon></svg>
            </div>
            <ng-template scComboboxPortal>
              <div scComboboxPopup class="min-w-72">
                <div scInputGroup>
                  <div scInputGroupAddon align="inline-start">
                    <svg siSearchIcon></svg>
                  </div>
                  <input
                    scInput
                    scComboboxSearch
                    aria-label="Search countries"
                    placeholder="Search countries..."
                    [(value)]="search"
                  />
                </div>
                <ng-template scComboboxListContainer>
                  @if (filteredCountries().length === 0) {
                    <div scComboboxEmpty>No countries found</div>
                  }
                  <div scComboboxList>
                    @for (country of filteredCountries(); track country.code) {
                      <div
                        scComboboxItem
                        [value]="country.code"
                        [label]="country.name"
                      >
                        <img scPhoneInputFlag [country]="country.code" alt="" />
                        <span scComboboxItemLabel>
                          {{ country.name }} +{{ country.callingCode }}
                        </span>
                      </div>
                    }
                  </div>
                </ng-template>
              </div>
            </ng-template>
          </div>
          <input scPhoneInputNumber />
        </div>
        <div scFieldErrors></div>
      </div>

      <p class="bg-muted rounded-md p-4 text-sm">
        Value: {{ model().phone || '—' }}
      </p>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class CountrySelectorPhoneInputDemo {
  protected readonly search = signal('');
  private readonly countries = phoneCountries('en');

  protected readonly filteredCountries = computed(() => {
    const query = this.search().toLowerCase().replace(/^\+/, '');
    if (!query) return this.countries;
    return this.countries.filter(
      (c) =>
        c.name.toLowerCase().includes(query) ||
        c.code.toLowerCase() === query ||
        c.callingCode.startsWith(query),
    );
  });

  protected readonly model = signal({ phone: '' });
  protected readonly contactForm = form(this.model, (s) => {
    required(s.phone, { message: 'Enter your phone number' });
    phoneNumber(s.phone);
  });
}
