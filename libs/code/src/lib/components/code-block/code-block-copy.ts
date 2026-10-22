import { CdkCopyToClipboard } from '@angular/cdk/clipboard';
import { Directive, computed, inject, input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  type ScButtonVariants,
  buttonVariants,
  cn,
} from '@semantic-components/ui';
import { concat, delay, filter, of, switchMap } from 'rxjs';

/**
 * Copies `[scCodeBlockCopy]` (the code) — `copied()` for 2 s after. A ghost
 * icon button: write its icons (`copied()` swaps them) and its name
 * (`sr-only`); a polite live region of yours can say it was copied.
 */
@Directive({
  selector: 'button[scCodeBlockCopy]',
  exportAs: 'scCodeBlockCopy',
  hostDirectives: [
    {
      directive: CdkCopyToClipboard,
      inputs: ['cdkCopyToClipboard: scCodeBlockCopy'],
    },
  ],
  host: {
    'data-slot': 'code-block-copy-button',
    type: 'button',
    '[attr.data-copied]': 'copied() || null',
    '[class]': 'class()',
  },
})
export class ScCodeBlockCopy {
  private readonly clipboard = inject(CdkCopyToClipboard);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('icon-xs');
  /** How long `copied()` stays true, in ms. */
  readonly duration = input(2000);

  readonly copied = toSignal(
    this.clipboard.copied.pipe(
      filter((success) => success),
      switchMap(() => concat(of(true), of(false).pipe(delay(this.duration())))),
    ),
    { initialValue: false },
  );

  protected readonly class = computed(() =>
    cn(
      buttonVariants({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );
}
