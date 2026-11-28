import {
  Component,
  ViewEncapsulation,
  computed,
  forwardRef,
  inject,
} from '@angular/core';
import { cn } from 'cn';
import { injectFormatNumber } from '../../utils';
import { ScCalendar } from './calendar';

/**
 * Twelve years, as a grid — internal: the calendar's year view. ← → a
 * year, ↑ ↓ three, PageUp and PageDown twelve; Enter or Space shows its
 * months. Years outside min and max cannot be picked.
 */
@Component({
  selector: '[scCalendarYears]',
  template: `
    <!-- A grid of divs, not a table: there are no column names to give,
      and a table without header cells is a layout table to WAVE. Its size
      on a box (as the days' table, which WebKit lets run past its frame). -->
    <div class="w-[calc(var(--cell-size)*7)] max-w-full min-w-full">
      <div
        role="grid"
        class="w-full"
        [attr.aria-label]="calendar.heading()"
        (keydown)="onKeydown($event)"
      >
        @for (row of rows(); track $index) {
          <div role="row" class="flex w-full">
            @for (year of row; track year) {
              <div
                role="gridcell"
                data-slot="calendar-cell-year"
                [attr.tabindex]="tabIndex(year)"
                [attr.aria-selected]="year === focusedYear()"
                [attr.aria-disabled]="isOut(year) || null"
                [attr.aria-current]="
                  year === calendar.today().year ? 'date' : null
                "
                [class]="cellClass(year)"
                (click)="pick(year)"
              >
                {{ formatNumber(year, { useGrouping: false }) }}
              </div>
            }
          </div>
        }
      </div>
    </div>
  `,
  host: { 'data-slot': 'calendar-years', class: 'w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ScCalendarYears {
  /** Its years, in the user's numbering system (no grouping: 2026, ٢٠٢٦). */
  private readonly formatNumber = injectFormatNumber();

  private readonly calendar = inject(forwardRef(() => ScCalendar));

  private readonly focusedYear = computed(() => this.calendar.focused().year);

  private readonly rows = computed(() => {
    const start = this.calendar.decadeStart();
    return Array.from({ length: 4 }, (_, r) =>
      Array.from({ length: 3 }, (_, c) => start + r * 3 + c),
    );
  });

  /** The focused year, or — paged away from it — the first shown. */
  private tabIndex(year: number): number {
    const start = this.calendar.decadeStart();
    const focused = this.focusedYear();
    const shown = focused >= start && focused < start + 12;
    return (shown ? year === focused : year === start) ? 0 : -1;
  }

  private isOut(year: number): boolean {
    const min = this.calendar.minDate();
    const max = this.calendar.maxDate();
    return (!!min && year < min.year) || (!!max && year > max.year);
  }

  private pick(year: number): void {
    if (this.isOut(year)) return;
    this.calendar.pickYear(year);
    this.calendar.focusCell();
  }

  private onKeydown(event: KeyboardEvent): void {
    const rtl =
      getComputedStyle(event.currentTarget as Element).direction === 'rtl';
    const by: Record<string, number> = {
      ArrowLeft: rtl ? 1 : -1,
      ArrowRight: rtl ? -1 : 1,
      ArrowUp: -3,
      ArrowDown: 3,
      PageUp: -12,
      PageDown: 12,
    };
    const focused = this.calendar.focused();
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.pick(focused.year);
      return;
    }
    const step = by[event.key];
    if (step === undefined) return;
    event.preventDefault();
    this.calendar.moveTo(focused.add({ years: step }), true);
  }

  private cellClass(year: number): string {
    const picked = year === this.focusedYear();
    return cn(
      'flex h-[calc(var(--cell-size)*1.5)] min-w-0 flex-1 cursor-pointer items-center justify-center rounded-(--cell-radius) text-sm outline-none select-none',
      'hover:bg-muted hover:text-foreground',
      'focus-visible:ring-ring/50 focus-visible:ring-3',
      year === this.calendar.today().year &&
        !picked &&
        'bg-muted text-foreground',
      picked &&
        'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground',
      this.isOut(year) &&
        'text-muted-foreground pointer-events-none opacity-50',
    );
  }
}
