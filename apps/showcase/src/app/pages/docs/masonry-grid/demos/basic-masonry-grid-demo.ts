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
  selector: 'app-basic-masonry-grid-demo',
  imports: [ScMasonryGrid, ScMasonryItem],
  template: `
    <sc-masonry-grid [columns]="4" [gap]="16">
      @for (item of items(); track item.id) {
        <sc-masonry-item>
          <div
            class="rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            [style.background-color]="item.color"
            [style.height.px]="item.height"
          >
            <div class="p-4 text-white">
              <p class="font-medium">{{ item.title }}</p>
              <p class="text-sm opacity-75">{{ item.height }}px tall</p>
            </div>
          </div>
        </sc-masonry-item>
      }
    </sc-masonry-grid>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicMasonryGridDemo {
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
