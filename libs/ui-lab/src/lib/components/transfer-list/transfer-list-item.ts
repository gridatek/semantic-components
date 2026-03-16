import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { ScCheckbox, ScCheckboxField, cn } from '@semantic-components/ui';
import { SC_TRANSFER_LIST_PANEL } from './transfer-list-panel-ref';
import type { TransferListItem } from './transfer-list-types';

@Component({
  selector: 'label[scTransferListItem]',
  imports: [ScCheckboxField, ScCheckbox],
  template: `
    <div scCheckboxField class="shrink-0">
      <input
        type="checkbox"
        scCheckbox
        [checked]="isSelected()"
        [disabled]="item().disabled"
        (checkedChange)="toggle()"
      />
    </div>
    <div class="min-w-0 flex-1">
      <ng-content />
    </div>
  `,
  host: {
    'data-slot': 'transfer-list-item',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScTransferListItem {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly item = input.required<TransferListItem>();

  private readonly panel = inject(SC_TRANSFER_LIST_PANEL);

  protected readonly isSelected = computed(() =>
    this.panel.selectedIds().has(this.item().id),
  );

  protected readonly class = computed(() =>
    cn(
      'flex cursor-pointer items-center gap-3 px-3 py-2 transition-colors',
      'hover:bg-accent',
      this.isSelected() && 'bg-accent/50',
      this.item().disabled && 'cursor-not-allowed opacity-50',
      this.classInput(),
    ),
  );

  protected toggle(): void {
    this.panel.toggleItem(this.item());
  }
}
