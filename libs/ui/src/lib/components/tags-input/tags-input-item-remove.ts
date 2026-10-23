import { Directive, computed, inject, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { ɵwarnIfUnnamed } from '../../utils/accessible-name/accessible-name';
import { cn } from '../../utils/cn/cn';
import { type ScButtonVariants } from '../button/button';
import { ScTagsInput } from './tags-input';
import { ScTagsInputItem } from './tags-input-item';

/**
 * Removes its tag. Not a Tab stop — the keyboard removes with Delete on the
 * tag — but named all the same ("Remove design").
 */
@Directive({
  selector: 'button[scTagsInputItemRemove]',
  host: {
    'data-slot': 'tags-input-item-remove',
    type: 'button',
    tabindex: '-1',
    '[disabled]': 'tags.disabled()',
    '[class]': 'class()',
    '(click)': 'item.remove()',
  },
})
export class ScTagsInputItemRemove {
  private readonly buttonStyles = injectPreset().button;

  protected readonly tags = inject(ScTagsInput);
  protected readonly item = inject(ScTagsInputItem);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('icon-xs');

  protected readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      'size-4 rounded-full hover:bg-foreground/10 [&_svg:not([class*=size-])]:size-3',
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scTagsInputItemRemove');
  }
}
