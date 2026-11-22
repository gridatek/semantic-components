import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { ɵwarnIfUnnamed } from '../../utils';
import { type ScButtonVariants } from '../button/button';
import { ScFileInput } from './file-input';
import { ScFileInputItem } from './file-input-item';
import { ScFileInputList } from './file-input-list';

/**
 * Takes its file out. Out of the Tab order (Delete on the item does it by
 * keyboard); name it after its file ("Remove photo.jpg").
 */
@Directive({
  selector: 'button[scFileInputItemRemove]',
  host: {
    'data-slot': 'file-input-item-remove',
    type: 'button',
    tabindex: '-1',
    '[disabled]': 'root.disabled()',
    '[class]': 'class()',
    '(click)': 'list.remove(item.file(), "remove-press")',
  },
})
export class ScFileInputItemRemove {
  private readonly buttonStyles = injectStyle().button;
  private readonly root = inject(ScFileInput);
  private readonly list = inject(ScFileInputList);
  private readonly item = inject(ScFileInputItem);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('icon-sm');

  private readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      'text-muted-foreground shrink-0',
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scFileInputItemRemove');
  }
}
