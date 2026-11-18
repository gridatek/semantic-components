import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { HorizontalScrollAreaDemo } from './horizontal-scroll-area-demo';

@Component({
  selector: 'app-horizontal-scroll-area-demo-container',
  imports: [DemoContainer, HorizontalScrollAreaDemo],
  template: `
    <app-demo-container
      title="Horizontal"
      demoUrl="/demos/scroll-area/horizontal-scroll-area-demo"
      [code]="code"
    >
      <app-horizontal-scroll-area-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class HorizontalScrollAreaDemoContainer {
  private readonly code = `import { NgOptimizedImage } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScFrame,
  ScScrollArea,
  ScScrollAreaScrollbar,
  ScScrollAreaThumb,
  ScScrollAreaViewport,
  ScScrollAreaViewportContent,
} from '@semantic-components/ui';

/** A row wider than the box: a horizontal scrollbar. */
@Component({
  selector: 'app-horizontal-scroll-area-demo',
  imports: [
    NgOptimizedImage,
    ScFrame,
    ScScrollArea,
    ScScrollAreaViewportContent,
    ScScrollAreaScrollbar,
    ScScrollAreaThumb,
    ScScrollAreaViewport,
  ],
  template: \`
    <div scScrollArea scFrame class="w-96 max-w-full whitespace-nowrap">
      <div scScrollAreaViewport>
        <div scScrollAreaViewportContent class="flex w-max gap-4 p-4">
          @for (place of places; track place) {
            <figure class="shrink-0">
              <img
                [ngSrc]="'/images/gallery/' + place + '-thumb.jpg'"
                width="192"
                height="128"
                priority
                alt=""
                class="rounded-md object-cover"
              />
              <figcaption class="text-muted-foreground pt-2 text-xs capitalize">
                {{ place }}
              </figcaption>
            </figure>
          }
        </div>
      </div>
      <div scScrollAreaScrollbar orientation="horizontal">
        <div scScrollAreaThumb></div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class HorizontalScrollAreaDemo {
  private readonly places = [
    'cafe',
    'coast',
    'forest',
    'gorge',
    'mountains',
    'shed',
    'summit',
    'waterfall',
  ];
}`;
}
