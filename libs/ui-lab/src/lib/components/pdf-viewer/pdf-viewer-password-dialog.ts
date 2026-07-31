import { CdkTrapFocus } from '@angular/cdk/a11y';
import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer-root';

@Component({
  selector: 'sc-pdf-viewer-password-dialog',
  template: `
    @if (pdfViewer.passwordRequired()) {
      <div
        class="absolute inset-0 z-50 flex items-center justify-center bg-black/50"
      >
        <dialog
          open
          cdkTrapFocus
          [cdkTrapFocusAutoCapture]="true"
          class="relative rounded border border-[#333] bg-[#474747] p-6 text-[#d1d5db] shadow-lg"
          (click)="$event.stopPropagation()"
        >
          <h2 class="mb-4 text-base font-semibold text-white">
            Password Required
          </h2>

          @if (pdfViewer.passwordReason() === 'incorrect-password') {
            <p class="mb-3 text-sm text-red-400">
              Incorrect password. Please try again.
            </p>
          } @else {
            <p class="mb-3 text-sm">
              This document is password protected. Please enter the password.
            </p>
          }

          <div class="mb-4">
            <input
              type="password"
              class="w-full rounded border border-[#5a5a5a] bg-[#3d3d3d] px-3 py-2 text-sm text-[#d1d5db] outline-none focus:border-[#6b9edd]"
              placeholder="Enter password"
              [value]="password()"
              (input)="password.set($any($event.target).value)"
              (keydown.enter)="submit()"
            />
          </div>

          <div class="flex justify-end gap-2">
            <button
              type="button"
              class="rounded border border-[#666] bg-[#5a5a5a] px-4 py-1.5 text-sm text-[#d1d5db] hover:bg-[#666] hover:text-white"
              (click)="pdfViewer.cancelPassword()"
            >
              Cancel
            </button>
            <button
              type="button"
              class="rounded bg-[#6b9edd] px-4 py-1.5 text-sm text-white hover:bg-[#5a8ecc]"
              (click)="submit()"
            >
              Submit
            </button>
          </div>
        </dialog>
      </div>
    }
  `,
  imports: [CdkTrapFocus],
  host: {
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScPdfViewerPasswordDialog {
  readonly pdfViewer = inject(SC_PDF_VIEWER);

  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly class = computed(() => cn('block', this.classInput()));

  readonly password = signal('');

  submit(): void {
    const pwd = this.password();
    if (pwd) {
      this.pdfViewer.submitPassword(pwd);
      this.password.set('');
    }
  }
}
