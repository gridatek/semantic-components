import { Directive, computed, inject, input } from '@angular/core';
import { ɵwarnIfUnnamed } from '../../utils/accessible-name/accessible-name';
import { cn } from '../../utils/cn/cn';
import { ScLightbox } from './lightbox';

/**
 * A thumbnail in your strip — `[scLightboxThumbnail]="i"`, from
 * `lightbox.items()` — that shows its item; `aria-current` while it is the
 * one. Put its image in it; name it (the image's alt does).
 */
@Directive({
  selector: 'button[scLightboxThumbnail]',
  host: {
    type: 'button',
    'data-slot': 'lightbox-thumbnail',
    '[attr.aria-current]': 'current() || null',
    '[class]': 'class()',
    '(click)': 'lightbox.goTo(index())',
  },
})
export class ScLightboxThumbnail {
  protected readonly lightbox = inject(ScLightbox);

  readonly index = input.required<number>({ alias: 'scLightboxThumbnail' });
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly current = computed(
    () => this.index() === this.lightbox.index(),
  );

  protected readonly class = computed(() =>
    cn(
      'size-14 shrink-0 overflow-hidden rounded-md opacity-60 outline-none transition-opacity',
      'hover:opacity-100 focus-visible:ring-3 focus-visible:ring-white/60',
      'aria-current:opacity-100 aria-current:ring-2 aria-current:ring-white',
      '[&_img]:size-full [&_img]:object-cover',
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scLightboxThumbnail');
  }
}
