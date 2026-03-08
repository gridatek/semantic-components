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
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultipleDatePickerDemoContainer {
  readonly code = `import { Temporal } from '@js-temporal/polyfill';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { ScDatePicker } from '@semantic-components/ui';

@Component({
  selector: 'app-multiple-date-picker-demo',
  imports: [ScDatePicker],
  template: \`
    <div class="space-y-4">
      <sc-date-picker
        mode="multiple"
        [(value)]="selectedDates"
        placeholder="Select dates"
      />

      @if (selectedDates().length > 0) {
        <div
          class="bg-muted/50 flex items-center justify-between rounded-md border p-4"
        >
          <div>
            <p class="text-sm font-medium">Selected Dates</p>
            <p class="text-muted-foreground text-sm">
              {{ selectedDates().length }} date(s) selected
            </p>
          </div>
          <button
            type="button"
            class="hover:bg-accent rounded-md border px-3 py-1 text-sm"
            (click)="clearSelection()"
          >
            Clear
          </button>
        </div>
      } @else {
        <p
          class="text-muted-foreground rounded-md border p-4 text-center text-sm"
        >
          No dates selected
        </p>
      }
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultipleDatePickerDemo {
  readonly selectedDates = signal<Temporal.PlainDate[]>([]);

  clearSelection(): void {
    this.selectedDates.set([]);
  }
}`;
}
