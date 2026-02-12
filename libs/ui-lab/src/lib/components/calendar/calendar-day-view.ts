import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  viewChildren,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { Grid, GridRow, GridCell, GridCellWidget } from '@angular/aria/grid';
import { cn } from '../../utils';

interface DayInfo {
  date: Date;
  isToday: boolean;
  isOutsideMonth: boolean;
  disabled: boolean;
  selected: ReturnType<typeof signal<boolean>>;
}

@Component({
  selector: 'sc-calendar-day-view',
  imports: [Grid, GridRow, GridCell, GridCellWidget],
  template: `
    <table
      ngGrid
      tabindex="0"
      class="w-full border-collapse"
      colWrap="continuous"
      rowWrap="nowrap"
      [enableSelection]="mode() !== 'multiple'"
      selectionMode="explicit"
      (keydown)="handleKeyDown($event)"
    >
      <thead>
        <tr class="flex">
          @for (day of weekDays(); track day) {
            <th
              scope="col"
              class="w-9 rounded-md text-[0.8rem] font-normal text-muted-foreground"
            >
              {{ day }}
            </th>
          }
        </tr>
      </thead>
      <tbody>
        @for (week of weeks(); track $index) {
          <tr ngGridRow class="mt-2 flex w-full">
            @for (day of week; track day?.date?.getTime() ?? $index) {
              @if (day) {
                <td
                  ngGridCell
                  class="relative p-0 text-center text-sm"
                  [disabled]="day.disabled || day.isOutsideMonth"
                  [(selected)]="day.selected"
                >
                  <button
                    ngGridCellWidget
                    type="button"
                    [class]="getDayClass(day)"
                    [attr.aria-label]="day.date.toDateString()"
                    [attr.data-today]="day.isToday || null"
                    [attr.data-selected]="isSelected(day.date) || null"
                    [attr.data-outside]="day.isOutsideMonth || null"
                    [attr.data-disabled]="day.disabled || null"
                    [attr.data-range-start]="isRangeStart(day.date) || null"
                    [attr.data-range-end]="isRangeEnd(day.date) || null"
                    [attr.data-range-middle]="isRangeMiddle(day.date) || null"
                    [attr.data-day]="day.date.getDate()"
                    (click)="handleDateClick(day.date)"
                  >
                    {{ day.date.getDate() }}
                  </button>
                </td>
              } @else {
                <td
                  ngGridCell
                  class="relative p-0 text-center text-sm"
                  disabled
                >
                  <span class="size-9"></span>
                </td>
              }
            }
          </tr>
        }
      </tbody>
    </table>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScCalendarDayView {
  private readonly _dayButtons = viewChildren(GridCellWidget);

  readonly viewDate = input.required<Date>();
  readonly mode = input.required<'single' | 'multiple' | 'range'>();
  readonly selected = input<Date | undefined>(undefined);
  readonly selectedDates = input<Date[]>([]);
  readonly selectedRange = input<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });
  readonly disabled = input<Date[]>([]);
  readonly minDate = input<Date | undefined>(undefined);
  readonly maxDate = input<Date | undefined>(undefined);

  readonly dateSelected = output<Date>();
  readonly monthScrollUp = output<void>();
  readonly monthScrollDown = output<void>();

  readonly weekDays = input(['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']);

  protected readonly weeks = computed(() => {
    const date = this.viewDate();
    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const days: (DayInfo | null)[][] = [];
    let currentWeek: (DayInfo | null)[] = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay.getDay(); i++) {
      const prevDate = new Date(year, month, -firstDay.getDay() + i + 1);
      currentWeek.push(this.createDayInfo(prevDate, true));
    }

    // Add days of the month
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const currentDate = new Date(year, month, day);
      currentWeek.push(this.createDayInfo(currentDate, false));

      if (currentWeek.length === 7) {
        days.push(currentWeek);
        currentWeek = [];
      }
    }

    // Add days from next month to fill the last week
    if (currentWeek.length > 0) {
      let nextDay = 1;
      while (currentWeek.length < 7) {
        const nextDate = new Date(year, month + 1, nextDay++);
        currentWeek.push(this.createDayInfo(nextDate, true));
      }
      days.push(currentWeek);
    }

    return days;
  });

  private createDayInfo(date: Date, isOutsideMonth: boolean): DayInfo {
    const today = new Date();
    const isToday =
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();

    const disabled = this.isDateDisabled(date);

    return {
      date,
      isToday,
      isOutsideMonth,
      disabled,
      selected: signal(this.isSelected(date)),
    };
  }

  private isDateDisabled(date: Date): boolean {
    const disabledDates = this.disabled();
    const min = this.minDate();
    const max = this.maxDate();

    if (min && date < min) return true;
    if (max && date > max) return true;

    return disabledDates.some(
      (d) =>
        d.getDate() === date.getDate() &&
        d.getMonth() === date.getMonth() &&
        d.getFullYear() === date.getFullYear(),
    );
  }

  protected isSelected(date: Date): boolean {
    const mode = this.mode();

    if (mode === 'single') {
      const selected = this.selected();
      return selected ? this.isSameDay(date, selected) : false;
    }

    if (mode === 'multiple') {
      return this.selectedDates().some((d) => this.isSameDay(date, d));
    }

    if (mode === 'range') {
      const range = this.selectedRange();
      if (range.from && this.isSameDay(date, range.from)) return true;
      if (range.to && this.isSameDay(date, range.to)) return true;
      if (range.from && range.to && date > range.from && date < range.to)
        return true;
    }

    return false;
  }

  protected isRangeStart(date: Date): boolean {
    if (this.mode() !== 'range') return false;
    const range = this.selectedRange();
    return range.from ? this.isSameDay(date, range.from) : false;
  }

  protected isRangeEnd(date: Date): boolean {
    if (this.mode() !== 'range') return false;
    const range = this.selectedRange();
    return range.to ? this.isSameDay(date, range.to) : false;
  }

  protected isRangeMiddle(date: Date): boolean {
    if (this.mode() !== 'range') return false;
    const range = this.selectedRange();
    if (!range.from || !range.to) return false;
    return date > range.from && date < range.to;
  }

  private isSameDay(a: Date, b: Date): boolean {
    return (
      a.getDate() === b.getDate() &&
      a.getMonth() === b.getMonth() &&
      a.getFullYear() === b.getFullYear()
    );
  }

  protected getDayClass(day: DayInfo): string {
    const isSelectedDay = this.isSelected(day.date);
    const isRangeMiddleDay = this.isRangeMiddle(day.date);

    return cn(
      'inline-flex size-9 items-center justify-center rounded-md text-sm font-normal',
      'ring-offset-background transition-colors',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      'hover:bg-accent hover:text-accent-foreground',
      'disabled:pointer-events-none disabled:opacity-50',
      day.isToday && !isSelectedDay && 'bg-accent text-accent-foreground',
      isSelectedDay &&
        !isRangeMiddleDay &&
        'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground',
      isRangeMiddleDay && 'bg-accent text-accent-foreground rounded-none',
      day.isOutsideMonth && 'text-muted-foreground opacity-50',
      day.disabled && 'text-muted-foreground opacity-50',
    );
  }

  protected handleDateClick(date: Date): void {
    this.dateSelected.emit(date);
  }

  protected handleKeyDown(event: KeyboardEvent): void {
    const day = Number((event.target as Element).getAttribute('data-day'));
    if (!day) return;

    const viewDate = this.viewDate();
    const daysInMonth = new Date(
      viewDate.getFullYear(),
      viewDate.getMonth() + 1,
      0,
    ).getDate();

    // Only handle edge cases where we need to scroll to prev/next month
    if (day > 7 && day <= daysInMonth - 7) return;

    const arrowLeft = event.key === 'ArrowLeft';
    const arrowRight = event.key === 'ArrowRight';
    const arrowUp = event.key === 'ArrowUp';
    const arrowDown = event.key === 'ArrowDown';

    if ((day === 1 && arrowLeft) || (day <= 7 && arrowUp)) {
      this.scrollUp();
    }

    if (
      (day === daysInMonth && arrowRight) ||
      (day > daysInMonth - 7 && arrowDown)
    ) {
      this.scrollDown();
    }
  }

  private scrollDown(): void {
    this.monthScrollDown.emit();
    setTimeout(() => this._dayButtons()[0]?.element.focus());
  }

  private scrollUp(): void {
    this.monthScrollUp.emit();
    setTimeout(() =>
      this._dayButtons()[this._dayButtons().length - 1]?.element.focus(),
    );
  }
}
