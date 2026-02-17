import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ScToggleGroup, ScToggleGroupItem } from '@semantic-components/ui';
import {
  SiKanbanIcon,
  SiLayoutGridIcon,
  SiListIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-outline-toggle-group-demo',
  imports: [
    ScToggleGroup,
    ScToggleGroupItem,
    SiListIcon,
    SiLayoutGridIcon,
    SiKanbanIcon,
  ],
  template: `
    <div
      scToggleGroup
      type="single"
      variant="outline"
      [(value)]="view"
      aria-label="View mode"
    >
      <button scToggleGroupItem value="list" aria-label="List view">
        <svg si-list-icon></svg>
      </button>
      <button scToggleGroupItem value="grid" aria-label="Grid view">
        <svg si-layout-grid-icon></svg>
      </button>
      <button scToggleGroupItem value="kanban" aria-label="Kanban view">
        <svg si-kanban-icon></svg>
      </button>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OutlineToggleGroupDemo {
  readonly view = signal<string | null>('list');
}
