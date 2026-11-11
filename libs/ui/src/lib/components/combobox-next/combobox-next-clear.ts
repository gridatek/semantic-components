import { Directive, computed, effect, inject, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn, ɵwarnIfUnnamed } from '../../utils';
import { type ScButtonVariants } from '../button/button';
import { ScComboboxNextBase } from './combobox-next-base';

/**
 * Clears the value: the preset's button (ghost, icon-xs), beside the trigger
 * at the input's end — shown only while there is a value, in the trigger's
 * place. Write its icon and name it. Not a tab stop: emptying the input
 * clears the value too.
 */
@Directive({
  selector: 'button[scComboboxNextClear]',
  host: {
    'data-slot': 'combobox-clear',
    type: 'button',
    tabindex: '-1',
    '[attr.hidden]': 'visible() ? null : ""',
    '[class]': 'class()',
    '(mousedown)': '$event.preventDefault()',
    '(click)': 'root.clear()',
  },
})
export class ScComboboxNextClear {
  private readonly preset = injectPreset();
  protected readonly root = inject(ScComboboxNextBase);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('icon-xs');

  protected readonly visible = computed(
    () =>
      this.root.hasValue() && !this.root.disabled() && !this.root.readonly(),
  );

  protected readonly class = computed(() =>
    cn(
      this.preset.button({ variant: this.variant(), size: this.size() }),
      this.preset.inputGroupButton({ size: 'icon-xs' }),
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scComboboxNextClear');
    effect(() => this.root.clearVisible.set(this.visible()));
  }
}
