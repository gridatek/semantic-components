import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { SC_PDF_VIEWER } from './pdf-viewer';

/** The colour settings a swatch sets. */
export type ScPdfViewerColorSetting =
  'highlightColor' | 'freetextColor' | 'inkColor';

/**
 * A colour swatch for a tool: sets `setting` (`highlightColor`,
 * `freetextColor`, `inkColor`) to its colour — the theme's, e.g.
 * `var(--sc-pdf-viewer-highlight-1)` — pressed while it's the one. Put them
 * in a named group (`role="group"`), and name each (the colour's name).
 */
@Directive({
  selector: 'button[scPdfViewerColor]',
  host: {
    type: 'button',
    'data-slot': 'pdf-viewer-color',
    '[class]': 'class()',
    '[style.background-color]': 'color()',
    '[attr.aria-pressed]': 'pressed()',
    '(click)': 'pick()',
  },
})
export class ScPdfViewerColor {
  private readonly pdfViewer = inject(SC_PDF_VIEWER);

  readonly color = input.required<string>({ alias: 'scPdfViewerColor' });
  readonly setting = input.required<ScPdfViewerColorSetting>();
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly pressed = computed(
    () => this.pdfViewer[this.setting()]() === this.color(),
  );

  private readonly class = computed(() =>
    cn(
      'size-7 shrink-0 rounded-full border border-black/10 outline-none transition-shadow dark:border-white/10',
      'hover:ring-2 hover:ring-ring/50 focus-visible:ring-[3px] focus-visible:ring-ring/50',
      'aria-pressed:ring-2 aria-pressed:ring-ring aria-pressed:ring-offset-2 aria-pressed:ring-offset-background',
      this.classInput(),
    ),
  );

  private pick(): void {
    this.pdfViewer[this.setting()].set(this.color());
  }
}
