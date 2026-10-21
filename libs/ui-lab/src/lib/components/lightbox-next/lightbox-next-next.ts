import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  buttonVariants,
  cn,
  ɵwarnIfUnnamed,
} from '@semantic-components/ui';
import { ScLightboxNext } from './lightbox-next';

/** The item after; disabled at the last, unless it loops. Write its icon and name it ("Next image"). */
@Directive({
  selector: 'button[scLightboxNextNext]',
  host: {
    type: 'button',
    'data-slot': 'lightbox-next',
    '[disabled]': '!lightbox.hasNext()',
    '[class]': 'class()',
    '(click)': 'lightbox.next()',
  },
})
export class ScLightboxNextNext {
  protected readonly lightbox = inject(ScLightboxNext);

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
    ɵwarnIfUnnamed('scLightboxNextNext');
  }
}
