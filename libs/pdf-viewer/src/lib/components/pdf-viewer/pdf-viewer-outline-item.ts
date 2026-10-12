import {
  Directive,
  ElementRef,
  computed,
  effect,
  inject,
  input,
  untracked,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer';
import type { ScPdfOutlineItem } from './pdf-viewer-types';

/**
 * A bookmark of `viewer.outline()`: goes to it (the right spot on the page,
 * at the zoom it asks for) or opens its web link. The current one has
 * `aria-current="location"` / `data-current`, and comes into view on
 * `scPdfViewerOutlineFindCurrent`. Bold / italic bookmarks get
 * `data-bold` / `data-italic`. Use on a `scButton`; write its title.
 *
 * Writing the outline as a recursive `ng-template`? Declare the template
 * inside `scPdfViewer`, so its parts find the viewer.
 */
@Directive({
  selector: 'button[scPdfViewerOutlineItem]',
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
export class ScPdfViewerOutlineItem {
  protected readonly pdfViewer = inject(SC_PDF_VIEWER);

  readonly item = input.required<ScPdfOutlineItem>({
    alias: 'scPdfViewerOutlineItem',
  });
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly current = computed(
    () => this.pdfViewer.currentOutlineItem()?.id === this.item().id,
  );
  protected readonly class = computed(() =>
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
