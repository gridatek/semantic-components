import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { MultipleDatePickerDemo } from './multiple-date-picker-demo';

@Component({
  selector: 'app-multiple-date-picker-demo-container',
  imports: [DemoContainer, MultipleDatePickerDemo],
  template: `
    <app-demo-container
      title="Multiple Dates"
      demoUrl="/demos/date-picker/multiple-date-picker-demo"
      [code]="code"
    >
      <app-multiple-date-picker-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultipleDatePickerDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ScDatePicker } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-multiple-date-picker-demo',
  imports: [ScDatePicker],
  template: \`
    <sc-date-picker
      mode="multiple"
      [(selectedDates)]="selectedDates"
      placeholder="Select dates"
    />
    @if (selectedDates().length > 0) {
      <p class="text-sm text-muted-foreground mt-4">
        {{ selectedDates().length }} date(s) selected
      </p>
    }
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultipleDatePickerDemo {
  readonly selectedDates = signal<Date[]>([]);
}`;
}
