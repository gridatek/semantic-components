import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form, required } from '@angular/forms/signals';
import {
  ScCombobox,
  ScComboboxEmpty,
  ScComboboxInput,
  ScComboboxItem,
  ScComboboxList,
  ScComboboxListContent,
  ScComboboxPopup,
  ScComboboxPortal,
  ScComboboxTrigger,
  ScComboboxValue,
  ScField,
  ScFieldErrors,
  ScInput,
  ScInputGroup,
  ScInputGroupAddon,
  ScLabel,
} from '@semantic-components/ui';
import {
  ScPhoneInput,
  ScPhoneInputCountry,
  ScPhoneInputFlag,
  ScPhoneInputNumber,
  phoneCountries,
  phoneNumber,
} from '@semantic-components/ui/phone-input';
import { SiChevronDownIcon, SiSearchIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-country-selector-phone-input-demo',
  imports: [
    FormField,
    ScCombobox,
    ScComboboxEmpty,
    ScComboboxItem,
    ScComboboxList,
    ScComboboxListContent,
    ScComboboxPopup,
    ScComboboxPortal,
    ScComboboxInput,
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
          <div scCombobox scPhoneInputCountry #picker="scCombobox">
            <button scComboboxTrigger>
              <span class="sr-only">Country</span>
              <span scComboboxValue class="flex items-center gap-2">
                <img scPhoneInputFlag alt="" />
                +{{ phone.callingCode() }}
              </span>
              <svg siChevronDownIcon></svg>
            </button>
            <ng-template scComboboxPortal>
              <div scComboboxPopup aria-label="Country" class="min-w-72">
                <div scInputGroup>
                  <div scInputGroupAddon align="inline-start">
                    <svg siSearchIcon></svg>
                  </div>
                  <input
                    scInput
                    scComboboxInput
                    aria-label="Search countries"
                    placeholder="Search countries..."
                  />
                </div>
                <div scComboboxEmpty>No countries found</div>
                <ng-template scComboboxListContent>
                  <div scComboboxList aria-label="Countries">
                    @for (
                      country of matching(picker.query());
                      track country.code
                    ) {
                      <div
                        scComboboxItem
                        [value]="country.code"
                        [label]="country.name"
                      >
                        <img scPhoneInputFlag [country]="country.code" alt="" />
                        {{ country.name }} +{{ country.callingCode }}
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
  private readonly countries = phoneCountries('en');

  /** By name, by code ("fr") or by calling code ("+33" or "33"). */
  protected matching(text: string) {
    const query = text.trim().toLowerCase().replace(/^\+/, '');
    if (!query) return this.countries;
    return this.countries.filter(
      (c) =>
        c.name.toLowerCase().includes(query) ||
        c.code.toLowerCase() === query ||
        c.callingCode.startsWith(query),
    );
  }

  protected readonly model = signal({ phone: '' });
  protected readonly contactForm = form(this.model, (s) => {
    required(s.phone, { message: 'Enter your phone number' });
    phoneNumber(s.phone, { message: 'Enter a valid phone number' });
  });
}
