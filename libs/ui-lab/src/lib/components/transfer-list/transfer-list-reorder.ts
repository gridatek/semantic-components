import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  buttonVariants,
  cn,
  ɵwarnIfUnnamed,
} from '@semantic-components/ui';
import { ScTransferList } from './transfer-list';

/**
 * Moves the chosen side's selection up (`[scTransferListReorder]="-1"`)
 * or down (`1`), together; disabled at the end. Write its icon and name it
 * ("Move up").
 */
@Directive({
  selector: 'button[scTransferListReorder]',
  host: {
    type: 'button',
    'data-slot': 'transfer-list-reorder',
    '[disabled]': 'list.disabled() || !list.canReorder(selected(), step())',
    '[class]': 'class()',
    '(click)': 'list.reorder(selected(), step())',
  },
})
export class ScTransferListReorder {
  protected readonly list = inject(ScTransferList);

  readonly step = input.required<-1 | 1>({
    alias: 'scTransferListReorder',
  });
  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('outline');
  readonly size = input<ScButtonVariants['size']>('icon-sm');

  /** The chosen side's selection. */
  protected readonly selected = computed(
    () => this.list.pane('target')?.selected() ?? [],
  );

  protected readonly class = computed(() =>
    cn(
      buttonVariants({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scTransferListReorder');
  }
}
