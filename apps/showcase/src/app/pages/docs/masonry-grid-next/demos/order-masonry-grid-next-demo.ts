import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScFrame,
  ScMasonryGridNext,
  ScMasonryGridNextItem,
} from '@semantic-components/ui';

/** Into the shortest column (balanced) — or, sequential, each into the next column in turn (predictable): the same tiles, both ways. */
@Component({
  selector: 'app-order-masonry-grid-next-demo',
  imports: [ScMasonryGridNext, ScMasonryGridNextItem, ScFrame],
  template: `
    <div class="grid w-full gap-6 sm:grid-cols-2">
      @for (sequential of [false, true]; track sequential) {
        <section class="space-y-2">
          <h3 class="text-sm font-medium">
            {{ sequential ? 'Sequential' : 'Shortest column' }}
          </h3>
          <ol
            scMasonryGridNext
            [sequential]="sequential"
            [columnWidth]="70"
            class="gap-2"
          >
            @for (height of heights; track $index) {
              <li
                scMasonryGridNextItem
                scFrame
                size="sm"
                class="bg-muted grid place-items-center text-xs font-medium"
                [style.height.px]="height"
              >
                {{ $index + 1 }}
              </li>
            }
          </ol>
        </section>
      }
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class OrderMasonryGridNextDemo {
  private readonly heights = [120, 50, 60, 70, 110, 40, 90, 60, 50];
}
