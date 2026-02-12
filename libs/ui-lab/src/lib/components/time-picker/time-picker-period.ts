import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';
import { SC_TIME_PICKER } from './time-picker';

// ============================================================================
// TimePickerPeriod
// ============================================================================
@Component({
  selector: '[sc-time-picker-period]',
  template: `
    <button
      type="button"
      class="rounded-md px-2 py-1.5 text-sm font-medium transition-colors"
      [class.bg-primary]="isAM()"
      [class.text-primary-foreground]="isAM()"
      [class.text-muted-foreground]="!isAM()"
      [class.hover:bg-accent]="!isAM()"
      [disabled]="timePicker.disabled()"
      (click)="selectAM()"
    >
      AM
    </button>
    <button
      type="button"
      class="rounded-md px-2 py-1.5 text-sm font-medium transition-colors"
      [class.bg-primary]="isPM()"
      [class.text-primary-foreground]="isPM()"
      [class.text-muted-foreground]="!isPM()"
      [class.hover:bg-accent]="!isPM()"
      [disabled]="timePicker.disabled()"
      (click)="selectPM()"
    >
      PM
    </button>
  `,
  host: {
    'data-slot': 'time-picker-period',
    '[class]': 'class()',
    role: 'group',
    '[attr.aria-label]': '"Select AM or PM"',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScTimePickerPeriod {
  readonly timePicker = inject(SC_TIME_PICKER);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'ml-2 inline-flex rounded-md border border-input bg-background p-0.5',
      this.classInput(),
    ),
  );

  protected readonly isAM = computed(() => {
    const val = this.timePicker.value();
    return val?.period === 'AM' || (!val?.period && (val?.hours ?? 0) < 12);
  });

  protected readonly isPM = computed(() => {
    const val = this.timePicker.value();
    return val?.period === 'PM' || (!val?.period && (val?.hours ?? 0) >= 12);
  });

  selectAM(): void {
    this.timePicker.setPeriod('AM');
    const val = this.timePicker.value();
    if (val && val.hours >= 12) {
      this.timePicker.setHours(val.hours - 12);
    }
  }

  selectPM(): void {
    this.timePicker.setPeriod('PM');
    const val = this.timePicker.value();
    if (val && val.hours < 12) {
      this.timePicker.setHours(val.hours + 12);
    }
  }
}
