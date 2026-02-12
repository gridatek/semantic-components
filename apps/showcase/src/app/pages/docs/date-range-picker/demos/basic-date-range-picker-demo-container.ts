import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicDateRangePickerDemo } from './basic-date-range-picker-demo';

@Component({
  selector: 'app-basic-date-range-picker-demo-container',
  imports: [DemoContainer, BasicDateRangePickerDemo],
  template: `
    <app-demo-container
      title="Basic"
      demoUrl="/demos/date-range-picker/basic-date-range-picker-demo"
      [code]="code"
    >
      <app-basic-date-range-picker-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicDateRangePickerDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ScDateRangePicker, DateRange } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-basic-date-range-picker-demo',
  imports: [ScDateRangePicker],
  template: \`
    <sc-date-range-picker
      [(value)]="range"
      placeholder="Select date range"
      (apply)="onRangeApply($event)"
    />
    <p class="text-sm text-muted-foreground mt-4">
      @if (range().from && range().to) {
        Selected: {{ range().from?.toLocaleDateString() }} -
        {{ range().to?.toLocaleDateString() }}
      } @else {
        No range selected
      }
    </p>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicDateRangePickerDemo {
  readonly range = signal<DateRange>({ from: undefined, to: undefined });

  onRangeApply(range: DateRange): void {
    console.log('Range applied:', range);
  }
}`;
}
