import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { injectPreset } from '../../config/preset';
import { ɵwarnIfUnnamed } from '../../utils';
import { type ScButtonVariants } from '../button/button';
import { ScComboboxBase } from './combobox-base';
import { ScComboboxChip } from './combobox-chip';

/**
 * Removes its chip's value: the preset's button (ghost, icon-xs). Write its
 * icon and name it. Reached from the input by the arrow keys, not by Tab.
 */
@Directive({
  selector: 'button[scComboboxChipRemove]',
  host: {
    'data-slot': 'combobox-chip-remove',
    type: 'button',
    tabindex: '-1',
    '[disabled]': 'root.disabled() || root.readonly()',
    '[class]': 'class()',
    // Pressed, it takes no focus: the input keeps it, the list stays open.
    '(mousedown)': '$event.preventDefault()',
    '(click)': 'root.remove(chip.value())',
  },
})
export class ScComboboxChipRemove {
  private readonly preset = injectPreset();
  protected readonly root = inject(ScComboboxBase);
  protected readonly chip = inject(ScComboboxChip);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('icon-xs');

  constructor() {
    ɵwarnIfUnnamed('scComboboxChipRemove');
  }

  protected readonly class = computed(() =>
    cn(
      this.preset.button({ variant: this.variant(), size: this.size() }),
      this.preset.combobox.chipRemove,
      this.classInput(),
    ),
  );
}
