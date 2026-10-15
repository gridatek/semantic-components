import { Directive, computed, inject, input } from '@angular/core';
import { buttonVariants, cn, ɵwarnIfUnnamed } from '@semantic-components/ui';
import { SC_SIGNATURE_PAD } from './signature-pad';

@Directive({
  selector: 'button[scSignaturePadUndo]',
  host: {
    type: 'button',
    '[class]': 'class()',
    '[disabled]': 'isDisabled()',
    '[attr.aria-disabled]': 'isDisabled() || null',
    '(click)': 'onClick()',
  },
})
export class ScSignaturePadUndoButton {
  constructor() {
    ɵwarnIfUnnamed('scSignaturePadUndo');
  }

  readonly signaturePad = inject(SC_SIGNATURE_PAD);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(buttonVariants({ variant: 'outline', size: 'icon' }), this.classInput()),
  );

  protected readonly isDisabled = computed(
    () => !this.signaturePad.canUndo() || this.signaturePad.disabled(),
  );

  protected onClick(): void {
    if (this.isDisabled()) return;
    this.signaturePad.undo();
  }
}
