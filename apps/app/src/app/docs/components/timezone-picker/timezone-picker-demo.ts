import { JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
  inject,
  signal,
} from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import { TimezoneService } from '@semantic-components/timezone';
import {
  ScCombobox2,
  ScCombobox2Item,
  ScField,
  ScFieldErrorMessage,
  ScLabel,
} from '@semantic-components/ui';

@Component({
  selector: 'app-timezone-picker-demo',
  imports: [ScCombobox2, ScField, ScLabel, ScFieldErrorMessage, ReactiveFormsModule, JsonPipe],
  template: `
    <div class="space-y-8">
      <!-- Basic usage with built-in label -->
      <sc-combobox2
        [items]="timezoneItems()"
        [config]="{ searchPlaceholder: 'Search timezones...', showSearch: true }"
        label="Timezone"
        placeholder="Search for your timezone..."
        helperText="Start typing to search through available timezones"
      />

      <!-- With form control and validation -->
      <div sc-field>
        <label sc-label>Timezone (Required)</label>
        <sc-combobox2
          [formControl]="timezoneControl"
          [required]="true"
          [showErrors]="true"
          [items]="timezoneItems()"
          [config]="{ searchPlaceholder: 'Search timezones...', showSearch: true }"
          (selectionChange)="onTimezoneChange($event)"
          placeholder="Search timezones..."
        />
        @if (timezoneControl.errors?.['required'] && timezoneControl.touched) {
          <div sc-field-error-message>Timezone is required</div>
        }
      </div>

      <!-- With event handling -->
      <sc-combobox2
        [items]="timezoneItems()"
        [config]="{ searchPlaceholder: 'Search timezones...', showSearch: true }"
        (selectionChange)="onTimezoneSelection($event)"
        label="Timezone with Events"
        placeholder="Select timezone to see event data..."
      />

      @if (selectedTimezoneData) {
        <div class="p-4 bg-muted rounded-md">
          <h4 class="font-medium mb-2">Selected Timezone Data:</h4>
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
export class TimezonePickerDemo implements OnInit {
  private timezoneService = inject(TimezoneService);

  timezoneControl = new FormControl('', [Validators.required]);
  timezoneItems = signal<ScCombobox2Item[]>([]);
  selectedTimezoneData: ScCombobox2Item | null = null;

  async ngOnInit() {
    const timezones = await this.timezoneService.getTimezones();
    const items: ScCombobox2Item[] = timezones.map((tz) => ({
      id: tz.id,
      label: tz.label,
      subtitle: tz.city,
      data: tz,
    }));
    this.timezoneItems.set(items);
  }

  onTimezoneChange(item: ScCombobox2Item | null) {
    // Handle form control change
  }

  onTimezoneSelection(item: ScCombobox2Item | null) {
    this.selectedTimezoneData = item;
  }
}
