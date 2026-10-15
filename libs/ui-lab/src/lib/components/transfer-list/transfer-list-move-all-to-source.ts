import { Directive, computed, inject } from '@angular/core';
import { ɵwarnIfUnnamed } from '@semantic-components/ui';
import { ScTransferListState } from './transfer-list-state';

/** Moves every item back to the source list (disabled when the target is empty). Write its icon and name it. */
@Directive({
  selector: 'button[scTransferListMoveAllToSource]',
  host: {
    type: 'button',
    'data-slot': 'transfer-list-move-all-to-source',
    '[disabled]': 'disabled()',
    '(click)': 'state.moveAllToSource()',
  },
})
export class ScTransferListMoveAllToSource {
  protected readonly state = inject(ScTransferListState);

  protected readonly disabled = computed(
    () => this.state.targetItems().length === 0,
  );

  constructor() {
    ɵwarnIfUnnamed('scTransferListMoveAllToSource');
  }
}
