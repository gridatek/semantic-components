import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { ScCheckbox, ScCheckboxField, cn } from '@semantic-components/ui';
import { SC_TRANSFER_LIST_PANEL } from './transfer-list-panel-ref';

@Component({
  selector: 'label[scTransferListSelectAll]',
  imports: [ScCheckboxField, ScCheckbox],
  template: `
    <div scCheckboxField class="shrink-0">
      <input
        type="checkbox"
        scCheckbox
        [checked]="panel.allSelected()"
        [indeterminate]="panel.someSelected()"
        (checkedChange)="panel.toggleAll()"
      />
    </div>
    <ng-content />
  `,
  host: {
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScTransferListSelectAll {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly panel = inject(SC_TRANSFER_LIST_PANEL);

  protected readonly class = computed(() =>
    cn('flex items-center gap-2', this.classInput()),
  );
}
