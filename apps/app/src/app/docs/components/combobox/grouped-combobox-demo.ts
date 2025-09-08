import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ComboboxItem, ScCombobox, ScLabel } from '@semantic-components/ui';

@Component({
  selector: 'app-grouped-combobox-demo',
  imports: [FormsModule, ScCombobox, ScLabel],
  template: `
    <label class="mb-2" sc-label for="country-combobox">Select a country</label>
    <sc-combobox
      [(ngModel)]="selectedCountry"
      [items]="countries"
      [grouped]="true"
      [inputId]="'country-combobox'"
      (selectionChange)="onCountryChange($event)"
      placeholder="Search countries..."
    />
    <p class="mt-4 text-sm text-gray-600">
      Selected country:
      <code class="bg-gray-100 px-2 py-1 rounded">{{ selectedCountry || 'None' }}</code>
    </p>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupedComboboxDemo {
  countries: ComboboxItem[] = [
    { label: 'United States', value: 'us', group: 'North America' },
    { label: 'Canada', value: 'ca', group: 'North America' },
    { label: 'Mexico', value: 'mx', group: 'North America' },
    { label: 'United Kingdom', value: 'uk', group: 'Europe' },
    { label: 'Germany', value: 'de', group: 'Europe' },
    { label: 'France', value: 'fr', group: 'Europe' },
    { label: 'Italy', value: 'it', group: 'Europe' },
    { label: 'Spain', value: 'es', group: 'Europe' },
    { label: 'Japan', value: 'jp', group: 'Asia' },
    { label: 'China', value: 'cn', group: 'Asia' },
    { label: 'India', value: 'in', group: 'Asia' },
    { label: 'South Korea', value: 'kr', group: 'Asia' },
    { label: 'Australia', value: 'au', group: 'Oceania' },
    { label: 'New Zealand', value: 'nz', group: 'Oceania' },
    { label: 'Brazil', value: 'br', group: 'South America' },
    { label: 'Argentina', value: 'ar', group: 'South America' },
  ];
  selectedCountry: string = '';

  onCountryChange(value: string) {
    console.log('Country selected:', value);
  }
}
