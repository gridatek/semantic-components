import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  input,
  model,
  output,
  signal,
  ViewEncapsulation,
  viewChild,
} from '@angular/core';
import { cn } from '../../utils';
import { ScCalendar, DateRange } from '../calendar';

export interface DateRangePreset {
  label: string;
  value: DateRange;
}

@Component({
  selector: 'sc-date-range-picker',
  exportAs: 'scDateRangePicker',
  template: `
    <div [class]="containerClass()">
      <!-- Trigger Button -->
      <button
        #triggerEl
        type="button"
        [class]="triggerClass()"
        [disabled]="disabled()"
        (click)="toggleDropdown()"
        [attr.aria-expanded]="dropdownOpen()"
        [attr.aria-haspopup]="'dialog'"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="size-4 mr-2"
        >
          <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
          <line x1="16" x2="16" y1="2" y2="6" />
          <line x1="8" x2="8" y1="2" y2="6" />
          <line x1="3" x2="21" y1="10" y2="10" />
        </svg>
        <span class="flex-1 text-left">{{ displayValue() }}</span>
        @if (value().from && showClear()) {
          <button
            type="button"
            class="ml-2 hover:text-foreground"
            (click)="clearSelection($event)"
            aria-label="Clear selection"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              class="size-4"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        }
      </button>

      <!-- Dropdown -->
      @if (dropdownOpen()) {
        <div [class]="dropdownClass()" role="dialog" aria-modal="true">
          <div class="flex">
            <!-- Presets Sidebar -->
            @if (presets().length > 0) {
              <div class="flex flex-col gap-1 border-r p-3 min-w-[140px]">
                @for (preset of presets(); track preset.label) {
                  <button
                    type="button"
                    [class]="presetClass(preset)"
                    (click)="selectPreset(preset)"
                  >
                    {{ preset.label }}
                  </button>
                }
              </div>
            }

            <!-- Calendar -->
            <div class="p-3">
              @if (showTwoMonths()) {
                <div class="flex gap-4">
                  <sc-calendar
                    mode="range"
                    [(selectedRange)]="value"
                    [minDate]="minDate()"
                    [maxDate]="maxDate()"
                    [disabled]="disabledDates()"
                  />
                  <sc-calendar
                    mode="range"
                    [(selectedRange)]="value"
                    [minDate]="minDate()"
                    [maxDate]="maxDate()"
                    [disabled]="disabledDates()"
                  />
                </div>
              } @else {
                <sc-calendar
                  mode="range"
                  [(selectedRange)]="value"
                  [minDate]="minDate()"
                  [maxDate]="maxDate()"
                  [disabled]="disabledDates()"
                />
              }

              <!-- Footer -->
              <div class="flex items-center justify-between border-t pt-3 mt-3">
                <div class="text-sm text-muted-foreground">
                  @if (value().from && value().to) {
                    {{ formatDate(value().from!) }} -
                    {{ formatDate(value().to!) }}
                  } @else if (value().from) {
                    {{ formatDate(value().from!) }} - Select end date
                  } @else {
                    Select a date range
                  }
                </div>
                <div class="flex gap-2">
                  <button
                    type="button"
                    class="inline-flex h-8 items-center justify-center rounded-md px-3 text-sm font-medium border border-input hover:bg-accent"
                    (click)="closeDropdown()"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    class="inline-flex h-8 items-center justify-center rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                    [disabled]="!value().from || !value().to"
                    (click)="applySelection()"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </div>

    @if (dropdownOpen()) {
      <div class="fixed inset-0 z-40" (click)="closeDropdown()"></div>
    }
  `,
  host: {
    'data-slot': 'date-range-picker',
  },
  imports: [ScCalendar],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScDateRangePicker {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly placeholder = input<string>('Select date range');
  readonly disabled = input<boolean>(false);
  readonly minDate = input<Date | undefined>(undefined);
  readonly maxDate = input<Date | undefined>(undefined);
  readonly disabledDates = input<Date[]>([]);
  readonly presets = input<DateRangePreset[]>([]);
  readonly showTwoMonths = input<boolean>(false);
  readonly showClear = input<boolean>(true);
  readonly dateFormat = input<string>('short');

  readonly value = model<DateRange>({ from: undefined, to: undefined });

  readonly valueChange = output<DateRange>();
  readonly apply = output<DateRange>();

  protected readonly dropdownOpen = signal(false);

  private readonly triggerEl =
    viewChild<ElementRef<HTMLButtonElement>>('triggerEl');
  private pendingValue: DateRange = { from: undefined, to: undefined };

  protected readonly displayValue = computed(() => {
    const range = this.value();
    if (!range.from) return this.placeholder();
    if (!range.to) return this.formatDate(range.from);
    return `${this.formatDate(range.from)} - ${this.formatDate(range.to)}`;
  });

  protected readonly containerClass = computed(() =>
    cn('relative inline-block', this.classInput()),
  );

  protected readonly triggerClass = computed(() =>
    cn(
      'flex h-9 w-full min-w-[240px] items-center rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm',
      'hover:bg-accent/50',
      'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
      'disabled:cursor-not-allowed disabled:opacity-50',
      'transition-colors',
    ),
  );

  protected readonly dropdownClass = computed(() =>
    cn(
      'absolute left-0 top-full mt-1 z-50 rounded-md border bg-popover shadow-lg',
      'animate-in fade-in-0 zoom-in-95',
    ),
  );

  protected presetClass(preset: DateRangePreset): string {
    const isActive = this.isPresetActive(preset);
    return cn(
      'text-left px-3 py-2 text-sm rounded-md',
      'hover:bg-accent hover:text-accent-foreground',
      isActive && 'bg-accent text-accent-foreground',
    );
  }

  private isPresetActive(preset: DateRangePreset): boolean {
    const current = this.value();
    if (!current.from || !current.to || !preset.value.from || !preset.value.to)
      return false;
    return (
      this.isSameDay(current.from, preset.value.from) &&
      this.isSameDay(current.to, preset.value.to)
    );
  }

  private isSameDay(a: Date, b: Date): boolean {
    return (
      a.getDate() === b.getDate() &&
      a.getMonth() === b.getMonth() &&
      a.getFullYear() === b.getFullYear()
    );
  }

  toggleDropdown(): void {
    if (this.dropdownOpen()) {
      this.closeDropdown();
    } else {
      this.openDropdown();
    }
  }

  openDropdown(): void {
    this.pendingValue = { ...this.value() };
    this.dropdownOpen.set(true);
  }

  closeDropdown(): void {
    this.value.set(this.pendingValue);
    this.dropdownOpen.set(false);
  }

  selectPreset(preset: DateRangePreset): void {
    this.value.set({ ...preset.value });
  }

  applySelection(): void {
    const range = this.value();
    if (range.from && range.to) {
      this.pendingValue = { ...range };
      this.valueChange.emit(range);
      this.apply.emit(range);
      this.dropdownOpen.set(false);
    }
  }

  clearSelection(event: Event): void {
    event.stopPropagation();
    this.value.set({ from: undefined, to: undefined });
    this.pendingValue = { from: undefined, to: undefined };
    this.valueChange.emit({ from: undefined, to: undefined });
  }

  formatDate(date: Date): string {
    const format = this.dateFormat();
    if (format === 'short') {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    }
    if (format === 'long') {
      return date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
    }
    if (format === 'iso') {
      return date.toISOString().split('T')[0];
    }
    return date.toLocaleDateString();
  }

  focus(): void {
    this.triggerEl()?.nativeElement.focus();
  }

  getRange(): DateRange {
    return this.value();
  }
}

// Helper function to create common presets
export function createDateRangePresets(): DateRangePreset[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const last7Days = new Date(today);
  last7Days.setDate(last7Days.getDate() - 6);

  const last14Days = new Date(today);
  last14Days.setDate(last14Days.getDate() - 13);

  const last30Days = new Date(today);
  last30Days.setDate(last30Days.getDate() - 29);

  const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  const thisMonthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  const lastMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);

  return [
    { label: 'Today', value: { from: today, to: today } },
    { label: 'Yesterday', value: { from: yesterday, to: yesterday } },
    { label: 'Last 7 days', value: { from: last7Days, to: today } },
    { label: 'Last 14 days', value: { from: last14Days, to: today } },
    { label: 'Last 30 days', value: { from: last30Days, to: today } },
    { label: 'This month', value: { from: thisMonthStart, to: thisMonthEnd } },
    { label: 'Last month', value: { from: lastMonthStart, to: lastMonthEnd } },
  ];
}
