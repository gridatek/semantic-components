import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  buttonVariants,
  cn,
  ɵwarnIfUnnamed,
} from '@semantic-components/ui';
import { ScTransferListNext } from './transfer-list-next';

/**
 * Moves the chosen side's selection up (`[scTransferListNextReorder]="-1"`)
 * or down (`1`), together; disabled at the end. Write its icon and name it
 * ("Move up").
 */
@Directive({
  selector: 'button[scTransferListNextReorder]',
  host: {
    type: 'button',
    'data-slot': 'transfer-list-reorder',
    '[disabled]': 'list.disabled() || !list.canReorder(selected(), step())',
    '[class]': 'class()',
    '(click)': 'list.reorder(selected(), step())',
  },
})
export class ScTransferListNextReorder {
  protected readonly list = inject(ScTransferListNext);

  readonly step = input.required<-1 | 1>({
    alias: 'scTransferListNextReorder',
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
    ɵwarnIfUnnamed('scTransferListNextReorder');
  }
}
