import {
  DestroyRef,
  Directive,
  ElementRef,
  afterNextRender,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScLightbox } from './lightbox';

/**
 * An item: your link to the full image (`href`) around its thumbnail (`img`,
 * whose `alt` it takes). Without the lightbox, a link still. Your data for
 * it is yours, at `lightbox.index()`.
 */
@Directive({
  selector: 'a[scLightboxTrigger]',
  host: {
    'data-slot': 'lightbox-trigger',
    '[class]': 'class()',
    '(click)': 'onClick($event)',
  },
})
export class ScLightboxTrigger {
  private readonly lightbox = inject(ScLightbox);
  private readonly element =
    inject<ElementRef<HTMLAnchorElement>>(ElementRef).nativeElement;

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'block cursor-zoom-in overflow-hidden rounded-md outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
      this.classInput(),
    ),
  );

  constructor() {
    const destroy = inject(DestroyRef);
    // Read once rendered: its href, its image.
    afterNextRender(() => {
      const image = this.element.querySelector('img');
      const unregister = this.lightbox.ɵregister({
        src: this.element.href,
        alt: image?.alt ?? '',
        thumbnail: image?.currentSrc || image?.src || this.element.href,
        element: this.element,
      });
      destroy.onDestroy(unregister);
    });
  }

  protected onClick(event: MouseEvent): void {
    // A new tab, a download: the link's.
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) {
      return;
    }
    event.preventDefault();
    const index = this.lightbox
      .items()
      .findIndex((item) => item.element === this.element);
    if (index >= 0) this.lightbox.show(index);
  }
}
