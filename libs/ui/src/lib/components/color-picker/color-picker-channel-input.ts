import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { ɵwarnIfUnnamed } from '../../utils';
import { SC_FIELD } from '../field';
import { ScColorPicker } from './color-picker';
import { SC_COLOR_CHANNELS, type ScColorChannel } from './color-space';

/**
 * One channel as a number, in its units — `scColorPickerChannelInput="red"`
 * (0–255), hue in degrees, the others in percent. Set on Enter or when left
 * (held to its range, on its step); its arrows step it. Label it.
 */
@Directive({
  selector: 'input[scColorPickerChannelInput]',
  host: {
    'data-slot': 'color-picker-channel-input',
    type: 'number',
    inputmode: 'decimal',
    '[attr.data-channel]': 'channel()',
    '[min]': 'info().min',
    '[max]': 'info().max',
    '[step]': 'step()',
    '[value]': 'shown()',
    '[disabled]': 'picker.disabled()',
    '[readOnly]': 'picker.readonly()',
    '[attr.id]': 'field?.id() ?? null',
    '[class]': 'class()',
    '(change)': 'apply($event)',
    '(keydown.enter)': 'apply($event)',
    '(blur)': 'picker.touch.emit()',
  },
})
export class ScColorPickerChannelInput {
  private readonly picker = inject(ScColorPicker);
  /** In a field: its id — the label names it. */
  private readonly field = inject(SC_FIELD, { optional: true });
  private readonly inputStyles = injectStyle().input;

  readonly classInput = input<string>('', { alias: 'class' });
  readonly channel = input.required<ScColorChannel>({
    alias: 'scColorPickerChannelInput',
  });

  private readonly info = computed(() => SC_COLOR_CHANNELS[this.channel()]);
  private readonly step = computed(() =>
    this.channel() === 'chroma' ? 0.001 : 1,
  );
  /** Its value, on its step. */
  private readonly shown = computed(() => {
    const step = this.step();
    return Math.round(this.picker.channel(this.channel()) / step) * step;
  });

  private readonly class = computed(() =>
    cn(this.inputStyles, 'tabular-nums', this.classInput()),
  );

  constructor() {
    ɵwarnIfUnnamed('scColorPickerChannelInput');
  }

  private apply(event: Event): void {
    const field = event.target as HTMLInputElement;
    const typed = field.valueAsNumber;
    if (Number.isNaN(typed) || this.picker.readonly()) {
      field.value = String(this.shown());
      return;
    }
    const step = this.step();
    this.picker.set({ [this.channel()]: Math.round(typed / step) * step });
    field.value = String(this.shown());
  }
}
