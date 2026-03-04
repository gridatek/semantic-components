import { CdkTrapFocus } from '@angular/cdk/a11y';
import { Directive } from '@angular/core';

@Directive({
  selector: '[scTrapFocus]',
  exportAs: 'scTrapFocus',
})
export class ScTrapFocus extends CdkTrapFocus {
  override ngAfterContentInit(): void {
    super.ngAfterContentInit();

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
