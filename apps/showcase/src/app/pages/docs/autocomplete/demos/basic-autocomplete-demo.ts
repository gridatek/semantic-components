import { Combobox, ComboboxPopupContainer } from '@angular/aria/combobox';
import { Listbox, Option } from '@angular/aria/listbox';
import { OverlayModule } from '@angular/cdk/overlay';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  afterRenderEffect,
  computed,
  signal,
  viewChild,
  viewChildren,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  ScAutocompleteGroup,
  ScAutocompleteIcon,
  ScAutocompleteInput,
  ScAutocompletePopup,
} from '@semantic-components/ui';
import { SiCheckIcon, SiSearchIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-basic-autocomplete-demo',
  imports: [
    Combobox,
    ComboboxPopupContainer,
    Listbox,
    Option,
    OverlayModule,
    FormsModule,
    ScAutocompleteGroup,
    ScAutocompleteIcon,
    ScAutocompleteInput,
    ScAutocompletePopup,
    SiSearchIcon,
    SiCheckIcon,
  ],
  template: `
    <div ngCombobox filterMode="auto-select" class="flex justify-center">
      <div #origin scAutocompleteGroup>
        <svg siSearchIcon scAutocompleteIcon></svg>
        <input
          scAutocompleteInput
          aria-label="Select a country"
          placeholder="Select a country"
          [(ngModel)]="query"
          class="w-52"
        />
      </div>
      <ng-template ngComboboxPopupContainer>
        <ng-template
          [cdkConnectedOverlay]="{
            origin: origin.elementRef,
            usePopover: 'inline',
            matchWidth: true,
          }"
          [cdkConnectedOverlayOpen]="combobox()?.expanded() ?? false"
        >
          <div scAutocompletePopup>
            @if (countries().length === 0) {
              <div class="text-muted-foreground px-3 py-4 text-center text-sm">
                No results found
              </div>
            }
            <div ngListbox class="flex flex-col gap-0.5">
              @for (country of countries(); track country) {
                <div
                  ngOption
                  [value]="country"
                  [label]="country"
                  class="hover:bg-accent hover:text-accent-foreground data-[active=true]:bg-accent data-[active=true]:text-accent-foreground aria-selected:text-accent-foreground aria-selected:bg-accent flex cursor-pointer items-center rounded-md px-2 py-1.5 text-sm outline-none select-none aria-selected:font-medium"
                >
                  <span class="flex-1">{{ country }}</span>
                  <svg
                    siCheckIcon
                    class="size-4 shrink-0 opacity-0 aria-selected:opacity-100"
                    [class.opacity-100]="false"
                    aria-hidden="true"
                  ></svg>
                </div>
              }
            </div>
          </div>
        </ng-template>
      </ng-template>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicAutocompleteDemo {
  listbox = viewChild<Listbox<string>>(Listbox);
  options = viewChildren<Option<string>>(Option);
  combobox = viewChild<Combobox<string>>(Combobox);
  query = signal('');
  countries = computed(() =>
    ALL_COUNTRIES.filter((country) =>
      country.toLowerCase().startsWith(this.query().toLowerCase()),
    ),
  );

  constructor() {
    afterRenderEffect(() => {
      const option = this.options().find((opt) => opt.active());
      setTimeout(
        () => option?.element.scrollIntoView({ block: 'nearest' }),
        50,
      );
    });

    afterRenderEffect(() => {
      if (!this.combobox()?.expanded()) {
        setTimeout(() => this.listbox()?.element.scrollTo(0, 0), 150);
      }
    });
  }
}

const ALL_COUNTRIES = [
  'Afghanistan',
  'Albania',
  'Algeria',
  'Andorra',
  'Angola',
  'Antigua and Barbuda',
  'Argentina',
  'Armenia',
  'Australia',
  'Austria',
  'Azerbaijan',
  'Bahamas',
  'Bahrain',
  'Bangladesh',
  'Barbados',
  'Belarus',
  'Belgium',
  'Belize',
  'Benin',
  'Bhutan',
  'Bolivia',
  'Bosnia and Herzegovina',
  'Botswana',
  'Brazil',
  'Brunei',
  'Bulgaria',
  'Burkina Faso',
  'Burundi',
  'Cabo Verde',
  'Cambodia',
  'Cameroon',
  'Canada',
  'Central African Republic',
  'Chad',
  'Chile',
  'China',
  'Colombia',
  'Comoros',
  'Congo (Congo-Brazzaville)',
  'Costa Rica',
  "Côte d'Ivoire",
  'Croatia',
  'Cuba',
  'Cyprus',
  'Czechia (Czech Republic)',
  'Democratic Republic of the Congo',
  'Denmark',
  'Djibouti',
  'Dominica',
  'Dominican Republic',
  'Ecuador',
  'Egypt',
  'El Salvador',
  'Equatorial Guinea',
  'Eritrea',
  'Estonia',
  'Eswatini (fmr. "Swaziland")',
  'Ethiopia',
  'Fiji',
  'Finland',
  'France',
  'Gabon',
  'Gambia',
  'Georgia',
  'Germany',
  'Ghana',
  'Greece',
  'Grenada',
  'Guatemala',
  'Guinea',
  'Guinea-Bissau',
  'Guyana',
  'Haiti',
  'Holy See',
  'Honduras',
  'Hungary',
  'Iceland',
  'India',
  'Indonesia',
  'Iran',
  'Iraq',
  'Ireland',
  'Israel',
  'Italy',
  'Jamaica',
  'Japan',
  'Jordan',
  'Kazakhstan',
  'Kenya',
  'Kiribati',
  'Kuwait',
  'Kyrgyzstan',
  'Laos',
  'Latvia',
  'Lebanon',
  'Lesotho',
  'Liberia',
  'Libya',
  'Liechtenstein',
  'Lithuania',
  'Luxembourg',
  'Madagascar',
  'Malawi',
  'Malaysia',
  'Maldives',
  'Mali',
  'Malta',
  'Marshall Islands',
  'Mauritania',
  'Mauritius',
  'Mexico',
  'Micronesia',
  'Moldova',
  'Monaco',
  'Mongolia',
  'Montenegro',
  'Morocco',
  'Mozambique',
  'Myanmar (formerly Burma)',
  'Namibia',
  'Nauru',
  'Nepal',
  'Netherlands',
  'New Zealand',
  'Nicaragua',
  'Niger',
  'Nigeria',
  'North Korea',
  'North Macedonia',
  'Norway',
  'Oman',
  'Pakistan',
  'Palau',
  'Palestine State',
  'Panama',
  'Papua New Guinea',
  'Paraguay',
  'Peru',
  'Philippines',
  'Poland',
  'Portugal',
  'Qatar',
  'Romania',
  'Russia',
  'Rwanda',
  'Saint Kitts and Nevis',
  'Saint Lucia',
  'Saint Vincent and the Grenadines',
  'Samoa',
  'San Marino',
  'Sao Tome and Principe',
  'Saudi Arabia',
  'Senegal',
  'Serbia',
  'Seychelles',
  'Sierra Leone',
  'Singapore',
  'Slovakia',
  'Slovenia',
  'Solomon Islands',
  'Somalia',
  'South Africa',
  'South Korea',
  'South Sudan',
  'Spain',
  'Sri Lanka',
  'Sudan',
  'Suriname',
  'Sweden',
  'Switzerland',
  'Syria',
  'Tajikistan',
  'Tanzania',
  'Thailand',
  'Timor-Leste',
  'Togo',
  'Tonga',
  'Trinidad and Tobago',
  'Tunisia',
  'Turkey',
  'Turkmenistan',
  'Tuvalu',
  'Uganda',
  'Ukraine',
  'United Arab Emirates',
  'United Kingdom',
  'United States of America',
  'Uruguay',
  'Uzbekistan',
  'Vanuatu',
  'Venezuela',
  'Vietnam',
  'Yemen',
  'Zambia',
  'Zimbabwe',
];
