import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { MasonryGridUsageDemo } from './masonry-grid-usage-demo';

@Component({
  selector: 'app-masonry-grid-usage-demo-container',
  imports: [DemoContainer, MasonryGridUsageDemo],
  template: `
    <app-demo-container
      title="Usage"
      [code]="code"
      demoUrl="/demos/masonry-grid/masonry-grid-usage-demo"
    >
      <app-masonry-grid-usage-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class MasonryGridUsageDemoContainer {
  private readonly code = `import { NgOptimizedImage } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScFrame,
  ScMasonryGrid,
  ScMasonryGridItem,
} from '@semantic-components/ui';

/** Photos of different heights: as many columns of at least 200px as fit, each photo into the shortest — in a list, the order the source’s, row by row. */
@Component({
  selector: 'app-masonry-grid-usage-demo',
  imports: [NgOptimizedImage, ScMasonryGrid, ScMasonryGridItem, ScFrame],
  template: \`
    <ul scMasonryGrid [columnWidth]="200" class="w-full gap-3">
      @for (photo of photos; track photo.name) {
        <!-- Each photo cropped to its shape: the item's box, the image filling it. -->
        <li
          scMasonryGridItem
          scFrame
          class="relative overflow-hidden"
          [class]="photo.shape"
        >
          <img
            [ngSrc]="'/images/gallery/' + photo.name + '-thumb.jpg'"
            [alt]="photo.alt"
            fill
            priority
            class="object-cover"
          />
        </li>
      }
    </ul>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class MasonryGridUsageDemo {
  private readonly photos = [
    {
      name: 'forest',
      alt: 'A pine forest above the sea',
      shape: 'aspect-[3/4]',
    },
    {
      name: 'waterfall',
      alt: 'A waterfall in a rocky gorge',
      shape: 'aspect-[3/2]',
    },
    {
      name: 'gorge',
      alt: 'A river through a green forest',
      shape: 'aspect-square',
    },
    {
      name: 'mountains',
      alt: 'Snowy mountains under clouds',
      shape: 'aspect-[3/2]',
    },
    {
      name: 'coast',
      alt: 'Wild roses above a misty sea',
      shape: 'aspect-[2/3]',
    },
    {
      name: 'cafe',
      alt: 'A wooden table in a quiet café',
      shape: 'aspect-[4/3]',
    },
    {
      name: 'summit',
      alt: 'A wooded summit under white clouds',
      shape: 'aspect-[3/4]',
    },
    {
      name: 'shed',
      alt: 'A green bicycle against a wooden shed',
      shape: 'aspect-[3/2]',
    },
  ];
}`;
}
