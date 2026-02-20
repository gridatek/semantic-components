import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { PlaceholderDatePickerDemo } from './placeholder-date-picker-demo';

@Component({
  selector: 'app-placeholder-date-picker-demo-container',
  imports: [DemoContainer, PlaceholderDatePickerDemo],
  template: `
    <app-demo-container
      title="Custom Placeholder"
      demoUrl="/demos/date-picker/placeholder-date-picker-demo"
      [code]="code"
    >
      <app-placeholder-date-picker-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaceholderDatePickerDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { Temporal } from '@js-temporal/polyfill';
import { ScDatePicker } from '@semantic-components/ui';

@Component({
  selector: 'app-placeholder-date-picker-demo',
  imports: [ScDatePicker],
  template: \`
    <sc-date-picker
      [(value)]="selectedDate"
      placeholder="Select your birthday"
    />
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaceholderDatePickerDemo {
  readonly selectedDate = signal<Temporal.PlainDate | undefined>(undefined);
}`;
}
