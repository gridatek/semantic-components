import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { ScTimezonePicker } from '@semantic-components/timezone';
import { ScField, ScLabel } from '@semantic-components/ui';

@Component({
  selector: 'app-timezone-picker-demo',
  imports: [ScTimezonePicker, ScField, ScLabel, ReactiveFormsModule],
  template: `
    <div class="space-y-6">
      <!-- Basic usage -->
      <div sc-field>
        <label sc-label>Timezone</label>
        <sc-timezone-picker placeholder="Select your timezone" />
      </div>

      <!-- With form control -->
      <div sc-field>
        <label sc-label>Timezone (with form control)</label>
        <sc-timezone-picker
          [formControl]="timezoneControl"
          placeholder="Choose your timezone"
          locale="fr"
        />
        <p class="text-sm text-muted-foreground mt-2">
          Selected: {{ timezoneControl.value || 'None' }}
        </p>
      </div>
    </div>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimezonePickerDemo {
  timezoneControl = new FormControl('');
}
