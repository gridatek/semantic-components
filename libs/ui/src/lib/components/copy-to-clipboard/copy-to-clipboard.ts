import { CdkCopyToClipboard } from '@angular/cdk/clipboard';
import { Directive, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { concat, delay, filter, of, switchMap } from 'rxjs';

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

  readonly copied = toSignal(
    this.cdkCopyToClipboard.copied.pipe(
      filter((success) => success),
      switchMap(() => concat(of(true), of(false).pipe(delay(2000)))),
    ),
    { initialValue: false },
  );
}
