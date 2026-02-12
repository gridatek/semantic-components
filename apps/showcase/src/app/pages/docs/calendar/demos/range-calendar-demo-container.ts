import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RangeCalendarDemo } from './range-calendar-demo';

@Component({
  selector: 'app-range-calendar-demo-container',
  imports: [DemoContainer, RangeCalendarDemo],
  template: `
    <app-demo-container
      title="Date Range Selection"
      demoUrl="/demos/calendar/range-calendar-demo"
      [code]="code"
    >
      <app-range-calendar-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RangeCalendarDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { DateRange, ScCalendar } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-range-calendar-demo',
  imports: [ScCalendar],
  template: \`
    <div class="space-y-4">
      <div class="rounded-md border">
        <sc-calendar mode="range" [(selectedRange)]="selectedRange" />
      </div>

      <div class="space-y-2">
        @if (selectedRange().from) {
          <div class="p-4 rounded-md border bg-muted/50">
            <div class="flex items-center justify-between mb-3">
              <p class="text-sm font-medium">Selected Range</p>
              <button
                type="button"
                class="px-3 py-1 text-sm rounded-md border hover:bg-accent"
                (click)="clearSelection()"
              >
                Clear
              </button>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <p class="text-xs text-muted-foreground mb-1">From</p>
                <p class="text-sm">
                  {{ selectedRange().from?.toLocaleDateString() }}
                </p>
              </div>
              <div>
                <p class="text-xs text-muted-foreground mb-1">To</p>
                <p class="text-sm">
                  @if (selectedRange().to) {
                    {{ selectedRange().to?.toLocaleDateString() }}
                  } @else {
                    <span class="text-muted-foreground">Not selected</span>
                  }
                </p>
              </div>
            </div>
            @if (dayCount() !== null) {
              <p class="text-xs text-muted-foreground mt-2">
                {{ dayCount() }}
                {{ dayCount() === 1 ? 'day' : 'days' }} selected
              </p>
            }
          </div>
        } @else {
          <p
            class="text-sm text-muted-foreground p-4 text-center border rounded-md"
          >
            No range selected. Click a start date, then click an end date.
          </p>
        }
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RangeCalendarDemo {
  readonly selectedRange = signal<DateRange>({
    from: undefined,
    to: undefined,
  });

  readonly dayCount = computed(() => {
    const range = this.selectedRange();
    if (range.from && range.to) {
      const diff = range.to.getTime() - range.from.getTime();
      return Math.ceil(diff / (1000 * 60 * 60 * 24)) + 1;
    }
    return null;
  });

  clearSelection(): void {
    this.selectedRange.set({ from: undefined, to: undefined });
  }
}`;
}
