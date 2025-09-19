import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { ScCombobox, ScComboboxItem } from './combobox';

@Component({
  selector: 'sc-combobox-demo',
  imports: [ScCombobox, ReactiveFormsModule],
  template: `
    <div class="space-y-8">
      <!-- Basic usage -->
      <sc-combobox
        [items]="countries"
        label="Country"
        placeholder="Select country..."
        helperText="Choose your country"
      />

      <!-- With custom trigger template -->
      <sc-combobox
        [items]="countries"
        [formControl]="countryControl"
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
      </sc-combobox>

      <!-- Timezone example -->
      <sc-combobox
        [items]="timezones"
        [config]="{ searchPlaceholder: 'Search timezones...' }"
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
              <span class="text-xs">{{ item.subtitle }}</span>
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
      </sc-combobox>

      <!-- Current values -->
      <div class="p-4 bg-muted rounded-md">
        <h4 class="font-medium mb-2">Selected Values:</h4>
        <p>
          Country:
          <code>{{ countryControl.value || 'None' }}</code>
        </p>
      </div>
    </div>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScComboboxDemo {
  countryControl = new FormControl('');

  countries: ScComboboxItem[] = [
    { id: 'US', label: 'United States', subtitle: 'North America' },
    { id: 'GB', label: 'United Kingdom', subtitle: 'Europe' },
    { id: 'CA', label: 'Canada', subtitle: 'North America' },
    { id: 'AU', label: 'Australia', subtitle: 'Oceania' },
    { id: 'DE', label: 'Germany', subtitle: 'Europe' },
    { id: 'FR', label: 'France', subtitle: 'Europe' },
    { id: 'JP', label: 'Japan', subtitle: 'Asia' },
    { id: 'BR', label: 'Brazil', subtitle: 'South America' },
  ];

  timezones: ScComboboxItem[] = [
    { id: 'America/New_York', label: 'New York', subtitle: 'GMT-05:00' },
    { id: 'Europe/London', label: 'London', subtitle: 'GMT+00:00' },
    { id: 'Europe/Paris', label: 'Paris', subtitle: 'GMT+01:00' },
    { id: 'Asia/Tokyo', label: 'Tokyo', subtitle: 'GMT+09:00' },
    { id: 'Australia/Sydney', label: 'Sydney', subtitle: 'GMT+10:00' },
    { id: 'America/Los_Angeles', label: 'Los Angeles', subtitle: 'GMT-08:00' },
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
    };
    return flags[countryCode] || '🏳️';
  }
}
