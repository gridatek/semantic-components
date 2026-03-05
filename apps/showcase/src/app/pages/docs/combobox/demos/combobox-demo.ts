import {
  Combobox,
  ComboboxDialog,
  ComboboxPopupContainer,
} from '@angular/aria/combobox';
import { Listbox } from '@angular/aria/listbox';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  afterRenderEffect,
  computed,
  signal,
  untracked,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  ScCombobox,
  ScComboboxDialog,
  ScComboboxEmpty,
  ScComboboxInput,
  ScComboboxInputGroup,
  ScComboboxInputIcon,
  ScComboboxItem,
  ScComboboxItemIndicator,
  ScComboboxItemLabel,
  ScComboboxList,
  ScComboboxPopupContainer,
  ScComboboxTrigger,
  ScComboboxTriggerIcon,
  ScComboboxTriggerInput,
} from '@semantic-components/ui';
import {
  SiCheckIcon,
  SiChevronsUpDownIcon,
  SiSearchIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-combobox-demo',
  imports: [
    Combobox,
    ComboboxPopupContainer,
    ScCombobox,
    ScComboboxDialog,
    ScComboboxEmpty,
    ScComboboxInputIcon,
    ScComboboxItem,
    ScComboboxItemIndicator,
    ScComboboxItemLabel,
    ScComboboxInput,
    ScComboboxInputGroup,
    ScComboboxTrigger,
    ScComboboxTriggerIcon,
    ScComboboxList,
    ScComboboxPopupContainer,
    ScComboboxTriggerInput,
    FormsModule,
    SiCheckIcon,
    SiChevronsUpDownIcon,
    SiSearchIcon,
  ],
  host: { class: 'block' },
  template: `
    <div scCombobox [readonly]="true" class="w-60">
      <div scComboboxTrigger>
        <input
          scComboboxTriggerInput
          placeholder="Select a country..."
          [value]="value()"
        />
        <svg siChevronsUpDownIcon scComboboxTriggerIcon></svg>
      </div>
      <ng-template scComboboxPopupContainer>
        <dialog scComboboxDialog>
          <div
            ngCombobox
            #combobox="ngCombobox"
            filterMode="manual"
            [alwaysExpanded]="true"
            class="relative flex w-full flex-col rounded-md border-none"
          >
            <div scComboboxInputGroup>
              <svg siSearchIcon scComboboxInputIcon></svg>
              <input
                scComboboxInput
                placeholder="Search..."
                [(value)]="searchString"
              />
            </div>
            <ng-template ngComboboxPopupContainer>
              @if (options().length === 0) {
                <div scComboboxEmpty>No results found</div>
              }
              <div scComboboxList [(values)]="selectedCountries">
                @for (option of options(); track option) {
                  <div scComboboxItem [value]="option" [label]="option">
                    <span scComboboxItemLabel>{{ option }}</span>
                    <svg siCheckIcon scComboboxItemIndicator></svg>
                  </div>
                }
              </div>
            </ng-template>
          </div>
        </dialog>
      </ng-template>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComboboxDemo {
  dialog = viewChild(ComboboxDialog);
  listbox = viewChild<Listbox<string>>(Listbox);
  combobox = viewChild<Combobox<string>>(Combobox);
  value = signal('');
  searchString = signal('');
  options = computed(() =>
    ALL_COUNTRIES.filter((country) =>
      country.toLowerCase().startsWith(this.searchString().toLowerCase()),
    ),
  );
  selectedCountries = signal<string[]>([]);
  constructor() {
    afterRenderEffect(() => {
      if (this.dialog() && this.combobox()?.expanded()) {
        untracked(() => this.listbox()?.gotoFirst());
        this.positionDialog();
      }
    });
    afterRenderEffect(() => {
      if (this.selectedCountries().length > 0) {
        untracked(() => this.dialog()?.close());
        this.value.set(this.selectedCountries()[0]);
        this.searchString.set('');
      }
    });
    afterRenderEffect(() => this.listbox()?.scrollActiveItemIntoView());
  }
  // TODO(wagnermaciel): Switch to using the CDK for positioning.
  positionDialog() {
    const dialog = this.dialog()!;
    const combobox = this.combobox()!;
    const comboboxRect = combobox.inputElement()?.getBoundingClientRect();
    const scrollY = window.scrollY;
    if (comboboxRect) {
      dialog.element.style.width = `${comboboxRect.width}px`;
      dialog.element.style.top = `${comboboxRect.bottom + scrollY + 4}px`;
      dialog.element.style.left = `${comboboxRect.left - 1}px`;
    }
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
