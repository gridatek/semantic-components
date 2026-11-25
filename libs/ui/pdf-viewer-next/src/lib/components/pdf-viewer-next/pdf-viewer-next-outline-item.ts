import {
  Directive,
  ElementRef,
  computed,
  effect,
  inject,
  input,
  untracked,
} from '@angular/core';
import { cn } from 'cn';
import { SC_PDF_VIEWER_NEXT } from './pdf-viewer-next';
import type { ScPdfOutlineItem } from './pdf-viewer-next-types';

/**
 * A bookmark of `viewer.outline()`: goes to it (the right spot on the page,
 * at the zoom it asks for) or opens its web link. The current one has
 * `aria-current="location"` / `data-current`, and comes into view on
 * `scPdfViewerNextOutlineFindCurrent`. Bold / italic bookmarks get
 * `data-bold` / `data-italic`. Use on a `scButton`; write its title.
 *
 * Writing the outline as a recursive `ng-template`? Declare the template
 * inside `scPdfViewerNext`, so its parts find the viewer.
 */
@Directive({
  selector: 'button[scPdfViewerNextOutlineItem]',
  host: {
    'data-slot': 'pdf-viewer-outline-item',
    '[attr.aria-current]': 'current() ? "location" : null',
    '[attr.data-current]': 'current() || null',
    '[attr.data-bold]': 'item().bold || null',
    '[attr.data-italic]': 'item().italic || null',
    '[class]': 'class()',
    '(click)': 'pdfViewer.goToOutlineItem(item())',
  },
})
export class ScPdfViewerNextOutlineItem {
  private readonly pdfViewer = inject(SC_PDF_VIEWER_NEXT);

  readonly item = input.required<ScPdfOutlineItem>({
    alias: 'scPdfViewerNextOutlineItem',
  });
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly current = computed(
    () => this.pdfViewer.currentOutlineItem()?.id === this.item().id,
  );
  private readonly class = computed(() =>
    cn(
      'data-current:bg-accent data-bold:font-bold data-italic:italic',
      this.classInput(),
    ),
  );

  constructor() {
    const element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    effect(() => {
      if (!this.pdfViewer.outlineRevealRequest()) return;
      if (!untracked(this.current)) return;
      requestAnimationFrame(() => element.scrollIntoView({ block: 'nearest' }));
    });
  }
}
