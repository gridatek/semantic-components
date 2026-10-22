import {
  Component,
  ViewEncapsulation,
  computed,
  forwardRef,
  inject,
} from '@angular/core';
import { cn } from '../../utils';
import { ScCalendar } from './calendar';

/**
 * The year's months, as a grid — internal: the calendar's month view.
 * ← → a month, ↑ ↓ three, PageUp and PageDown a year; Enter or Space shows
 * its days. Months outside min and max cannot be picked.
 */
@Component({
  selector: '[scCalendarMonths]',
  template: `
    <table
      role="grid"
      class="border-collapse"
      [attr.aria-label]="year()"
      (keydown)="onKeydown($event)"
    >
      <tbody>
        @for (row of rows(); track $index) {
          <tr class="flex">
            @for (month of row; track month.toString()) {
              <td
                data-slot="calendar-cell-month"
                [attr.tabindex]="isFocused(month) ? 0 : -1"
                [attr.aria-selected]="isFocused(month)"
                [attr.aria-disabled]="isOut(month) || null"
                [attr.aria-current]="isCurrent(month) ? 'date' : null"
                [class]="cellClass(month)"
                (click)="pick(month)"
              >
                <span aria-hidden="true">{{ short(month) }}</span>
                <span class="sr-only">{{ long(month) }}</span>
              </td>
            }
          </tr>
        }
      </tbody>
    </table>
  `,
  host: { 'data-slot': 'calendar-months' },
  encapsulation: ViewEncapsulation.None,
})
export class ScCalendarMonths {
  protected readonly calendar = inject(forwardRef(() => ScCalendar));

  protected readonly year = computed(() => this.calendar.focused().year);

  protected readonly rows = computed(() => {
    const year = this.year();
    return Array.from({ length: 4 }, (_, r) =>
      Array.from({ length: 3 }, (_, c) =>
        Temporal.PlainYearMonth.from({ year, month: r * 3 + c + 1 }),
      ),
    );
  });

  protected isFocused(month: Temporal.PlainYearMonth): boolean {
    return month.equals(this.calendar.focused().toPlainYearMonth());
  }

  protected isCurrent(month: Temporal.PlainYearMonth): boolean {
    return month.equals(this.calendar.today().toPlainYearMonth());
  }

  /** Wholly before min or after max. */
  protected isOut(month: Temporal.PlainYearMonth): boolean {
    const min = this.calendar.minDate();
    const max = this.calendar.maxDate();
    return (
      (!!min &&
        Temporal.PlainYearMonth.compare(month, min.toPlainYearMonth()) < 0) ||
      (!!max &&
        Temporal.PlainYearMonth.compare(month, max.toPlainYearMonth()) > 0)
    );
  }

  protected short(month: Temporal.PlainYearMonth): string {
    return month
      .toPlainDate({ day: 1 })
      .toLocaleString(this.calendar.locale(), { month: 'short' });
  }

  protected long(month: Temporal.PlainYearMonth): string {
    return month
      .toPlainDate({ day: 1 })
      .toLocaleString(this.calendar.locale(), {
        month: 'long',
        year: 'numeric',
      });
  }

  protected pick(month: Temporal.PlainYearMonth): void {
    if (this.isOut(month)) return;
    this.calendar.pickMonth(month);
    this.calendar.focusCell();
  }

  protected onKeydown(event: KeyboardEvent): void {
    const rtl =
      getComputedStyle(event.currentTarget as Element).direction === 'rtl';
    const by: Record<string, Temporal.DurationLike> = {
      ArrowLeft: { months: rtl ? 1 : -1 },
      ArrowRight: { months: rtl ? -1 : 1 },
      ArrowUp: { months: -3 },
      ArrowDown: { months: 3 },
      PageUp: { years: -1 },
      PageDown: { years: 1 },
    };
    const focused = this.calendar.focused();
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.pick(focused.toPlainYearMonth());
      return;
    }
    if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault();
      const column = (focused.month - 1) % 3;
      const months = event.key === 'Home' ? -column : 2 - column;
      this.calendar.moveTo(focused.add({ months }), true);
      return;
    }
    const step = by[event.key];
    if (!step) return;
    event.preventDefault();
    this.calendar.moveTo(focused.add(step), true);
  }

  protected cellClass(month: Temporal.PlainYearMonth): string {
    const picked = this.isFocused(month);
    return cn(
      'flex h-12 w-[5.5rem] cursor-pointer items-center justify-center rounded-md text-sm outline-none select-none',
      'hover:bg-accent hover:text-accent-foreground',
      'focus-visible:ring-ring/50 focus-visible:ring-3',
      this.isCurrent(month) && !picked && 'bg-accent text-accent-foreground',
      picked &&
        'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground',
      this.isOut(month) &&
        'text-muted-foreground pointer-events-none opacity-50',
    );
  }
}
