import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScButton,
  ScFrame,
  ScMasonryGridNext,
  ScMasonryGridNextItem,
} from '@semantic-components/ui';

/** Items added, or removed: the grid lays out again, and the others move into place (not under reduced motion). */
@Component({
  selector: 'app-more-masonry-grid-next-demo',
  imports: [ScButton, ScMasonryGridNext, ScMasonryGridNextItem, ScFrame],
  template: `
    <div class="w-full space-y-4">
      <ul scMasonryGridNext [columnWidth]="140" class="w-full gap-3">
        @for (tile of tiles(); track tile.id) {
          <li
            scMasonryGridNextItem
            scFrame
            size="sm"
            class="bg-muted grid place-items-center text-sm font-medium"
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
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class MoreMasonryGridNextDemo {
  private next = 1;
  private readonly tiles = signal(this.make(6));

  private more(): void {
    this.tiles.update((tiles) => [...tiles, ...this.make(4)]);
  }

  private removeFirst(): void {
    this.tiles.update((tiles) => tiles.slice(1));
  }

  private make(count: number): { id: number; height: number }[] {
    return Array.from({ length: count }, () => {
      const id = this.next++;
      // Heights that vary, the same each time.
      return { id, height: 60 + ((id * 37) % 5) * 24 };
    });
  }
}
