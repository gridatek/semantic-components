import { Directive, computed, inject, input, signal } from '@angular/core';
import { cn } from 'cn';
import { SC_PDF_VIEWER_NEXT } from './pdf-viewer-next';

/**
 * The password form of a protected document (`#form="scPdfViewerNextPasswordForm"`):
 * submitting it opens the document. Put a `scPdfViewerNextPasswordInput` in it;
 * `form.incorrect()` is true after a wrong password, `form.password()` is
 * what's typed.
 */
@Directive({
  selector: 'form[scPdfViewerNextPasswordForm]',
  exportAs: 'scPdfViewerNextPasswordForm',
  host: {
    'data-slot': 'pdf-viewer-password-form',
    '[class]': 'class()',
    '(submit)': 'submit($event)',
  },
})
export class ScPdfViewerNextPasswordForm {
  private readonly pdfViewer = inject(SC_PDF_VIEWER_NEXT);
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() => cn('grid gap-4', this.classInput()));

  /** What's typed. */
  readonly password = signal('');
  /** The last password tried was wrong. */
  readonly incorrect = computed(
    () => this.pdfViewer.passwordReason() === 'incorrect-password',
  );

  private submit(event: Event): void {
    event.preventDefault();
    const password = this.password();
    if (!password) return;
    this.pdfViewer.submitPassword(password);
    this.password.set('');
  }
}
