import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  buttonVariants,
  cn,
  ɵwarnIfUnnamed,
} from '@semantic-components/ui';
import { ScTagsInputNext } from './tags-input-next';

/** Removes every tag; focus goes to the field. Name it ("Clear tags"). */
@Directive({
  selector: 'button[scTagsInputNextClear]',
  host: {
    'data-slot': 'tags-input-clear',
    type: 'button',
    '[disabled]': 'tags.disabled() || !tags.value().length',
    '[class]': 'class()',
    '(click)': 'tags.clear()',
  },
})
export class ScTagsInputNextClear {
  protected readonly tags = inject(ScTagsInputNext);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('icon-xs');

  protected readonly class = computed(() =>
    cn(
      buttonVariants({ variant: this.variant(), size: this.size() }),
      'text-muted-foreground ms-auto',
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scTagsInputNextClear');
  }
}
