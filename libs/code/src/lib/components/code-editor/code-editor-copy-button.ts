import { Directive, computed, input, signal } from '@angular/core';
import {
  type ScButtonVariants,
  buttonVariants,
  cn,
  ɵwarnIfUnnamed,
} from '@semantic-components/ui';

/**
 * Copies `code` to the clipboard. Write its icon and name it — `copied()` is
 * true for two seconds after a copy, to switch both.
 */
@Directive({
  selector: 'button[scCodeEditorCopyButton]',
  exportAs: 'scCodeEditorCopyButton',
  host: {
    type: 'button',
    '[class]': 'class()',
    '(click)': 'copyCode($event)',
  },
})
export class ScCodeEditorCopyButton {
  readonly code = input.required<string>();
  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('icon');

  /** Whether the code was just copied (for two seconds): name the button with it. */
  readonly copied = signal(false);

  constructor() {
    ɵwarnIfUnnamed('scCodeEditorCopyButton');
  }

  protected readonly class = computed(() =>
    cn(
      buttonVariants({ variant: this.variant(), size: this.size() }),
      'text-muted-foreground',
      this.classInput(),
    ),
  );

  protected async copyCode(event: Event): Promise<void> {
    event.stopPropagation();

    try {
      await navigator.clipboard.writeText(this.code());
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  }
}
