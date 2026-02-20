import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
  ViewEncapsulation,
} from '@angular/core';
import {
  cn,
  ScPopoverProvider,
  ScPopoverPortal,
  ScPopover,
  ScPopoverTrigger,
  ScPopoverAlign,
  ScPopoverSide,
} from '@semantic-components/ui';
import {
  ScCalendar,
  ScCalendarMode,
  ScCalendarValue,
  ScDateRange,
} from '../calendar';

@Component({
  selector: 'sc-date-picker',
  imports: [
    ScPopoverProvider,
    ScPopoverTrigger,
    ScPopoverPortal,
    ScPopover,
    ScCalendar,
  ],
  template: `
    <div scPopoverProvider [(open)]="open" [side]="side()" [align]="align()">
      <button scPopoverTrigger type="button" [class]="triggerClass()">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="mr-2 size-4"
        >
          <path d="M8 2v4" />
          <path d="M16 2v4" />
          <rect width="18" height="18" x="3" y="4" rx="2" />
          <path d="M3 10h18" />
        </svg>
        <span [class]="displayText() ? '' : 'text-muted-foreground'">
          {{ displayText() || placeholder() }}
        </span>
      </button>
      <ng-template scPopoverPortal>
        <div scPopover class="w-auto p-0">
          <sc-calendar
            [mode]="mode()"
            [(value)]="value"
            [disabled]="disabled()"
            [minDate]="minDate()"
            [maxDate]="maxDate()"
            (valueChange)="onValueChange()"
          />
        </div>
      </ng-template>
    </div>
  `,
  host: {
    'data-slot': 'date-picker',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScDatePicker {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly mode = input<ScCalendarMode>('single');
  readonly placeholder = input<string>('Pick a date');
  readonly disabled = input<Date[]>([]);
  readonly minDate = input<Date | undefined>(undefined);
  readonly maxDate = input<Date | undefined>(undefined);
  readonly side = input<ScPopoverSide>('bottom');
  readonly align = input<ScPopoverAlign>('start');

  readonly value = model<ScCalendarValue>(undefined);

  readonly open = model<boolean>(false);

  protected readonly class = computed(() => cn('', this.classInput()));

  protected readonly triggerClass = computed(() =>
    cn(
      'flex h-10 w-[280px] items-center justify-start rounded-md border border-input bg-background px-3 py-2 text-sm',
      'ring-offset-background placeholder:text-muted-foreground',
      'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
      'disabled:cursor-not-allowed disabled:opacity-50',
      '[&>span]:line-clamp-1',
    ),
  );

  protected readonly displayText = computed(() => {
    const mode = this.mode();
    const val = this.value();

    if (mode === 'single') {
      const date = val as Date | undefined;
      return date ? this.formatDate(date) : '';
    }

    if (mode === 'multiple') {
      const dates = (val as Date[] | undefined) ?? [];
      if (dates.length === 0) return '';
      if (dates.length === 1) return this.formatDate(dates[0]);
      return `${dates.length} dates selected`;
    }

    if (mode === 'range') {
      const range = (val as ScDateRange | undefined) ?? {
        from: undefined,
        to: undefined,
      };
      if (!range.from) return '';
      if (!range.to) return this.formatDate(range.from);
      return `${this.formatDate(range.from)} - ${this.formatDate(range.to)}`;
    }

    return '';
  });

  private formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }

  protected onValueChange(): void {
    const mode = this.mode();
    const val = this.value();

    if (mode === 'single' && val) {
      this.open.set(false);
    }

    if (mode === 'range') {
      const range = val as ScDateRange | undefined;
      if (range?.from && range?.to) {
        this.open.set(false);
      }
    }
  }
}
