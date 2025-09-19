import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import { ScTimezonePicker, TimezoneChangeEvent } from '@semantic-components/timezone';
import { ScField, ScFieldErrorMessage, ScLabel } from '@semantic-components/ui';

@Component({
  selector: 'app-timezone-picker-demo',
  imports: [ScTimezonePicker, ScField, ScLabel, ScFieldErrorMessage, ReactiveFormsModule, JsonPipe],
  template: `
    <div class="space-y-8">
      <!-- Basic usage with built-in label -->
      <sc-timezone-picker
        label="Timezone"
        placeholder="Search for your timezone..."
        helperText="Start typing to search through available timezones"
      />

      <!-- With form control and validation -->
      <div sc-field>
        <label sc-label>Timezone (Required)</label>
        <sc-timezone-picker
          [formControl]="timezoneControl"
          [required]="true"
          [showErrors]="true"
          placeholder="Search timezones..."
          locale="en"
        />
        @if (timezoneControl.errors?.['required'] && timezoneControl.touched) {
          <div sc-field-error-message>Timezone is required</div>
        }
      </div>

      <!-- Localized version -->
      <sc-timezone-picker
        label="Fuseau horaire"
        placeholder="Rechercher un fuseau horaire..."
        locale="fr"
        helperText="Version française avec locale FR"
      />

      <!-- With event handling -->
      <sc-timezone-picker
        (timezoneChange)="onTimezoneChange($event)"
        label="Timezone with Events"
        placeholder="Select timezone to see event data..."
      />

      @if (selectedTimezoneData) {
        <div class="p-4 bg-muted rounded-md">
          <h4 class="font-medium mb-2">Event Data:</h4>
          <pre class="text-sm">{{ selectedTimezoneData | json }}</pre>
        </div>
      }

      <!-- Current form value -->
      <div class="p-4 bg-muted rounded-md">
        <h4 class="font-medium mb-2">Form Control Value:</h4>
        <code>{{ timezoneControl.value || 'None selected' }}</code>
      </div>
    </div>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimezonePickerDemo {
  timezoneControl = new FormControl('', [Validators.required]);
  selectedTimezoneData: TimezoneChangeEvent | null = null;

  onTimezoneChange(event: TimezoneChangeEvent) {
    this.selectedTimezoneData = event;
  }
}
