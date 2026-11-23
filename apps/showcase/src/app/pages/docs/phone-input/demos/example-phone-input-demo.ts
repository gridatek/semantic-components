import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScCombobox,
  ScComboboxEmpty,
  ScComboboxInput,
  ScComboboxItem,
  ScComboboxList,
  ScComboboxListTemplate,
  ScComboboxPopup,
  ScComboboxPortal,
  ScComboboxTrigger,
  ScComboboxValue,
  ScField,
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
} from '@semantic-components/ui/phone-input';
import { SiChevronDownIcon, SiSearchIcon } from '@semantic-icons/lucide-icons';
import examples from 'libphonenumber-js/mobile/examples';

/** examples: the placeholder is an example number of the country, as it would be written — libphonenumber-js’ examples, imported by you. */
@Component({
  selector: 'app-example-phone-input-demo',
  imports: [
    ScCombobox,
    ScComboboxEmpty,
    ScComboboxInput,
    ScComboboxItem,
    ScComboboxList,
    ScComboboxListTemplate,
    ScComboboxPopup,
    ScComboboxPortal,
    ScComboboxTrigger,
    ScComboboxValue,
    ScField,
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
    <div class="grid w-full max-w-sm gap-3">
      <div scField>
        <label scLabel>Phone number</label>
        <div
          scPhoneInput
          #phone="scPhoneInput"
          defaultCountry="GB"
          [(value)]="number"
        >
          <div scCombobox scPhoneInputCountry #country="scPhoneInputCountry">
            <button scComboboxTrigger variant="ghost">
              <span class="sr-only">Country</span>
              <span scComboboxValue class="flex items-center gap-2">
                <img scPhoneInputFlag alt="" />
                <span dir="ltr">+{{ phone.callingCode() }}</span>
              </span>
              <svg siChevronDownIcon></svg>
            </button>
            <ng-template scComboboxPortal>
              <div scComboboxPopup aria-label="Country" class="min-w-72">
                <div scInputGroup>
                  <div scInputGroupAddon side="inline-start">
                    <svg siSearchIcon></svg>
                  </div>
                  <input
                    scInput
                    scComboboxInput
                    aria-label="Search countries"
                    placeholder="Search countries…"
                  />
                </div>
                <div scComboboxEmpty>No countries found</div>
                <ng-template scComboboxListTemplate>
                  <div scComboboxList aria-label="Countries">
                    @for (item of country.results(); track item.code) {
                      <div
                        scComboboxItem
                        [value]="item.code"
                        [label]="item.name"
                      >
                        <img scPhoneInputFlag [country]="item.code" alt="" />
                        <span class="flex-1">{{ item.name }}</span>
                        <span class="text-muted-foreground" dir="ltr"
                          >+{{ item.callingCode }}</span
                        >
                      </div>
                    }
                  </div>
                </ng-template>
              </div>
            </ng-template>
          </div>
          <input scPhoneInputNumber [examples]="examples" />
        </div>
      </div>
      <p class="text-muted-foreground text-sm" data-testid="value">
        Value: {{ number() || '—' }}
      </p>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ExamplePhoneInputDemo {
  private readonly number = signal('');
  private readonly examples = examples;
}
