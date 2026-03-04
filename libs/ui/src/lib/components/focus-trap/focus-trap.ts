import { CdkTrapFocus } from '@angular/cdk/a11y';
import { Directive, inject } from '@angular/core';

@Directive({
  selector: '[cdkTrapFocus]',
})
export class ScFocusTrapCaretFix {
  private readonly focusTrap = inject(CdkTrapFocus);

  ngAfterContentInit(): void {
    if (!this.focusTrap.autoCapture) {
      return;
    }

    // On mobile, programmatic .focus() selects all text in inputs.
    // After CDK auto-capture focuses the first tabbable element,
    // move the caret to the end instead.
    setTimeout(() => {
      const el = document.activeElement;

      if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
        const len = el.value.length;
        el.setSelectionRange(len, len);
      }
    });
  }
}
