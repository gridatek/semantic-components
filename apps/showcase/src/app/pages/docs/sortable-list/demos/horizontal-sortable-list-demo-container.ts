import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { HorizontalSortableListDemo } from './horizontal-sortable-list-demo';

@Component({
  selector: 'app-horizontal-sortable-list-demo-container',
  imports: [DemoContainer, HorizontalSortableListDemo],
  template: `
    <app-demo-container title="Horizontal" [code]="code">
      <app-horizontal-sortable-list-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HorizontalSortableListDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScSortableItem,
  ScSortableList,
  ScSortableOverlay,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-horizontal-sortable-list-demo',
  imports: [ScSortableList, ScSortableItem, ScSortableOverlay],
  template: \`
    <div class="max-w-lg">
      <div
        sc-sortable-list
        [(items)]="items"
        orientation="horizontal"
        class="gap-3 flex-wrap"
      >
        <div sc-sortable-overlay></div>
        @for (item of items(); track item; let i = $index) {
          <div
            sc-sortable-item
            [index]="i"
            [item]="item"
            class="flex items-center justify-center size-16 rounded-md border bg-background text-sm font-medium"
          >
            {{ item }}
          </div>
        }
      </div>
      <p class="mt-2 text-sm text-muted-foreground">
        Use Left/Right arrow keys to reorder.
      </p>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HorizontalSortableListDemo {
  readonly items = signal(['A', 'B', 'C', 'D', 'E', 'F']);
}`;
}
