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
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HorizontalSortableListDemoContainer {
  readonly code = `import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-horizontal-sortable-list-demo',
  imports: [CdkDropList, CdkDrag],
  template: \`
    <div class="max-w-lg">
      <div
        cdkDropList
        [cdkDropListData]="items()"
        [cdkDropListOrientation]="'horizontal'"
        (cdkDropListDropped)="drop($event)"
        class="flex flex-wrap gap-3"
      >
        @for (item of items(); track item) {
          <div
            cdkDrag
            class="bg-background flex size-16 cursor-move items-center justify-center rounded-md border text-sm font-medium"
          >
            {{ item }}
          </div>
        }
      </div>
      <p class="text-muted-foreground mt-2 text-sm">
        Drag items horizontally to reorder.
      </p>
    </div>
  \`,
  styles: \`
    .cdk-drag-preview {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 4rem;
      height: 4rem;
      border-radius: 0.375rem;
      border: 1px solid var(--border);
      background: var(--background);
      font-size: 0.875rem;
      font-weight: 500;
      box-shadow:
        0 10px 15px -3px rgb(0 0 0 / 0.1),
        0 4px 6px -4px rgb(0 0 0 / 0.1);
    }
    .cdk-drag-placeholder {
      border-radius: 0.375rem;
      border: 1px dashed var(--border);
      opacity: 0.5;
    }
    .cdk-drag-animating {
      transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
    }
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HorizontalSortableListDemo {
  readonly items = signal(['A', 'B', 'C', 'D', 'E', 'F']);

  drop(event: CdkDragDrop<string[]>): void {
    this.items.update((items) => {
      const updated = [...items];
      moveItemInArray(updated, event.previousIndex, event.currentIndex);
      return updated;
    });
  }
}`;
}
