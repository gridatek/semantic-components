import { CdkCopyToClipboard } from '@angular/cdk/clipboard';
import { Directive, inject, signal } from '@angular/core';

@Directive({
  selector: '[scCopyToClipboard]',
  exportAs: 'scCopyToClipboard',
  hostDirectives: [
    {
      directive: CdkCopyToClipboard,
      inputs: ['cdkCopyToClipboard: scCopyToClipboard'],
    },
  ],
})
export class ScCopyToClipboard {
  private readonly cdkCopyToClipboard = inject(CdkCopyToClipboard);

  readonly copied = signal(false);

  private timeout: ReturnType<typeof setTimeout> | undefined;

  constructor() {
    this.cdkCopyToClipboard.copied.subscribe((success) => {
      if (success) {
        this.copied.set(true);
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => this.copied.set(false), 2000);
      }
    });
  }
}
