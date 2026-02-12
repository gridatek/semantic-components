import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ScMasonryGrid, ScMasonryItem } from '@semantic-components/ui-lab';

interface DemoItem {
  id: number;
  height: number;
  color: string;
  title: string;
}

@Component({
  selector: 'app-breakpoints-masonry-grid-demo',
  imports: [ScMasonryGrid, ScMasonryItem],
  template: `
    <sc-masonry-grid
      [columns]="3"
      [gap]="20"
      [breakpoints]="[
        { minWidth: 0, columns: 1 },
        { minWidth: 640, columns: 2 },
        { minWidth: 1024, columns: 3 },
      ]"
    >
      @for (item of items().slice(0, 9); track item.id) {
        <sc-masonry-item>
          <div
            class="rounded-lg border bg-card p-4"
            [style.min-height.px]="item.height"
          >
            <h4 class="font-medium">Card {{ item.id }}</h4>
            <p class="text-sm text-muted-foreground mt-2">
              This card has a minimum height of {{ item.height }}px. The masonry
              layout automatically arranges cards in columns.
            </p>
          </div>
        </sc-masonry-item>
      }
    </sc-masonry-grid>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreakpointsMasonryGridDemo {
  readonly colors = [
    '#ef4444',
    '#f97316',
    '#f59e0b',
    '#eab308',
    '#84cc16',
    '#22c55e',
    '#10b981',
    '#14b8a6',
    '#06b6d4',
    '#0ea5e9',
    '#3b82f6',
    '#6366f1',
    '#8b5cf6',
    '#a855f7',
    '#d946ef',
    '#ec4899',
    '#f43f5e',
  ];

  readonly items = signal<DemoItem[]>(
    Array.from({ length: 15 }, (_, i) => ({
      id: i + 1,
      height: Math.floor(Math.random() * 150) + 100,
      color: this.colors[i % this.colors.length],
      title: `Item ${i + 1}`,
    })),
  );
}
