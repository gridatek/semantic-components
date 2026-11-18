import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { ɵwarnIfUnnamed } from '../../utils/accessible-name/accessible-name';
import { type ScButtonVariants } from '../button/button';
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
  private readonly buttonStyles = injectStyle().button;

  private readonly list = inject(ScTransferList);

  readonly to = input.required<ScTransferListSide>({
    alias: 'scTransferListMove',
  });
  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('outline');
  readonly size = input<ScButtonVariants['size']>('icon-sm');

  /** The other side's selection. */
  private readonly selected = computed(
    () =>
      this.list
        .pane(this.to() === 'target' ? 'source' : 'target')
        ?.selected() ?? [],
  );

  private readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scTransferListMove');
  }
}
