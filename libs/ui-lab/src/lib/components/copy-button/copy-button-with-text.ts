import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';
import { ScCopyButton } from './copy-button';

@Component({
  selector: '[sc-copy-button-with-text]',
  template: `
    <button
      sc-copy-button
      [value]="value()"
      [disabled]="disabled()"
      [timeout]="timeout()"
      [variant]="variant()"
      [size]="size()"
      (copySuccess)="copySuccess.emit($event)"
      (copyError)="copyError.emit($event)"
      #copyBtn="scCopyButton"
    >
      {{ copyBtn.copied() ? copiedText() : copyText() }}
    </button>
  `,
  host: {
    'data-slot': 'copy-button-with-text',
    '[class]': 'class()',
  },
  imports: [ScCopyButton],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScCopyButtonWithText {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly value = input.required<string>();
  readonly disabled = input<boolean>(false);
  readonly timeout = input<number>(2000);
  readonly variant = input<'default' | 'ghost' | 'outline'>('default');
  readonly size = input<'sm' | 'default' | 'lg'>('default');
  readonly copyText = input<string>('Copy');
  readonly copiedText = input<string>('Copied!');

  readonly copySuccess = output<string>();
  readonly copyError = output<Error>();

  protected readonly class = computed(() =>
    cn('inline-block', this.classInput()),
  );
}
