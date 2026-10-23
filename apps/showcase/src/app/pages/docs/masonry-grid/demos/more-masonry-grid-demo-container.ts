import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { MoreMasonryGridDemo } from './more-masonry-grid-demo';

@Component({
  selector: 'app-more-masonry-grid-demo-container',
  imports: [DemoContainer, MoreMasonryGridDemo],
  template: `
    <app-demo-container
      title="Load more"
      [code]="code"
      demoUrl="/demos/masonry-grid/more-masonry-grid-demo"
    >
      <app-more-masonry-grid-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class MoreMasonryGridDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScButton,
  ScMasonryGrid,
  ScMasonryGridItem,
} from '@semantic-components/ui';

/** Items added, or removed: the grid lays out again, and the others move into place (not under reduced motion). */
@Component({
  selector: 'app-more-masonry-grid-demo',
  imports: [ScMasonryGrid, ScMasonryGridItem, ScButton],
  template: \`
    <div class="w-full space-y-4">
      <ul scMasonryGrid [columnWidth]="140" class="w-full">
        @for (tile of tiles(); track tile.id) {
          <li
            scMasonryGridItem
            class="bg-muted grid place-items-center rounded-md text-sm font-medium"
            [style.height.px]="tile.height"
          >
            {{ tile.id }}
          </li>
        }
      </ul>
      <div class="flex gap-2">
        <button scButton (click)="more()">Load more</button>
        <button scButton variant="outline" (click)="removeFirst()">
          Remove the first
        </button>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class MoreMasonryGridDemo {
  private next = 1;
  readonly tiles = signal(this.make(6));

  more(): void {
    this.tiles.update((tiles) => [...tiles, ...this.make(4)]);
  }

  removeFirst(): void {
    this.tiles.update((tiles) => tiles.slice(1));
  }

  private make(count: number): { id: number; height: number }[] {
    return Array.from({ length: count }, () => {
      const id = this.next++;
      // Heights that vary, the same each time.
      return { id, height: 60 + ((id * 37) % 5) * 24 };
    });
  }
}`;
}
