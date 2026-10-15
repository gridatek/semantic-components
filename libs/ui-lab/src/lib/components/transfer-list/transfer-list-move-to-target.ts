import { Directive, computed, inject } from '@angular/core';
import { ɵwarnIfUnnamed } from '@semantic-components/ui';
import { ScTransferListState } from './transfer-list-state';

/** Moves the selected items to the target list (disabled with none selected). Write its icon and name it. */
@Directive({
  selector: 'button[scTransferListMoveToTarget]',
  host: {
    type: 'button',
    'data-slot': 'transfer-list-move-to-target',
    '[disabled]': 'disabled()',
    '(click)': 'state.moveToTarget()',
  },
})
export class ScTransferListMoveToTarget {
  protected readonly state = inject(ScTransferListState);

  protected readonly disabled = computed(
    () => this.state.selectedSourceIds().size === 0,
  );

  constructor() {
    ɵwarnIfUnnamed('scTransferListMoveToTarget');
  }
}
