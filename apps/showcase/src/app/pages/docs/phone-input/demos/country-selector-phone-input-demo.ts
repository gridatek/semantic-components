import { Component, ViewEncapsulation, computed, signal } from '@angular/core';
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
  ScInput,
  ScInputGroup,
  ScInputGroupAddon,
} from '@semantic-components/ui';
import { SiChevronDownIcon, SiSearchIcon } from '@semantic-icons/lucide-icons';

interface Country {
  code: string;
  name: string;
  dialCode: string;
  flag: string;
}

const COUNTRIES: Country[] = [
  { code: 'US', name: 'United States', dialCode: '+1', flag: '🇺🇸' },
  { code: 'GB', name: 'United Kingdom', dialCode: '+44', flag: '🇬🇧' },
  { code: 'CA', name: 'Canada', dialCode: '+1', flag: '🇨🇦' },
  { code: 'AU', name: 'Australia', dialCode: '+61', flag: '🇦🇺' },
  { code: 'DE', name: 'Germany', dialCode: '+49', flag: '🇩🇪' },
  { code: 'FR', name: 'France', dialCode: '+33', flag: '🇫🇷' },
  { code: 'IT', name: 'Italy', dialCode: '+39', flag: '🇮🇹' },
  { code: 'ES', name: 'Spain', dialCode: '+34', flag: '🇪🇸' },
  { code: 'PT', name: 'Portugal', dialCode: '+351', flag: '🇵🇹' },
  { code: 'NL', name: 'Netherlands', dialCode: '+31', flag: '🇳🇱' },
  { code: 'BE', name: 'Belgium', dialCode: '+32', flag: '🇧🇪' },
  { code: 'CH', name: 'Switzerland', dialCode: '+41', flag: '🇨🇭' },
  { code: 'AT', name: 'Austria', dialCode: '+43', flag: '🇦🇹' },
  { code: 'SE', name: 'Sweden', dialCode: '+46', flag: '🇸🇪' },
  { code: 'NO', name: 'Norway', dialCode: '+47', flag: '🇳🇴' },
  { code: 'DK', name: 'Denmark', dialCode: '+45', flag: '🇩🇰' },
  { code: 'FI', name: 'Finland', dialCode: '+358', flag: '🇫🇮' },
  { code: 'IE', name: 'Ireland', dialCode: '+353', flag: '🇮🇪' },
  { code: 'PL', name: 'Poland', dialCode: '+48', flag: '🇵🇱' },
  { code: 'CZ', name: 'Czech Republic', dialCode: '+420', flag: '🇨🇿' },
  { code: 'RU', name: 'Russia', dialCode: '+7', flag: '🇷🇺' },
  { code: 'UA', name: 'Ukraine', dialCode: '+380', flag: '🇺🇦' },
  { code: 'TR', name: 'Turkey', dialCode: '+90', flag: '🇹🇷' },
  { code: 'GR', name: 'Greece', dialCode: '+30', flag: '🇬🇷' },
  { code: 'JP', name: 'Japan', dialCode: '+81', flag: '🇯🇵' },
  { code: 'KR', name: 'South Korea', dialCode: '+82', flag: '🇰🇷' },
  { code: 'CN', name: 'China', dialCode: '+86', flag: '🇨🇳' },
  { code: 'HK', name: 'Hong Kong', dialCode: '+852', flag: '🇭🇰' },
  { code: 'TW', name: 'Taiwan', dialCode: '+886', flag: '🇹🇼' },
  { code: 'SG', name: 'Singapore', dialCode: '+65', flag: '🇸🇬' },
  { code: 'MY', name: 'Malaysia', dialCode: '+60', flag: '🇲🇾' },
  { code: 'TH', name: 'Thailand', dialCode: '+66', flag: '🇹🇭' },
  { code: 'VN', name: 'Vietnam', dialCode: '+84', flag: '🇻🇳' },
  { code: 'PH', name: 'Philippines', dialCode: '+63', flag: '🇵🇭' },
  { code: 'ID', name: 'Indonesia', dialCode: '+62', flag: '🇮🇩' },
  { code: 'IN', name: 'India', dialCode: '+91', flag: '🇮🇳' },
  { code: 'PK', name: 'Pakistan', dialCode: '+92', flag: '🇵🇰' },
  { code: 'BD', name: 'Bangladesh', dialCode: '+880', flag: '🇧🇩' },
  { code: 'AE', name: 'United Arab Emirates', dialCode: '+971', flag: '🇦🇪' },
  { code: 'SA', name: 'Saudi Arabia', dialCode: '+966', flag: '🇸🇦' },
  { code: 'IL', name: 'Israel', dialCode: '+972', flag: '🇮🇱' },
  { code: 'EG', name: 'Egypt', dialCode: '+20', flag: '🇪🇬' },
  { code: 'ZA', name: 'South Africa', dialCode: '+27', flag: '🇿🇦' },
  { code: 'NG', name: 'Nigeria', dialCode: '+234', flag: '🇳🇬' },
  { code: 'KE', name: 'Kenya', dialCode: '+254', flag: '🇰🇪' },
  { code: 'BR', name: 'Brazil', dialCode: '+55', flag: '🇧🇷' },
  { code: 'MX', name: 'Mexico', dialCode: '+52', flag: '🇲🇽' },
  { code: 'AR', name: 'Argentina', dialCode: '+54', flag: '🇦🇷' },
  { code: 'CL', name: 'Chile', dialCode: '+56', flag: '🇨🇱' },
  { code: 'CO', name: 'Colombia', dialCode: '+57', flag: '🇨🇴' },
  { code: 'PE', name: 'Peru', dialCode: '+51', flag: '🇵🇪' },
  { code: 'NZ', name: 'New Zealand', dialCode: '+64', flag: '🇳🇿' },
];

@Component({
  selector: 'app-country-selector-phone-input-demo',
  imports: [
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
    ScInput,
    ScInputGroup,
    ScInputGroupAddon,
    SiChevronDownIcon,
    SiSearchIcon,
  ],
  template: `
    <div class="max-w-lg">
      <div
        scCombobox
        class="border-input flex h-8 w-full items-center rounded-lg border"
        [(value)]="country"
      >
        <div
          scComboboxTrigger
          class="w-auto shrink-0 rounded-e-none border-0"
          aria-label="Country"
        >
          <span scComboboxValue>
            @if (selectedCountry(); as c) {
              {{ c.code }} {{ c.dialCode }}
            }
          </span>
          <svg scComboboxIcon siChevronDownIcon></svg>
        </div>
        <div class="bg-border h-full w-px shrink-0"></div>
        <input
          scInput
          class="rounded-s-none border-0"
          type="tel"
          inputmode="tel"
          placeholder="Phone number"
          aria-label="Phone number"
        />
        <ng-template scComboboxPortal>
          <div scComboboxPopup class="min-w-72">
            <div scInputGroup>
              <div scInputGroupAddon align="inline-start">
                <svg siSearchIcon class="opacity-50"></svg>
              </div>
              <input
                scInput
                scComboboxSearch
                aria-label="Search countries"
                placeholder="Search countries..."
                [(value)]="searchString"
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
        </ng-template>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class CountrySelectorPhoneInputDemo {
  protected readonly searchString = signal('');
  protected readonly country = signal(COUNTRIES[0].code);

  protected readonly selectedCountry = computed(() =>
    COUNTRIES.find((c) => c.code === this.country()),
  );

  protected readonly filteredCountries = computed(() => {
    const query = this.searchString().toLowerCase();
    if (!query) return COUNTRIES;

    return COUNTRIES.filter(
      (c) =>
        c.name.toLowerCase().includes(query) ||
        c.dialCode.includes(query) ||
        c.code.toLowerCase().includes(query),
    );
  });
}
