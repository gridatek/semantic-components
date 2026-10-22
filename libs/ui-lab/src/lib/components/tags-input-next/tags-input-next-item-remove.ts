import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  buttonVariants,
  cn,
  ɵwarnIfUnnamed,
} from '@semantic-components/ui';
import { ScTagsInputNext } from './tags-input-next';
import { ScTagsInputNextItem } from './tags-input-next-item';

/**
 * Removes its tag. Not a Tab stop — the keyboard removes with Delete on the
 * tag — but named all the same ("Remove design").
 */
@Directive({
  selector: 'button[scTagsInputNextItemRemove]',
  host: {
    'data-slot': 'tags-input-item-remove',
    type: 'button',
    tabindex: '-1',
    '[disabled]': 'tags.disabled()',
    '[class]': 'class()',
    '(click)': 'item.remove()',
  },
})
export class ScTagsInputNextItemRemove {
  protected readonly tags = inject(ScTagsInputNext);
  protected readonly item = inject(ScTagsInputNextItem);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('icon-xs');

  protected readonly class = computed(() =>
    cn(
      buttonVariants({ variant: this.variant(), size: this.size() }),
      'size-4 rounded-full hover:bg-foreground/10 [&_svg:not([class*=size-])]:size-3',
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scTagsInputNextItemRemove');
  }
}
