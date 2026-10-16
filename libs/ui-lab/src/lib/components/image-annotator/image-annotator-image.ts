import { Directive, ElementRef, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScImageAnnotator } from './image-annotator';

/**
 * The image to annotate, in the stage: your `img` with its `src` and `alt`.
 * From another site, it needs CORS (`crossorigin="anonymous"`) to be exported.
 */
@Directive({
  selector: 'img[scImageAnnotatorImage]',
  host: {
    'data-slot': 'image-annotator-image',
    draggable: 'false',
    '[class]': 'class()',
    '(load)': 'onLoad()',
  },
})
export class ScImageAnnotatorImage {
  private readonly annotator = inject(ScImageAnnotator);
  private readonly element =
    inject<ElementRef<HTMLImageElement>>(ElementRef).nativeElement;

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'pointer-events-none block h-auto w-full select-none',
      this.classInput(),
    ),
  );

  constructor() {
    this.annotator.ɵimage.set(this.element);
    // Already loaded (from the cache): no load event comes.
    if (this.element.complete && this.element.naturalWidth) this.onLoad();
  }

  protected onLoad(): void {
    this.annotator.ɵnatural.set({
      width: this.element.naturalWidth,
      height: this.element.naturalHeight,
    });
  }
}
