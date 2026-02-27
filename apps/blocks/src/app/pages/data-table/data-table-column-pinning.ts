import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { ScButton } from '@semantic-components/ui';
import type { ColumnPinningState } from '@tanstack/angular-table';

@Component({
  selector: 'app-data-table-column-pinning',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [ScButton],
  host: { class: 'mt-4 flex flex-wrap gap-4 rounded-md border p-4' },
  template: `
    <h3 class="w-full text-sm font-medium">Column Pinning</h3>
    <button
      scButton
      [variant]="columnPinning().left?.includes('id') ? 'default' : 'outline'"
      size="sm"
      (click)="togglePin('id', 'left')"
    >
      Pin ID Left
    </button>
    <button
      scButton
      [variant]="
        columnPinning().right?.includes('apiCalls') ? 'default' : 'outline'
      "
      size="sm"
      (click)="togglePin('apiCalls', 'right')"
    >
      Pin API Calls Right
    </button>
    <button scButton variant="outline" size="sm" (click)="reset()">
      Reset Pinning
    </button>
  `,
})
export class DataTableColumnPinning {
  readonly columnPinning = input.required<ColumnPinningState>();
  readonly columnPinningChange = output<ColumnPinningState>();

  togglePin(columnId: string, position: 'left' | 'right'): void {
    const prev = this.columnPinning();
    const pinned = prev[position] ?? [];
    if (pinned.includes(columnId)) {
      this.columnPinningChange.emit({
        ...prev,
        [position]: pinned.filter((id) => id !== columnId),
      });
    } else {
      this.columnPinningChange.emit({
        ...prev,
        [position]: [...pinned, columnId],
      });
    }
  }

  reset(): void {
    this.columnPinningChange.emit({});
  }
}
