import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';

import { cn } from '@semantic-components/utils';

@Component({
  selector: 'div[sc-clock-picker-hand-knob]',
  imports: [],
  template: `
    <span
      class="text-xs font-medium text-primary-foreground select-none"
      [style.transform]="'rotate(' + -angle() + 'deg)'"
    >
      {{ displayValue() }}
    </span>
  `,
  host: {
    '[class]': 'class()',
  },
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScClockPickerHandKnob {
  readonly dragging = input<boolean>(false);
  readonly value = input<number>(0);
  readonly mode = input<'hours' | 'minutes'>('hours');
  readonly format = input<'12h' | '24h'>('12h');
  readonly angle = input<number>(0);
  readonly classInput = input<string>('', {
    alias: 'class',
  });

  protected readonly displayValue = computed(() => {
    const val = this.value();
    if (this.mode() === 'hours') {
      if (this.format() === '12h') {
        return val === 0 ? 12 : val > 12 ? val - 12 : val;
      }
      return val;
    }
    return val.toString().padStart(2, '0');
  });

  private readonly is24HourMode = computed(
    () => this.mode() === 'hours' && this.format() === '24h',
  );

  protected readonly class = computed(() => {
    return cn(
      `absolute left-1/2 bg-primary border-2 border-primary-foreground/20 rounded-full -translate-x-1/2 -translate-y-1/2 cursor-grab pointer-events-auto z-[30] transition-all duration-200 ease-out flex items-center justify-center hover:bg-primary/80 hover:scale-110 hover:shadow-md hover:shadow-primary/20`,
      this.is24HourMode() && 'w-8 h-8 -top-4',
      !this.is24HourMode() && 'w-10 h-10 -top-5',
      this.dragging() && 'cursor-grabbing bg-primary/90 scale-105 shadow-lg shadow-primary/30',
      this.classInput(),
    );
  });
}
