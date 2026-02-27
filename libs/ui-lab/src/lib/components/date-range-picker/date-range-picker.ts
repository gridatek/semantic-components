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
import { SiCalendarIcon, SiXIcon } from '@semantic-icons/lucide-icons';
import { cn, ScCalendar, ScDateRange } from '@semantic-components/ui';
import { Temporal } from '@js-temporal/polyfill';

export interface ScDateRangePreset {
  label: string;
  value: ScDateRange;
}

@Component({
  selector: 'sc-date-range-picker',
  exportAs: 'scScDateRangePicker',
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
        <svg siCalendarIcon class="mr-2 size-4"></svg>
        <span class="flex-1 text-left">{{ displayValue() }}</span>
        @if (value().from && showClear()) {
          <button
            type="button"
            class="hover:text-foreground ml-2"
            (click)="clearSelection($event)"
            aria-label="Clear selection"
          >
            <svg siXIcon class="size-4"></svg>
          </button>
        }
      </button>

      <!-- Dropdown -->
      @if (dropdownOpen()) {
        <div [class]="dropdownClass()" role="dialog" aria-modal="true">
          <div class="flex">
            <!-- Presets Sidebar -->
            @if (presets().length > 0) {
              <div class="flex min-w-[140px] flex-col gap-1 border-r p-3">
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
                    [(value)]="value"
                    [minDate]="minDate()"
                    [maxDate]="maxDate()"
                    [disabled]="disabledDates()"
                  />
                  <sc-calendar
                    mode="range"
                    [(value)]="value"
                    [minDate]="minDate()"
                    [maxDate]="maxDate()"
                    [disabled]="disabledDates()"
                  />
                </div>
              } @else {
                <sc-calendar
                  mode="range"
                  [(value)]="value"
                  [minDate]="minDate()"
                  [maxDate]="maxDate()"
                  [disabled]="disabledDates()"
                />
              }

              <!-- Footer -->
              <div class="mt-3 flex items-center justify-between border-t pt-3">
                <div class="text-muted-foreground text-sm">
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
                    class="border-input hover:bg-accent inline-flex h-8 items-center justify-center rounded-md border px-3 text-sm font-medium"
                    (click)="closeDropdown()"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    class="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-8 items-center justify-center rounded-md px-3 text-sm font-medium"
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
  imports: [ScCalendar, SiCalendarIcon, SiXIcon],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScDateRangePicker {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly placeholder = input<string>('Select date range');
  readonly disabled = input<boolean>(false);
  readonly minDate = input<Temporal.PlainDate | undefined>(undefined);
  readonly maxDate = input<Temporal.PlainDate | undefined>(undefined);
  readonly disabledDates = input<Temporal.PlainDate[]>([]);
  readonly presets = input<ScDateRangePreset[]>([]);
  readonly showTwoMonths = input<boolean>(false);
  readonly showClear = input<boolean>(true);
  readonly dateFormat = input<string>('short');

  readonly value = model<ScDateRange>({ from: undefined, to: undefined });

  readonly valueChange = output<ScDateRange>();
  readonly apply = output<ScDateRange>();

  protected readonly dropdownOpen = signal(false);

  private readonly triggerEl =
    viewChild<ElementRef<HTMLButtonElement>>('triggerEl');
  private pendingValue: ScDateRange = { from: undefined, to: undefined };

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

  protected presetClass(preset: ScDateRangePreset): string {
    const isActive = this.isPresetActive(preset);
    return cn(
      'text-left px-3 py-2 text-sm rounded-md',
      'hover:bg-accent hover:text-accent-foreground',
      isActive && 'bg-accent text-accent-foreground',
    );
  }

  private isPresetActive(preset: ScDateRangePreset): boolean {
    const current = this.value();
    if (!current.from || !current.to || !preset.value.from || !preset.value.to)
      return false;
    return (
      current.from.equals(preset.value.from) &&
      current.to.equals(preset.value.to)
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

  selectPreset(preset: ScDateRangePreset): void {
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

  formatDate(date: Temporal.PlainDate): string {
    const format = this.dateFormat();
    if (format === 'short') {
      return date.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    }
    if (format === 'long') {
      return date.toLocaleString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
    }
    if (format === 'iso') {
      return date.toString();
    }
    return date.toLocaleString();
  }

  focus(): void {
    this.triggerEl()?.nativeElement.focus();
  }

  getRange(): ScDateRange {
    return this.value();
  }
}

// Helper function to create common presets
export function createScDateRangePresets(): ScDateRangePreset[] {
  const today = Temporal.Now.plainDateISO();
  const yesterday = today.subtract({ days: 1 });

  const last7Days = today.subtract({ days: 6 });
  const last14Days = today.subtract({ days: 13 });
  const last30Days = today.subtract({ days: 29 });

  const thisMonthStart = today.with({ day: 1 });
  const thisMonthEnd = today.with({ day: today.daysInMonth });

  const lastMonth = today.subtract({ months: 1 });
  const lastMonthStart = lastMonth.with({ day: 1 });
  const lastMonthEnd = lastMonth.with({ day: lastMonth.daysInMonth });

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
