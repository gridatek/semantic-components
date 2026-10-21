import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  buttonVariants,
  cn,
  ɵwarnIfUnnamed,
} from '@semantic-components/ui';
import {
  ScTransferListNext,
  type ScTransferListSide,
} from './transfer-list-next';

/**
 * Moves all the other side shows (searched, not disabled) to its side —
 * `[scTransferListNextMoveAll]="'target'"`. Write its icon and name it
 * ("Add all").
 */
@Directive({
  selector: 'button[scTransferListNextMoveAll]',
  host: {
    type: 'button',
    'data-slot': 'transfer-list-move-all',
    '[disabled]': 'list.disabled() || !ids().length',
    '[class]': 'class()',
    '(click)': 'list.move(ids(), to())',
  },
})
export class ScTransferListNextMoveAll {
  protected readonly list = inject(ScTransferListNext);

  readonly to = input.required<ScTransferListSide>({
    alias: 'scTransferListNextMoveAll',
  });
  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('outline');
  readonly size = input<ScButtonVariants['size']>('icon-sm');

  /** What the other side shows, movable. */
  protected readonly ids = computed(
    () =>
      this.list
        .pane(this.to() === 'target' ? 'source' : 'target')
        ?.selectable()
        .map((item) => item.id) ?? [],
  );

  protected readonly class = computed(() =>
    cn(
      buttonVariants({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scTransferListNextMoveAll');
  }
}
