import { Directive, computed, input, signal } from '@angular/core';
import { cn } from 'cn';
import { ɵwarnIfUnnamed } from '../../utils';

/** What the group knows of an item. */
export interface ScColorPickerNextSwatchItemRef {
  readonly element: HTMLButtonElement;
  readonly checked: () => boolean;
}

/** Preset colours: a radio group of `scColorPickerNextSwatchItem`s — one Tab stop, the arrows move and choose. Name it. */
@Directive({
  selector: '[scColorPickerNextSwatches]',
  host: {
    'data-slot': 'color-picker-swatches',
    role: 'radiogroup',
    '[class]': 'class()',
  },
})
export class ScColorPickerNextSwatches {
  readonly classInput = input<string>('', { alias: 'class' });

  /** Its items, in order: registered by each. */
  readonly items = signal<readonly ScColorPickerNextSwatchItemRef[]>([]);

  /** The item in the Tab order: the checked one — or, with none, the first. */
  readonly reachable = computed(() => {
    const items = this.items();
    return (items.find((item) => item.checked()) ?? items[0])?.element;
  });

  private readonly class = computed(() =>
    cn('flex flex-wrap gap-1', this.classInput()),
  );

  constructor() {
    ɵwarnIfUnnamed('scColorPickerNextSwatches');
  }
}
