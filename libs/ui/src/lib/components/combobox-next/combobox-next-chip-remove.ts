import { Directive, computed, inject, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn, ɵwarnIfUnnamed } from '../../utils';
import { type ScButtonVariants } from '../button/button';
import { ScComboboxNextBase } from './combobox-next-base';
import { ScComboboxNextChip } from './combobox-next-chip';

/**
 * Removes its chip's value: the preset's button (ghost, icon-xs). Write its
 * icon and name it. Reached from the input by the arrow keys, not by Tab.
 */
@Directive({
  selector: 'button[scComboboxNextChipRemove]',
  host: {
    'data-slot': 'combobox-chip-remove',
    type: 'button',
    tabindex: '-1',
    '[disabled]': 'root.disabled() || root.readonly()',
    '[class]': 'class()',
    '(click)': 'root.remove(chip.value())',
  },
})
export class ScComboboxNextChipRemove {
  private readonly preset = injectPreset();
  protected readonly root = inject(ScComboboxNextBase);
  protected readonly chip = inject(ScComboboxNextChip);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('icon-xs');

  constructor() {
    ɵwarnIfUnnamed('scComboboxNextChipRemove');
  }

  protected readonly class = computed(() =>
    cn(
      this.preset.button({ variant: this.variant(), size: this.size() }),
      this.preset.combobox.chipRemove,
      this.classInput(),
    ),
  );
}
