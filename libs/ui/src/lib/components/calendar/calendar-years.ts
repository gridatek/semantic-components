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
 * Twelve years, as a grid — internal: the calendar's year view. ← → a
 * year, ↑ ↓ three, PageUp and PageDown twelve; Enter or Space shows its
 * months. Years outside min and max cannot be picked.
 */
@Component({
  selector: '[scCalendarYears]',
  template: `
    <table
      role="grid"
      class="border-collapse"
      [attr.aria-label]="calendar.heading()"
      (keydown)="onKeydown($event)"
    >
      <tbody>
        @for (row of rows(); track $index) {
          <tr class="flex">
            @for (year of row; track year) {
              <td
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
                {{ year }}
              </td>
            }
          </tr>
        }
      </tbody>
    </table>
  `,
  host: { 'data-slot': 'calendar-years' },
  encapsulation: ViewEncapsulation.None,
})
export class ScCalendarYears {
  protected readonly calendar = inject(forwardRef(() => ScCalendar));

  protected readonly focusedYear = computed(() => this.calendar.focused().year);

  protected readonly rows = computed(() => {
    const start = this.calendar.decadeStart();
    return Array.from({ length: 4 }, (_, r) =>
      Array.from({ length: 3 }, (_, c) => start + r * 3 + c),
    );
  });

  /** The focused year, or — paged away from it — the first shown. */
  protected tabIndex(year: number): number {
    const start = this.calendar.decadeStart();
    const focused = this.focusedYear();
    const shown = focused >= start && focused < start + 12;
    return (shown ? year === focused : year === start) ? 0 : -1;
  }

  protected isOut(year: number): boolean {
    const min = this.calendar.minDate();
    const max = this.calendar.maxDate();
    return (!!min && year < min.year) || (!!max && year > max.year);
  }

  protected pick(year: number): void {
    if (this.isOut(year)) return;
    this.calendar.pickYear(year);
    this.calendar.focusCell();
  }

  protected onKeydown(event: KeyboardEvent): void {
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

  protected cellClass(year: number): string {
    const picked = year === this.focusedYear();
    return cn(
      'flex h-12 w-[5.5rem] cursor-pointer items-center justify-center rounded-md text-sm outline-none select-none',
      'hover:bg-accent hover:text-accent-foreground',
      'focus-visible:ring-ring/50 focus-visible:ring-3',
      year === this.calendar.today().year &&
        !picked &&
        'bg-accent text-accent-foreground',
      picked &&
        'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground',
      this.isOut(year) &&
        'text-muted-foreground pointer-events-none opacity-50',
    );
  }
}
