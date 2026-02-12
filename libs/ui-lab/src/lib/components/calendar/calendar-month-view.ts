import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  signal,
  viewChildren,
  ViewEncapsulation,
} from '@angular/core';
import { Grid, GridRow, GridCell, GridCellWidget } from '@angular/aria/grid';
import { cn } from '../../utils';

interface MonthInfo {
  label: string;
  value: number;
  isCurrentMonth: boolean;
  isSelected: boolean;
  selected: ReturnType<typeof signal<boolean>>;
}

@Component({
  selector: 'sc-calendar-month-view',
  imports: [Grid, GridRow, GridCell, GridCellWidget],
  template: `
    <table
      ngGrid
      tabindex="0"
      aria-label="Select month"
      class="w-full border-collapse"
      colWrap="continuous"
      rowWrap="continuous"
      [enableSelection]="true"
      selectionMode="explicit"
      (keydown)="handleGridKeyDown($event)"
    >
      <tbody>
        @for (row of monthRows(); track $index) {
          <tr ngGridRow>
            @for (month of row; track month.value) {
              <td
                ngGridCell
                class="p-1 text-center"
                [(selected)]="month.selected"
              >
                <button
                  ngGridCellWidget
                  type="button"
                  [class]="getMonthButtonClass(month)"
                  (click)="handleMonthClick(month.value)"
                  (keydown)="handleKeyDown($event, month.value)"
                  [attr.aria-current]="month.isCurrentMonth ? 'date' : null"
                  [attr.aria-label]="month.label"
                  [attr.data-month]="month.value"
                >
                  {{ month.label }}
                </button>
              </td>
            }
          </tr>
        }
      </tbody>
    </table>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScCalendarMonthView {
  private readonly _monthButtons = viewChildren(GridCellWidget);

  readonly year = input.required<number>();
  readonly selectedMonth = input.required<number>();
  readonly monthSelected = output<number>();
  readonly yearScrollUp = output<void>();
  readonly yearScrollDown = output<void>();

  protected readonly months = computed((): MonthInfo[] => {
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const currentMonth = this.selectedMonth();
    const year = this.year();
    const today = new Date();

    return monthNames.map((name, index) => ({
      label: name,
      value: index,
      isCurrentMonth:
        index === today.getMonth() && year === today.getFullYear(),
      isSelected: index === currentMonth,
      selected: signal(index === currentMonth),
    }));
  });

  protected readonly monthRows = computed((): MonthInfo[][] => {
    const months = this.months();
    const rows: MonthInfo[][] = [];
    for (let i = 0; i < months.length; i += 3) {
      rows.push(months.slice(i, i + 3));
    }
    return rows;
  });

  protected getMonthButtonClass(month: MonthInfo): string {
    return cn(
      'inline-flex w-full h-10 items-center justify-center rounded-md text-sm font-normal',
      'ring-offset-background transition-colors',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
      'hover:bg-accent hover:text-accent-foreground',
      month.isCurrentMonth &&
        !month.isSelected &&
        'bg-accent text-accent-foreground',
      month.isSelected &&
        'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground',
    );
  }

  protected handleMonthClick(month: number): void {
    this.monthSelected.emit(month);
  }

  protected handleKeyDown(event: KeyboardEvent, month: number): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.monthSelected.emit(month);
    }
  }

  protected handleGridKeyDown(event: KeyboardEvent): void {
    const monthAttr = (event.target as Element).getAttribute('data-month');
    if (!monthAttr) return;

    const month = Number(monthAttr);

    // Only handle edge cases where we need to scroll to prev/next year
    if (month > 2 && month < 9) return; // Middle months, let grid handle it

    const arrowLeft = event.key === 'ArrowLeft';
    const arrowRight = event.key === 'ArrowRight';
    const arrowUp = event.key === 'ArrowUp';
    const arrowDown = event.key === 'ArrowDown';

    // First row (Jan, Feb, Mar) + arrow up, or January + arrow left
    if ((month === 0 && arrowLeft) || (month <= 2 && arrowUp)) {
      this.scrollUp();
    }

    // Last row (Oct, Nov, Dec) + arrow down, or December + arrow right
    if ((month === 11 && arrowRight) || (month >= 9 && arrowDown)) {
      this.scrollDown();
    }
  }

  private scrollDown(): void {
    this.yearScrollDown.emit();
    setTimeout(() => this._monthButtons()[0]?.element.focus());
  }

  private scrollUp(): void {
    this.yearScrollUp.emit();
    setTimeout(() =>
      this._monthButtons()[this._monthButtons().length - 1]?.element.focus(),
    );
  }
}
