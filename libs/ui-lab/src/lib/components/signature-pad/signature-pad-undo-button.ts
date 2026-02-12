import {
  Component,
  ChangeDetectionStrategy,
  computed,
  input,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';
import { SC_SIGNATURE_PAD } from './signature-pad';

@Component({
  selector: 'button[sc-signature-pad-undo]',
  template: '<ng-content />',
  host: {
    'data-slot': 'signature-pad-undo',
    type: 'button',
    '[class]': 'class()',
    '[disabled]': 'isDisabled()',
    '[attr.aria-label]': 'ariaLabel()',
    '(click)': 'onClick()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScSignaturePadUndoButton {
  readonly signaturePad = inject(SC_SIGNATURE_PAD);
  readonly classInput = input<string>('', { alias: 'class' });
  readonly ariaLabel = input<string>('Undo last stroke');

  protected readonly class = computed(() =>
    cn(
      'p-1.5 rounded-md bg-background/80 border hover:bg-accent',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      'focus:outline-none focus:ring-2 focus:ring-ring',
      this.classInput(),
    ),
  );

  protected readonly isDisabled = computed(
    () => !this.signaturePad.canUndo() || this.signaturePad.disabled(),
  );

  protected onClick(): void {
    if (this.isDisabled()) return;
    this.signaturePad.undo();
  }
}
