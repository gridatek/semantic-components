import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  buttonVariants,
  cn,
  ɵwarnIfUnnamed,
} from '@semantic-components/ui';
import { ScTransferListState } from './transfer-list-state';

/** Moves every item back to the source list (disabled when the target is empty). Write its icon and name it. */
@Directive({
  selector: 'button[scTransferListMoveAllToSource]',
  host: {
    '[class]': 'class()',
    type: 'button',
    'data-slot': 'transfer-list-move-all-to-source',
    '[disabled]': 'disabled()',
    '(click)': 'state.moveAllToSource()',
  },
})
export class ScTransferListMoveAllToSource {
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
    () => this.state.targetItems().length === 0,
  );

  constructor() {
    ɵwarnIfUnnamed('scTransferListMoveAllToSource');
  }
}
