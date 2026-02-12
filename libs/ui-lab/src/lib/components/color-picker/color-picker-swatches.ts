import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';
import { SC_COLOR_PICKER } from './color-picker';

@Component({
  selector: '[sc-color-picker-swatches]',
  template: `
    @for (color of colors(); track color) {
      <button
        type="button"
        class="size-6 rounded-md border shadow-sm transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-ring"
        [style.background-color]="color"
        [attr.aria-label]="'Select color ' + color"
        (click)="selectColor(color)"
      ></button>
    }
  `,
  host: {
    'data-slot': 'color-picker-swatches',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScColorPickerSwatches {
  readonly colorPicker = inject(SC_COLOR_PICKER);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly colors = input<string[]>([
    '#ef4444',
    '#f97316',
    '#eab308',
    '#22c55e',
    '#14b8a6',
    '#06b6d4',
    '#3b82f6',
    '#8b5cf6',
    '#ec4899',
    '#000000',
    '#6b7280',
    '#ffffff',
  ]);

  protected readonly class = computed(() =>
    cn('flex flex-wrap gap-2', this.classInput()),
  );

  selectColor(color: string): void {
    if (!this.colorPicker.disabled()) {
      this.colorPicker.setHex(color);
    }
  }
}
