import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import {
  ScCombobox2,
  ScCombobox2Item,
  ScField,
  ScFieldErrorMessage,
  ScLabel,
} from '@semantic-components/ui';

@Component({
  selector: 'app-combobox2-demo',
  imports: [ScCombobox2, ScField, ScLabel, ScFieldErrorMessage, ReactiveFormsModule],
  template: `
    <div class="space-y-8">
      <!-- Basic usage -->
      <sc-combobox2
        [items]="countries"
        label="Basic Country Selector"
        placeholder="Select a country..."
        helperText="Choose your country from the list"
      />

      <!-- With form control and validation -->
      <div sc-field>
        <label sc-label>Country (Required)</label>
        <sc-combobox2
          [formControl]="countryControl"
          [items]="countries"
          [required]="true"
          [showErrors]="true"
          placeholder="Select country..."
        />
        @if (countryControl.errors?.['required'] && countryControl.touched) {
          <div sc-field-error-message>Country is required</div>
        }
      </div>

      <!-- Country with flag trigger template -->
      <sc-combobox2
        [items]="countries"
        [formControl]="countryWithFlagControl"
        [config]="{ searchPlaceholder: 'Search countries...' }"
        label="Country with Flag"
        placeholder="Select country..."
      >
        <ng-template #triggerTemplate let-item>
          @if (item) {
            <div class="flex items-center space-x-2">
              <span class="text-lg">{{ getCountryFlag(item.id) }}</span>
              <span>{{ item.label }}</span>
            </div>
          }
        </ng-template>

        <ng-template #itemTemplate let-item>
          <div class="flex items-center space-x-3 w-full">
            <span class="text-lg">{{ getCountryFlag(item.id) }}</span>
            <div class="flex-1">
              <div class="font-medium">{{ item.label }}</div>
              <div class="text-xs text-muted-foreground">{{ item.subtitle }}</div>
            </div>
          </div>
        </ng-template>
      </sc-combobox2>

      <!-- Phone-style country selector -->
      <sc-combobox2
        [items]="phoneCountries"
        [formControl]="phoneCountryControl"
        label="Phone Country Code"
        placeholder="Select country code..."
      >
        <ng-template #triggerTemplate let-item>
          @if (item) {
            <div class="flex items-center space-x-2">
              <span class="text-lg">{{ getCountryFlag(item.id) }}</span>
              <span class="text-muted-foreground font-mono">{{ item.subtitle }}</span>
            </div>
          }
        </ng-template>

        <ng-template #itemTemplate let-item>
          <div class="flex items-center space-x-3 w-full">
            <span class="text-lg">{{ getCountryFlag(item.id) }}</span>
            <div class="flex-1">
              <div class="font-medium">{{ item.label }}</div>
              <div class="text-xs text-muted-foreground">{{ item.id }}</div>
            </div>
            <div class="text-sm text-muted-foreground font-mono">
              {{ item.subtitle }}
            </div>
          </div>
        </ng-template>
      </sc-combobox2>

      <!-- Timezone selector -->
      <sc-combobox2
        [items]="timezones"
        [formControl]="timezoneControl"
        [config]="{ searchPlaceholder: 'Search timezones...', emptyMessage: 'No timezones found' }"
        label="Timezone"
        placeholder="Select timezone..."
      >
        <ng-template #triggerTemplate let-item>
          @if (item) {
            <div class="flex items-center space-x-2">
              <div class="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center">
                <svg
                  class="w-3 h-3 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12,6 12,12 16,14" />
                </svg>
              </div>
              <span class="text-xs font-mono">{{ item.subtitle }}</span>
            </div>
          }
        </ng-template>

        <ng-template #itemTemplate let-item>
          <div class="flex items-center space-x-3 w-full">
            <div
              class="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0"
            >
              <svg
                class="w-3 h-3 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12,6 12,12 16,14" />
              </svg>
            </div>
            <div class="flex-1 overflow-hidden">
              <div class="font-medium">{{ item.label }}</div>
              <div class="text-xs text-muted-foreground">{{ item.id }}</div>
            </div>
            <div class="text-xs text-muted-foreground font-mono flex-shrink-0">
              {{ item.subtitle }}
            </div>
          </div>
        </ng-template>
      </sc-combobox2>

      <!-- Currency selector -->
      <sc-combobox2
        [items]="currencies"
        [formControl]="currencyControl"
        label="Currency"
        placeholder="Select currency..."
      >
        <ng-template #triggerTemplate let-item>
          @if (item) {
            <div class="flex items-center space-x-2">
              <span class="font-mono text-lg">{{ getCurrencySymbol(item.id) }}</span>
              <span class="font-mono text-sm">{{ item.id }}</span>
            </div>
          }
        </ng-template>

        <ng-template #itemTemplate let-item>
          <div class="flex items-center space-x-3 w-full">
            <div
              class="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0"
            >
              <span class="font-mono text-sm">{{ getCurrencySymbol(item.id) }}</span>
            </div>
            <div class="flex-1">
              <div class="font-medium">{{ item.label }}</div>
              <div class="text-xs text-muted-foreground">{{ item.subtitle }}</div>
            </div>
            <div class="text-xs text-muted-foreground font-mono">
              {{ item.id }}
            </div>
          </div>
        </ng-template>
      </sc-combobox2>

      <!-- Current values display -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="p-4 bg-muted rounded-md">
          <h4 class="font-medium mb-2">Form Values:</h4>
          <div class="space-y-2 text-sm">
            <p>
              <strong>Country:</strong>
              <code>{{ countryControl.value || 'None' }}</code>
            </p>
            <p>
              <strong>Country with Flag:</strong>
              <code>{{ countryWithFlagControl.value || 'None' }}</code>
            </p>
            <p>
              <strong>Phone Country:</strong>
              <code>{{ phoneCountryControl.value || 'None' }}</code>
            </p>
          </div>
        </div>

        <div class="p-4 bg-muted rounded-md">
          <h4 class="font-medium mb-2">More Values:</h4>
          <div class="space-y-2 text-sm">
            <p>
              <strong>Timezone:</strong>
              <code>{{ timezoneControl.value || 'None' }}</code>
            </p>
            <p>
              <strong>Currency:</strong>
              <code>{{ currencyControl.value || 'None' }}</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Combobox2Demo {
  countryControl = new FormControl('', [Validators.required]);
  countryWithFlagControl = new FormControl('');
  phoneCountryControl = new FormControl('');
  timezoneControl = new FormControl('');
  currencyControl = new FormControl('');

  countries: ScCombobox2Item[] = [
    { id: 'US', label: 'United States', subtitle: 'North America' },
    { id: 'GB', label: 'United Kingdom', subtitle: 'Europe' },
    { id: 'CA', label: 'Canada', subtitle: 'North America' },
    { id: 'AU', label: 'Australia', subtitle: 'Oceania' },
    { id: 'DE', label: 'Germany', subtitle: 'Europe' },
    { id: 'FR', label: 'France', subtitle: 'Europe' },
    { id: 'JP', label: 'Japan', subtitle: 'Asia' },
    { id: 'BR', label: 'Brazil', subtitle: 'South America' },
    { id: 'IN', label: 'India', subtitle: 'Asia' },
    { id: 'CN', label: 'China', subtitle: 'Asia' },
    { id: 'MX', label: 'Mexico', subtitle: 'North America' },
    { id: 'IT', label: 'Italy', subtitle: 'Europe' },
    { id: 'ES', label: 'Spain', subtitle: 'Europe' },
    { id: 'NL', label: 'Netherlands', subtitle: 'Europe' },
    { id: 'SE', label: 'Sweden', subtitle: 'Europe' },
  ];

  phoneCountries: ScCombobox2Item[] = [
    { id: 'US', label: 'United States', subtitle: '+1' },
    { id: 'GB', label: 'United Kingdom', subtitle: '+44' },
    { id: 'CA', label: 'Canada', subtitle: '+1' },
    { id: 'AU', label: 'Australia', subtitle: '+61' },
    { id: 'DE', label: 'Germany', subtitle: '+49' },
    { id: 'FR', label: 'France', subtitle: '+33' },
    { id: 'JP', label: 'Japan', subtitle: '+81' },
    { id: 'BR', label: 'Brazil', subtitle: '+55' },
    { id: 'IN', label: 'India', subtitle: '+91' },
    { id: 'CN', label: 'China', subtitle: '+86' },
  ];

  timezones: ScCombobox2Item[] = [
    { id: 'America/New_York', label: 'New York', subtitle: 'GMT-05:00' },
    { id: 'Europe/London', label: 'London', subtitle: 'GMT+00:00' },
    { id: 'Europe/Paris', label: 'Paris', subtitle: 'GMT+01:00' },
    { id: 'Europe/Berlin', label: 'Berlin', subtitle: 'GMT+01:00' },
    { id: 'Asia/Tokyo', label: 'Tokyo', subtitle: 'GMT+09:00' },
    { id: 'Australia/Sydney', label: 'Sydney', subtitle: 'GMT+10:00' },
    { id: 'America/Los_Angeles', label: 'Los Angeles', subtitle: 'GMT-08:00' },
    { id: 'America/Chicago', label: 'Chicago', subtitle: 'GMT-06:00' },
    { id: 'Asia/Shanghai', label: 'Shanghai', subtitle: 'GMT+08:00' },
    { id: 'Asia/Dubai', label: 'Dubai', subtitle: 'GMT+04:00' },
    { id: 'Asia/Singapore', label: 'Singapore', subtitle: 'GMT+08:00' },
    { id: 'Europe/Amsterdam', label: 'Amsterdam', subtitle: 'GMT+01:00' },
  ];

  currencies: ScCombobox2Item[] = [
    { id: 'USD', label: 'US Dollar', subtitle: 'United States' },
    { id: 'EUR', label: 'Euro', subtitle: 'European Union' },
    { id: 'GBP', label: 'British Pound', subtitle: 'United Kingdom' },
    { id: 'JPY', label: 'Japanese Yen', subtitle: 'Japan' },
    { id: 'CAD', label: 'Canadian Dollar', subtitle: 'Canada' },
    { id: 'AUD', label: 'Australian Dollar', subtitle: 'Australia' },
    { id: 'CHF', label: 'Swiss Franc', subtitle: 'Switzerland' },
    { id: 'CNY', label: 'Chinese Yuan', subtitle: 'China' },
    { id: 'INR', label: 'Indian Rupee', subtitle: 'India' },
    { id: 'BRL', label: 'Brazilian Real', subtitle: 'Brazil' },
  ];

  getCountryFlag(countryCode: string): string {
    const flags: Record<string, string> = {
      US: '🇺🇸',
      GB: '🇬🇧',
      CA: '🇨🇦',
      AU: '🇦🇺',
      DE: '🇩🇪',
      FR: '🇫🇷',
      JP: '🇯🇵',
      BR: '🇧🇷',
      IN: '🇮🇳',
      CN: '🇨🇳',
      MX: '🇲🇽',
      IT: '🇮🇹',
      ES: '🇪🇸',
      NL: '🇳🇱',
      SE: '🇸🇪',
    };
    return flags[countryCode] || '🏳️';
  }

  getCurrencySymbol(currencyCode: string): string {
    const symbols: Record<string, string> = {
      USD: '$',
      EUR: '€',
      GBP: '£',
      JPY: '¥',
      CAD: 'C$',
      AUD: 'A$',
      CHF: '₣',
      CNY: '¥',
      INR: '₹',
      BRL: 'R$',
    };
    return symbols[currencyCode] || currencyCode;
  }
}
