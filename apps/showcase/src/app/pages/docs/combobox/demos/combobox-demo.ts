import {
  Combobox,
  ComboboxDialog,
  ComboboxInput,
  ComboboxPopupContainer,
} from '@angular/aria/combobox';
import { Listbox, Option } from '@angular/aria/listbox';
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

@Component({
  selector: 'app-combobox-demo',
  imports: [
    ComboboxDialog,
    Combobox,
    ComboboxInput,
    ComboboxPopupContainer,
    Listbox,
    Option,
    FormsModule,
  ],
  host: { class: 'block' },
  template: `
    <div ngCombobox #combobox="ngCombobox" [readonly]="true">
      <div class="combobox-input-container">
        <input
          ngComboboxInput
          placeholder="Select a country..."
          [value]="value()"
        />
        <span
          class="material-symbols-outlined icon arrow-icon"
          translate="no"
          aria-hidden="true"
        >
          arrow_drop_down
        </span>
      </div>
      <ng-template ngComboboxPopupContainer>
        <dialog ngComboboxDialog class="dialog">
          <div
            ngCombobox
            #combobox="ngCombobox"
            filterMode="manual"
            [alwaysExpanded]="true"
          >
            <div class="combobox-input-container">
              <span
                class="material-symbols-outlined icon search-icon"
                translate="no"
                aria-hidden="true"
              >
                search
              </span>
              <input
                ngComboboxInput
                class="combobox-input"
                placeholder="Search..."
                [(value)]="searchString"
              />
            </div>
            <ng-template ngComboboxPopupContainer>
              @if (options().length === 0) {
                <div class="no-results">No results found</div>
              }
              <div ngListbox [(values)]="selectedCountries">
                @for (option of options(); track option) {
                  <div ngOption [value]="option" [label]="option">
                    <span class="option-label">{{ option }}</span>
                    <span
                      class="material-symbols-outlined icon check-icon"
                      translate="no"
                      aria-hidden="true"
                    >
                      check
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
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      @import url('https://fonts.googleapis.com/icon?family=Material+Symbols+Outlined');
      :host {
        display: flex;
        justify-content: center;
        font-family: var(--inter-font, system-ui, sans-serif);
        --border-color: color-mix(
          in srgb,
          var(--full-contrast, #000) 20%,
          var(--page-background, #fff)
        );
      }
      [ngCombobox] {
        position: relative;
        width: 100%;
        display: flex;
        flex-direction: column;
        border: 1px solid var(--border-color);
        border-radius: 0.25rem;
      }
      [ngCombobox]:has([readonly='true']) {
        width: 15rem;
      }
      .combobox-input-container {
        display: flex;
        position: relative;
        align-items: center;
        border-radius: 0.25rem;
      }
      [ngComboboxInput] {
        border-radius: 0.25rem;
      }
      [ngComboboxInput][readonly='true'] {
        cursor: pointer;
        padding: 0.7rem 1rem;
      }
      [ngCombobox]:focus-within [ngComboboxInput] {
        outline: none;
        box-shadow: none;
      }
      .icon {
        width: 24px;
        height: 24px;
        font-size: 20px;
        display: grid;
        place-items: center;
        pointer-events: none;
      }
      .search-icon {
        padding: 0 0.5rem;
        position: absolute;
        opacity: 0.8;
      }
      .arrow-icon {
        padding: 0 0.5rem;
        position: absolute;
        right: 0;
        opacity: 0.8;
        transition: transform 0.2s ease;
      }
      [ngComboboxInput][aria-expanded='true'] + .arrow-icon {
        transform: rotate(180deg);
      }
      [ngComboboxInput] {
        width: 100%;
        border: none;
        outline: none;
        font-size: 1rem;
        padding: 0.7rem 1rem 0.7rem 2.5rem;
        background-color: var(--septenary-contrast, #f5f5f5);
        color: var(--primary-contrast, #1a1a1a);
      }
      .popover {
        margin: 0;
        padding: 0;
        border: 1px solid var(--border-color);
        border-radius: 0.25rem;
        background-color: var(--septenary-contrast, #f5f5f5);
      }
      [ngListbox] {
        gap: 2px;
        max-height: 200px;
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
          var(--primary-contrast, #1a1a1a) 5%,
          transparent
        );
      }
      [ngOption][data-active='true'] {
        outline-offset: -2px;
        outline: 2px solid var(--vivid-pink, #f542a4);
      }
      [ngOption][aria-selected='true'] {
        color: var(--vivid-pink, #f542a4);
        background-color: color-mix(
          in srgb,
          var(--vivid-pink, #f542a4) 5%,
          transparent
        );
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
      .dialog {
        position: absolute;
        left: auto;
        right: auto;
        top: auto;
        bottom: auto;
        padding: 0;
        border: 1px solid var(--border-color);
        border-radius: 0.25rem;
        background-color: var(--septenary-contrast, #f5f5f5);
        color: inherit;
      }
      .dialog .combobox-input-container {
        border-radius: 0;
      }
      .dialog [ngCombobox],
      .dialog .combobox-input-container {
        border: none;
      }
      .dialog [ngComboboxInput] {
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
      }
      [ngCombobox]:focus-within [ngComboboxInput]:not(.combobox-input) {
        outline: 1.5px solid var(--vivid-pink);
        box-shadow: 0 0 0 4px
          color-mix(in srgb, var(--vivid-pink) 25%, transparent);
      }
      .dialog .combobox-input-container {
        border-bottom: 1px solid var(--border-color);
      }
      .dialog::backdrop {
        opacity: 0;
      }
      .no-results {
        padding: 1rem;
      }
    `,
  ],
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
