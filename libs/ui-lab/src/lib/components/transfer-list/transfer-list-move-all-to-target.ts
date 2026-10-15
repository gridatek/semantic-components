import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  buttonVariants,
  cn,
  ɵwarnIfUnnamed,
} from '@semantic-components/ui';
import { ScTransferListState } from './transfer-list-state';

/** Moves every item to the target list (disabled when the source is empty). Write its icon and name it. */
@Directive({
  selector: 'button[scTransferListMoveAllToTarget]',
  host: {
    '[class]': 'class()',
    type: 'button',
    'data-slot': 'transfer-list-move-all-to-target',
    '[disabled]': 'disabled()',
    '(click)': 'state.moveAllToTarget()',
  },
})
export class ScTransferListMoveAllToTarget {
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
    () => this.state.sourceItems().length === 0,
  );

  constructor() {
    ɵwarnIfUnnamed('scTransferListMoveAllToTarget');
  }
}
