import {
  DestroyRef,
  Directive,
  ElementRef,
  afterNextRender,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { cn } from 'cn';
import { SC_PDF_VIEWER_NEXT } from './pdf-viewer-next';

/**
 * A page's thumbnail, rendered when it scrolls near view (and again after a
 * rotation or another document). Use on an `img` with `alt=""` when its
 * button names the page; `data-loading` until it's drawn.
 */
@Directive({
  selector: 'img[scPdfViewerNextThumbnail]',
  host: {
    'data-slot': 'pdf-viewer-thumbnail',
    '[attr.src]': 'src()',
    '[attr.data-loading]': '!src() || null',
    '[class]': 'class()',
  },
})
export class ScPdfViewerNextThumbnail {
  private readonly pdfViewer = inject(SC_PDF_VIEWER_NEXT);

  readonly page = input.required<number>({ alias: 'scPdfViewerNextThumbnail' });
  /** Width in CSS pixels. */
  readonly width = input(150);
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly src = signal<string | null>(null);
  private readonly near = signal(false);

  private readonly class = computed(() =>
    cn(
      'mx-auto border bg-white shadow-sm data-loading:aspect-[3/4] data-loading:w-full',
      this.classInput(),
    ),
  );

  constructor() {
    const element =
      inject<ElementRef<HTMLImageElement>>(ElementRef).nativeElement;
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const observer = new IntersectionObserver(
        ([entry]) => this.near.set(entry.isIntersecting),
        { rootMargin: '100% 0px' },
      );
      observer.observe(element);
      destroyRef.onDestroy(() => observer.disconnect());
    });

    effect((onCleanup) => {
      // Rendered for this document, its page order, rotation and page colours.
      this.pdfViewer.pdfDocument();
      this.pdfViewer.pageEdits();
      this.pdfViewer.rotation();
      this.pdfViewer.appliedPageColors();
      if (!this.near()) return;
      let current = true;
      onCleanup(() => (current = false));
      this.pdfViewer
        .renderThumbnail(this.page(), this.width())
        .then((url) => current && this.src.set(url));
    });
  }
}
