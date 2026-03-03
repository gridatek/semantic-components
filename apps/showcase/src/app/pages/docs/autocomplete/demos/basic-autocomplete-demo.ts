import {
  Combobox,
  ComboboxInput,
  ComboboxPopupContainer,
} from '@angular/aria/combobox';
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

@Component({
  selector: 'app-basic-autocomplete-demo',
  imports: [
    Combobox,
    ComboboxInput,
    ComboboxPopupContainer,
    Listbox,
    Option,
    OverlayModule,
    FormsModule,
  ],
  template: `
    <div ngCombobox filterMode="auto-select">
      <div #origin class="autocomplete">
        <span
          class="search-icon material-symbols-outlined"
          translate="no"
          aria-hidden="true"
        >
          search
        </span>
        <input
          aria-label="Label dropdown"
          placeholder="Select a country"
          [(ngModel)]="query"
          ngComboboxInput
        />
      </div>
      <ng-template ngComboboxPopupContainer>
        <ng-template
          [cdkConnectedOverlay]="{
            origin,
            usePopover: 'inline',
            matchWidth: true,
          }"
          [cdkConnectedOverlayOpen]="true"
        >
          <div class="popup">
            @if (countries().length === 0) {
              <div class="no-results">No results found</div>
            }
            <div ngListbox>
              @for (country of countries(); track country) {
                <div ngOption [value]="country" [label]="country">
                  <span class="option-label">{{ country }}</span>
                  <span
                    class="check-icon material-symbols-outlined"
                    translate="no"
                    aria-hidden="true"
                  >
                    check
                  </span>
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
  styles: `
    @import url('https://fonts.googleapis.com/icon?family=Material+Symbols+Outlined');
    :host {
      display: flex;
      justify-content: center;
      font-family: var(--inter-font);
    }
    .autocomplete {
      display: flex;
      position: relative;
      align-items: center;
    }
    .material-symbols-outlined {
      font-size: 1.25rem;
      pointer-events: none;
    }
    .search-icon {
      left: 0.75rem;
      position: absolute;
      color: var(--quaternary-contrast);
    }
    [ngComboboxInput] {
      width: 13rem;
      font-size: 1rem;
      border-radius: 0.25rem;
      padding: 0.75rem 0.5rem 0.75rem 2.5rem;
      color: var(--primary-contrast);
      outline-color: var(--hot-pink);
      border: 1px solid var(--quinary-contrast);
      background-color: var(--page-background);
    }
    [ngComboboxInput]::placeholder {
      color: var(--quaternary-contrast);
    }
    [ngCombobox]:has([aria-expanded='false']) .popup {
      display: none;
    }
    .popup {
      width: 100%;
      margin-top: 8px;
      padding: 0.5rem;
      max-height: 11rem;
      border-radius: 0.5rem;
      background-color: var(--septenary-contrast);
      font-size: 0.9rem;
    }
    .no-results {
      padding: 1rem;
    }
    [ngListbox] {
      gap: 2px;
      height: 100%;
      display: flex;
      overflow: auto;
      flex-direction: column;
    }
    [ngOption] {
      display: flex;
      cursor: pointer;
      align-items: center;
      margin: 1px;
      padding: 0 1rem;
      min-height: 2.25rem;
      border-radius: 0.5rem;
    }
    [ngOption]:hover {
      background-color: color-mix(
        in srgb,
        var(--primary-contrast) 5%,
        transparent
      );
    }
    [ngOption][data-active='true'] {
      outline-offset: -2px;
      outline: 2px solid var(--hot-pink);
    }
    [ngOption][aria-selected='true'] {
      color: var(--hot-pink);
      background-color: color-mix(in srgb, var(--hot-pink) 5%, transparent);
    }
    [ngOption]:not([aria-selected='true']) .check-icon {
      display: none;
    }
    .option-label {
      flex: 1;
    }
    .check-icon {
      font-size: 0.9rem;
    }
  `,
})
export class BasicAutocompleteDemo {
  /** The combobox listbox popup. */
  listbox = viewChild<Listbox<string>>(Listbox);
  /** The options available in the listbox. */
  options = viewChildren<Option<string>>(Option);
  /** A reference to the ng aria combobox. */
  combobox = viewChild<Combobox<string>>(Combobox);
  /** The query string used to filter the list of countries. */
  query = signal('');
  /** The list of countries filtered by the query. */
  countries = computed(() =>
    ALL_COUNTRIES.filter((country) =>
      country.toLowerCase().startsWith(this.query().toLowerCase()),
    ),
  );
  constructor() {
    // Scrolls to the active item when the active option changes.
    // The slight delay here is to ensure animations are done before scrolling.
    afterRenderEffect(() => {
      const option = this.options().find((opt) => opt.active());
      setTimeout(
        () => option?.element.scrollIntoView({ block: 'nearest' }),
        50,
      );
    });
    // Resets the listbox scroll position when the combobox is closed.
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
  'Eswatini (fmr. ""Swaziland"")',
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
