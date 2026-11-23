import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { GridVirtualListNextDemo } from './grid-virtual-list-next-demo';

@Component({
  selector: 'app-grid-virtual-list-next-demo-container',
  imports: [DemoContainer, GridVirtualListNextDemo],
  template: `
    <app-demo-container
      title="Grid"
      [code]="code"
      demoUrl="/demos/virtual-list-next/grid-virtual-list-next-demo"
    >
      <app-grid-virtual-list-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class GridVirtualListNextDemoContainer {
  private readonly code = `import { NgOptimizedImage } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { ScFrame } from '@semantic-components/ui';
import {
  ScVirtualListNext,
  ScVirtualListNextRow,
} from '@semantic-components/ui/virtual-list';

/** In lanes: photos in three columns, each placed in the lane that ends first. */
@Component({
  selector: 'app-grid-virtual-list-next-demo',
  imports: [NgOptimizedImage, ScFrame, ScVirtualListNext, ScVirtualListNextRow],
  template: \`
    <ul
      scVirtualListNext
      #list="scVirtualListNext"
      tabindex="0"
      [count]="photos.length"
      [estimate]="160"
      [lanes]="3"
      [gap]="8"
      aria-label="Photos"
      class="h-96 w-full max-w-lg overflow-y-auto"
    >
      @for (row of list.rows(); track row.key) {
        <li [scVirtualListNextRow]="row">
          <div scFrame class="relative aspect-square overflow-hidden">
            <img
              [ngSrc]="'/images/gallery/' + photos[row.index] + '-thumb.jpg'"
              [alt]="photos[row.index] + ' ' + (row.index + 1)"
              fill
              [priority]="row.index < 6"
              class="object-cover"
            />
          </div>
        </li>
      }
    </ul>
    <p class="text-muted-foreground text-sm" data-testid="range">
      @if (list.range(); as range) {
        Rendered: {{ range.first + 1 }}–{{ range.last + 1 }} of
        {{ list.count() }}
      }
    </p>
  \`,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class GridVirtualListNextDemo {
  private readonly names = [
    'cafe',
    'coast',
    'forest',
    'gorge',
    'mountains',
    'shed',
    'summit',
    'waterfall',
  ];
  private readonly photos = Array.from(
    { length: 600 },
    (_, i) => this.names[i % this.names.length],
  );
}`;
}
