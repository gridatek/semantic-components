import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  buttonVariants,
  cn,
  ɵwarnIfUnnamed,
} from '@semantic-components/ui';
import { ScTransferList, type ScTransferListSide } from './transfer-list';

/**
 * Moves the other side's selection to its side —
 * `[scTransferListMove]="'target'"`; disabled with none selected. Write
 * its icon and name it ("Add selected").
 */
@Directive({
  selector: 'button[scTransferListMove]',
  host: {
    type: 'button',
    'data-slot': 'transfer-list-move',
    '[disabled]': 'list.disabled() || !selected().length',
    '[class]': 'class()',
    '(click)': 'list.move(selected(), to())',
  },
})
export class ScTransferListMove {
  protected readonly list = inject(ScTransferList);

  readonly to = input.required<ScTransferListSide>({
    alias: 'scTransferListMove',
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
    ɵwarnIfUnnamed('scTransferListMove');
  }
}
