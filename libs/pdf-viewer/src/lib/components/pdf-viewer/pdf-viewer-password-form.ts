import { Directive, computed, inject, input, signal } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer';

/**
 * The password form of a protected document (`#form="scPdfViewerPasswordForm"`):
 * submitting it opens the document. Put a `scPdfViewerPasswordInput` in it;
 * `form.incorrect()` is true after a wrong password, `form.password()` is
 * what's typed.
 */
@Directive({
  selector: 'form[scPdfViewerPasswordForm]',
  exportAs: 'scPdfViewerPasswordForm',
  host: {
    'data-slot': 'pdf-viewer-password-form',
    '[class]': 'class()',
    '(submit)': 'submit($event)',
  },
})
export class ScPdfViewerPasswordForm {
  private readonly pdfViewer = inject(SC_PDF_VIEWER);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('grid gap-4', this.classInput()),
  );

  /** What's typed. */
  readonly password = signal('');
  /** The last password tried was wrong. */
  readonly incorrect = computed(
    () => this.pdfViewer.passwordReason() === 'incorrect-password',
  );

  protected submit(event: Event): void {
    event.preventDefault();
    const password = this.password();
    if (!password) return;
    this.pdfViewer.submitPassword(password);
    this.password.set('');
  }
}
