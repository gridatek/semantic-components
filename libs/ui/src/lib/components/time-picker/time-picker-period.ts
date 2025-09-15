import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
  model,
  output,
} from '@angular/core';

import { cn } from '@semantic-components/utils';

@Component({
  selector: 'div[sc-time-picker-period]',
  imports: [],
  template: `
    <div class="flex flex-col border border-input rounded bg-background overflow-hidden">
      <button
        class="px-1.5 py-0.5 text-xs hover:bg-muted focus:outline-none focus:ring-1 focus:ring-ring disabled:opacity-50 disabled:cursor-not-allowed border-0"
        [class.bg-primary]="value() === 'AM'"
        [class.text-primary-foreground]="value() === 'AM'"
        [class.hover:bg-primary/90]="value() === 'AM'"
        [disabled]="disabled()"
        (click)="setPeriod('AM')"
        type="button"
      >
        AM
      </button>
      <button
        class="px-1.5 py-0.5 text-xs hover:bg-muted focus:outline-none focus:ring-1 focus:ring-ring disabled:opacity-50 disabled:cursor-not-allowed border-0"
        [class.bg-primary]="value() === 'PM'"
        [class.text-primary-foreground]="value() === 'PM'"
        [class.hover:bg-primary/90]="value() === 'PM'"
        [disabled]="disabled()"
        (click)="setPeriod('PM')"
        type="button"
      >
        PM
      </button>
    </div>
  `,
  host: {
    '[class]': 'class()',
    'data-slot': 'time-picker-period',
  },
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScTimePickerPeriod {
  readonly value = model<'AM' | 'PM'>('AM');
  readonly disabled = input<boolean>(false);
  readonly classInput = input<string>('', { alias: 'class' });

  readonly periodChange = output<'AM' | 'PM'>();

  protected readonly class = computed(() => cn(this.classInput()));

  protected setPeriod(period: 'AM' | 'PM'): void {
    if (this.disabled() || this.value() === period) return;

    this.value.set(period);
    this.periodChange.emit(period);
  }
}
