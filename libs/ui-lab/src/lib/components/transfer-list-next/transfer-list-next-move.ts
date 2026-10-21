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
 * Moves the other side's selection to its side —
 * `[scTransferListNextMove]="'target'"`; disabled with none selected. Write
 * its icon and name it ("Add selected").
 */
@Directive({
  selector: 'button[scTransferListNextMove]',
  host: {
    type: 'button',
    'data-slot': 'transfer-list-move',
    '[disabled]': 'list.disabled() || !selected().length',
    '[class]': 'class()',
    '(click)': 'list.move(selected(), to())',
  },
})
export class ScTransferListNextMove {
  protected readonly list = inject(ScTransferListNext);

  readonly to = input.required<ScTransferListSide>({
    alias: 'scTransferListNextMove',
  });
  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('outline');
  readonly size = input<ScButtonVariants['size']>('icon-sm');

  /** The other side's selection. */
  protected readonly selected = computed(
    () =>
      this.list
        .pane(this.to() === 'target' ? 'source' : 'target')
        ?.selected() ?? [],
  );

  protected readonly class = computed(() =>
    cn(
      buttonVariants({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scTransferListNextMove');
  }
}
