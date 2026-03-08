import { Temporal } from '@js-temporal/polyfill';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  signal,
} from '@angular/core';
import {
  ScCalendar,
  ScCalendarHeader,
  ScCalendarHeading,
  ScCalendarNext,
  ScCalendarPrevious,
  ScDateRange,
} from '@semantic-components/ui';
import {
  SiChevronLeftIcon,
  SiChevronRightIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-range-calendar-demo',
  imports: [
    ScCalendar,
    ScCalendarHeader,
    ScCalendarHeading,
    ScCalendarNext,
    ScCalendarPrevious,
    SiChevronLeftIcon,
    SiChevronRightIcon,
  ],
  template: `
    <div class="space-y-4">
      <div class="w-fit rounded-md border">
        <sc-calendar mode="range" [(value)]="selectedRange" #cal="scCalendar">
          <div scCalendarHeader>
            <button scCalendarPrevious>
              <svg siChevronLeftIcon class="size-4"></svg>
              <span class="sr-only">
                @switch (cal.viewMode()) {
                  @case ('day') {
                    Go to previous month
                  }
                  @case ('month') {
                    Go to previous year
                  }
                  @case ('year') {
                    Go to previous decade
                  }
                }
              </span>
            </button>
            <button scCalendarHeading>{{ cal.heading() }}</button>
            <button scCalendarNext>
              <svg siChevronRightIcon class="size-4"></svg>
              <span class="sr-only">
                @switch (cal.viewMode()) {
                  @case ('day') {
                    Go to next month
                  }
                  @case ('month') {
                    Go to next year
                  }
                  @case ('year') {
                    Go to next decade
                  }
                }
              </span>
            </button>
          </div>
        </sc-calendar>
      </div>

      <div class="space-y-2">
        @if (selectedRange().from) {
          <div class="bg-muted/50 rounded-md border p-4">
            <div class="mb-3 flex items-center justify-between">
              <p class="text-sm font-medium">Selected Range</p>
              <button
                type="button"
                class="hover:bg-accent rounded-md border px-3 py-1 text-sm"
                (click)="clearSelection()"
              >
                Clear
              </button>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <p class="text-muted-foreground mb-1 text-xs">From</p>
                <p class="text-sm">
                  {{ selectedRange().from?.toLocaleString() }}
                </p>
              </div>
              <div>
                <p class="text-muted-foreground mb-1 text-xs">To</p>
                <p class="text-sm">
                  @if (selectedRange().to) {
                    {{ selectedRange().to?.toLocaleString() }}
                  } @else {
                    <span class="text-muted-foreground">Not selected</span>
                  }
                </p>
              </div>
            </div>
            @if (dayCount() !== null) {
              <p class="text-muted-foreground mt-2 text-xs">
                {{ dayCount() }}
                {{ dayCount() === 1 ? 'day' : 'days' }} selected
              </p>
            }
          </div>
        } @else {
          <p
            class="text-muted-foreground rounded-md border p-4 text-center text-sm"
          >
            No range selected. Click a start date, then click an end date.
          </p>
        }
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RangeCalendarDemo {
  readonly selectedRange = signal<ScDateRange>({
    from: undefined,
    to: undefined,
  });

  readonly dayCount = computed(() => {
    const range = this.selectedRange();
    if (range.from && range.to) {
      return range.from.until(range.to).days + 1;
    }
    return null;
  });

  clearSelection(): void {
    this.selectedRange.set({ from: undefined, to: undefined });
  }
}
