import { Directive, computed, inject } from '@angular/core';
import { ɵwarnIfUnnamed } from '@semantic-components/ui';
import { ScTransferListState } from './transfer-list-state';

/** Moves the selected items back to the source list (disabled with none selected). Write its icon and name it. */
@Directive({
  selector: 'button[scTransferListMoveToSource]',
  host: {
    type: 'button',
    'data-slot': 'transfer-list-move-to-source',
    '[disabled]': 'disabled()',
    '(click)': 'state.moveToSource()',
  },
})
export class ScTransferListMoveToSource {
  protected readonly state = inject(ScTransferListState);

  protected readonly disabled = computed(
    () => this.state.selectedTargetIds().size === 0,
  );

  constructor() {
    ɵwarnIfUnnamed('scTransferListMoveToSource');
  }
}
