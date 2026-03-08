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
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RangeDatePickerDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { ScDatePicker, ScDateRange } from '@semantic-components/ui';

@Component({
  selector: 'app-range-date-picker-demo',
  imports: [ScDatePicker],
  template: \`
    <div class="space-y-4">
      <sc-date-picker
        mode="range"
        [(value)]="selectedRange"
        placeholder="Pick a date range"
      />

      @if (selectedRange().from) {
        <div
          class="bg-muted/50 flex items-center justify-between rounded-md border p-4"
        >
          <div>
            <p class="text-sm font-medium">Selected Range</p>
            <p class="text-muted-foreground text-sm">
              @if (selectedRange().to) {
                {{ selectedRange().from?.toLocaleString() }} -
                {{ selectedRange().to?.toLocaleString() }}
              } @else {
                {{ selectedRange().from?.toLocaleString() }} - ...
              }
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
          No range selected
        </p>
      }
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RangeDatePickerDemo {
  readonly selectedRange = signal<ScDateRange>({
    from: undefined,
    to: undefined,
  });

  clearSelection(): void {
    this.selectedRange.set({ from: undefined, to: undefined });
  }
}`;
}
