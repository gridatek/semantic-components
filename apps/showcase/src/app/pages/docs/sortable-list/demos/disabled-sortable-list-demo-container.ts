import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DisabledSortableListDemo } from './disabled-sortable-list-demo';

@Component({
  selector: 'app-disabled-sortable-list-demo-container',
  imports: [DemoContainer, DisabledSortableListDemo],
  template: `
    <app-demo-container title="Disabled" [code]="code">
      <app-disabled-sortable-list-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledSortableListDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScSortableItem, ScSortableList } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-disabled-sortable-list-demo',
  imports: [ScSortableList, ScSortableItem],
  template: \`
    <div class="max-w-md">
      <div sc-sortable-list [items]="items" [disabled]="true" class="gap-2">
        @for (item of items; track item; let i = $index) {
          <div
            sc-sortable-item
            [index]="i"
            [item]="item"
            class="flex items-center gap-3 rounded-md border bg-muted/50 p-3 opacity-60"
          >
            <span class="text-sm">{{ item }}</span>
          </div>
        }
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledSortableListDemo {
  readonly items = ['Item 1', 'Item 2', 'Item 3'];
}`;
}
