import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { FormDatePickerDemo } from './form-date-picker-demo';

@Component({
  selector: 'app-form-date-picker-demo-container',
  imports: [DemoContainer, FormDatePickerDemo],
  template: `
    <app-demo-container
      title="Form Example"
      demoUrl="/demos/date-picker/form-date-picker-demo"
      [code]="code"
    >
      <app-form-date-picker-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormDatePickerDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ScDatePicker } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-form-date-picker-demo',
  imports: [ScDatePicker],
  template: \`
    <div class="grid gap-4 max-w-sm">
      <div class="space-y-2">
        <label class="text-sm font-medium">Date of Birth</label>
        <sc-date-picker
          [(selected)]="dob"
          placeholder="Select date of birth"
          [maxDate]="today"
        />
      </div>
      <div class="space-y-2">
        <label class="text-sm font-medium">Appointment Date</label>
        <sc-date-picker
          [(selected)]="appointment"
          placeholder="Select appointment"
          [minDate]="today"
        />
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormDatePickerDemo {
  readonly dob = signal<Date | undefined>(undefined);
  readonly appointment = signal<Date | undefined>(undefined);
  readonly today = new Date();
}`;
}
