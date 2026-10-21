import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  buttonVariants,
  cn,
  ɵwarnIfUnnamed,
} from '@semantic-components/ui';
import { ScLightbox } from './lightbox';

/** The item before; disabled at the first, unless it loops. Write its icon and name it ("Previous image"). */
@Directive({
  selector: 'button[scLightboxPrevious]',
  host: {
    type: 'button',
    'data-slot': 'lightbox-previous',
    '[disabled]': '!lightbox.hasPrevious()',
    '[class]': 'class()',
    '(click)': 'lightbox.previous()',
  },
})
export class ScLightboxPrevious {
  protected readonly lightbox = inject(ScLightbox);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('icon');

  protected readonly class = computed(() =>
    cn(
      buttonVariants({ variant: this.variant(), size: this.size() }),
      // On the dark viewer: white.
      'text-white hover:bg-white/15 hover:text-white dark:hover:bg-white/15',
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scLightboxPrevious');
  }
}
