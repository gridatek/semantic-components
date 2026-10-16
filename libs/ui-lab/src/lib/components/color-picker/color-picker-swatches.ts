import { Directive, computed, input, signal } from '@angular/core';
import { cn, ɵwarnIfUnnamed } from '@semantic-components/ui';

/** What the group knows of an option. */
export interface ScColorPickerSwatchesOption {
  readonly element: HTMLButtonElement;
  readonly checked: () => boolean;
}

/** Preset colours: a radio group of `scColorPickerOption`s — the arrows move and choose. Name it. */
@Directive({
  selector: '[scColorPickerSwatches]',
  host: {
    'data-slot': 'color-picker-swatches',
    role: 'radiogroup',
    '[class]': 'class()',
  },
})
export class ScColorPickerSwatches {
  readonly classInput = input<string>('', { alias: 'class' });

  /** Its options, in order: registered by each. */
  readonly ɵoptions = signal<readonly ScColorPickerSwatchesOption[]>([]);

  /** The option in the tab order: the checked one — or, with none, the first. */
  readonly ɵreachable = computed(() => {
    const options = this.ɵoptions();
    return (options.find((option) => option.checked()) ?? options[0])?.element;
  });

  protected readonly class = computed(() =>
    cn('flex flex-wrap gap-1', this.classInput()),
  );

  constructor() {
    ɵwarnIfUnnamed('scColorPickerSwatches');
  }
}
