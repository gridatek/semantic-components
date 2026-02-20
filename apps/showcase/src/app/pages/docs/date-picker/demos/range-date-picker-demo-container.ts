import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RangeDatePickerDemo } from './range-date-picker-demo';

@Component({
  selector: 'app-range-date-picker-demo-container',
  imports: [DemoContainer, RangeDatePickerDemo],
  template: `
    <app-demo-container
      title="Date Range"
      demoUrl="/demos/date-picker/range-date-picker-demo"
      [code]="code"
    >
      <app-range-date-picker-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RangeDatePickerDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ScDateRange, ScDatePicker } from '@semantic-components/ui';

@Component({
  selector: 'app-range-date-picker-demo',
  imports: [ScDatePicker],
  template: \`
    <sc-date-picker
      mode="range"
      [(value)]="selectedRange"
      placeholder="Pick a date range"
    />
    @if (selectedRange().from) {
      <p class="text-sm text-muted-foreground mt-4">
        @if (selectedRange().to) {
          {{ selectedRange().from?.toLocaleString() }} -
          {{ selectedRange().to?.toLocaleString() }}
        } @else {
          {{ selectedRange().from?.toLocaleString() }} - ...
        }
      </p>
    }
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RangeDatePickerDemo {
  readonly selectedRange = signal<ScDateRange>({
    from: undefined,
    to: undefined,
  });
}`;
}
