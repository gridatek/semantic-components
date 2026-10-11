import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import {
  ScButton,
  ScDialog,
  ScDialogDescription,
  ScDialogFooter,
  ScDialogHeader,
  ScDialogPortal,
  ScDialogProvider,
  ScDialogTitle,
  ScField,
  ScInput,
  ScLabel,
  cn,
} from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer-root';

/**
 * Asks for the password of a protected document. Closing it (Cancel, Escape,
 * clicking outside) gives up on the document.
 */
@Component({
  selector: 'sc-pdf-viewer-password-dialog',
  imports: [
    ScDialogProvider,
    ScDialogPortal,
    ScDialog,
    ScDialogHeader,
    ScDialogTitle,
    ScDialogDescription,
    ScDialogFooter,
    ScField,
    ScLabel,
    ScInput,
    ScButton,
  ],
  template: `
    <div
      scDialogProvider
      [open]="pdfViewer.passwordRequired()"
      (openChange)="onOpenChange($event)"
    >
      <ng-template scDialogPortal>
        <div scDialog>
          <div scDialogHeader>
            <h2 scDialogTitle>Password required</h2>
            <p scDialogDescription [class.text-destructive]="incorrect()">
              @if (incorrect()) {
                Incorrect password. Try again.
              } @else {
                This document is protected. Enter its password to open it.
              }
            </p>
          </div>
          <form class="grid gap-4" (submit)="submit($event)">
            <div scField>
              <label scLabel>Password</label>
              <input
                scInput
                type="password"
                autocomplete="current-password"
                [value]="password()"
                (input)="password.set($any($event.target).value)"
              />
            </div>
            <div scDialogFooter>
              <button
                scButton
                variant="outline"
                (click)="pdfViewer.cancelPassword()"
              >
                Cancel
              </button>
              <button scButton type="submit" [disabled]="!password()">
                Open
              </button>
            </div>
          </form>
        </div>
      </ng-template>
    </div>
  `,
  host: {
    'data-slot': 'pdf-viewer-password-dialog',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScPdfViewerPasswordDialog {
  readonly pdfViewer = inject(SC_PDF_VIEWER);

  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly class = computed(() => cn('contents', this.classInput()));

  readonly password = signal('');
  protected readonly incorrect = computed(
    () => this.pdfViewer.passwordReason() === 'incorrect-password',
  );

  protected submit(event: Event): void {
    event.preventDefault();
    const password = this.password();
    if (!password) return;
    this.pdfViewer.submitPassword(password);
    this.password.set('');
  }

  /** Dismissed with Escape or a click outside. */
  protected onOpenChange(open: boolean): void {
    if (!open && this.pdfViewer.passwordRequired()) {
      this.password.set('');
      this.pdfViewer.cancelPassword();
    }
  }
}
