import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  buttonVariants,
  cn,
  ɵwarnIfUnnamed,
} from '@semantic-components/ui';
import { ScTransferListState } from './transfer-list-state';

/** Moves the selected items to the target list (disabled with none selected). Write its icon and name it. */
@Directive({
  selector: 'button[scTransferListMoveToTarget]',
  host: {
    '[class]': 'class()',
    type: 'button',
    'data-slot': 'transfer-list-move-to-target',
    '[disabled]': 'disabled()',
    '(click)': 'state.moveToTarget()',
  },
})
export class ScTransferListMoveToTarget {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('outline');
  readonly size = input<ScButtonVariants['size']>('icon');

  protected readonly class = computed(() =>
    cn(
      buttonVariants({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );

  protected readonly state = inject(ScTransferListState);

  protected readonly disabled = computed(
    () => this.state.selectedSourceIds().size === 0,
  );

  constructor() {
    ɵwarnIfUnnamed('scTransferListMoveToTarget');
  }
}
