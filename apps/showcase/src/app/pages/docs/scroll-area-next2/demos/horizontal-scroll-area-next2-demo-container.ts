import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { HorizontalScrollAreaNext2Demo } from './horizontal-scroll-area-next2-demo';

@Component({
  selector: 'app-horizontal-scroll-area-next2-demo-container',
  imports: [DemoContainer, HorizontalScrollAreaNext2Demo],
  template: `
    <app-demo-container
      title="Horizontal"
      demoUrl="/demos/scroll-area-next2/horizontal-scroll-area-next2-demo"
      [code]="code"
    >
      <app-horizontal-scroll-area-next2-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class HorizontalScrollAreaNext2DemoContainer {
  readonly code = `import { NgOptimizedImage } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { ScFrame, ScScrollAreaNext2 } from '@semantic-components/ui';

/** A row wider than the box: it scrolls sideways. */
@Component({
  selector: 'app-horizontal-scroll-area-next2-demo',
  imports: [NgOptimizedImage, ScFrame, ScScrollAreaNext2],
  template: \`
    <div scScrollAreaNext2 scFrame class="w-96 max-w-full whitespace-nowrap">
      <div class="flex w-max gap-4 p-4">
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
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class HorizontalScrollAreaNext2Demo {
  protected readonly places = [
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
