import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { OrderMasonryGridDemo } from './order-masonry-grid-demo';

@Component({
  selector: 'app-order-masonry-grid-demo-container',
  imports: [DemoContainer, OrderMasonryGridDemo],
  template: `
    <app-demo-container
      title="Order"
      [code]="code"
      demoUrl="/demos/masonry-grid/order-masonry-grid-demo"
    >
      <app-order-masonry-grid-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class OrderMasonryGridDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScMasonryGrid, ScMasonryGridItem } from '@semantic-components/ui';

/** Into the shortest column (balanced) — or in turn, column after column (predictable): the same tiles, both ways. */
@Component({
  selector: 'app-order-masonry-grid-demo',
  imports: [ScMasonryGrid, ScMasonryGridItem],
  template: \`
    <div class="grid w-full gap-6 sm:grid-cols-2">
      @for (order of orders; track order) {
        <section class="space-y-2">
          <h3 class="text-sm font-medium">
            {{ order === 'shortest' ? 'Shortest column' : 'In turn' }}
          </h3>
          <ol scMasonryGrid [order]="order" [columnWidth]="70" [gap]="8">
            @for (height of heights; track $index) {
              <li
                scMasonryGridItem
                class="bg-muted grid place-items-center rounded-md text-xs font-medium"
                [style.height.px]="height"
              >
                {{ $index + 1 }}
              </li>
            }
          </ol>
        </section>
      }
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class OrderMasonryGridDemo {
  readonly orders = ['shortest', 'sequential'] as const;
  readonly heights = [120, 50, 60, 70, 110, 40, 90, 60, 50];
}`;
}
