import { Directive, computed, inject } from '@angular/core';
import { ɵwarnIfUnnamed } from '@semantic-components/ui';
import { ScTransferListState } from './transfer-list-state';

/** Moves every item to the target list (disabled when the source is empty). Write its icon and name it. */
@Directive({
  selector: 'button[scTransferListMoveAllToTarget]',
  host: {
    type: 'button',
    'data-slot': 'transfer-list-move-all-to-target',
    '[disabled]': 'disabled()',
    '(click)': 'state.moveAllToTarget()',
  },
})
export class ScTransferListMoveAllToTarget {
  protected readonly state = inject(ScTransferListState);

  protected readonly disabled = computed(
    () => this.state.sourceItems().length === 0,
  );

  constructor() {
    ɵwarnIfUnnamed('scTransferListMoveAllToTarget');
  }
}
