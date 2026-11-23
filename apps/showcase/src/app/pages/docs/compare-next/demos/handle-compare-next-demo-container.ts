import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { HandleCompareNextDemo } from './handle-compare-next-demo';

@Component({
  selector: 'app-handle-compare-next-demo-container',
  imports: [DemoContainer, HandleCompareNextDemo],
  template: `
    <app-demo-container
      title="Handle only, bounds and step"
      [code]="code"
      demoUrl="/demos/compare-next/handle-compare-next-demo"
    >
      <app-handle-compare-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class HandleCompareNextDemoContainer {
  private readonly code = `import { NgOptimizedImage } from '@angular/common';
import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScCompareNext,
  ScCompareNextAfter,
  ScCompareNextBefore,
  ScCompareNextHandle,
  ScCompareNextLabel,
  ScFrame,
} from '@semantic-components/ui';
import { SiGripVerticalIcon } from '@semantic-icons/lucide-icons';

/** Only the handle drags, on any screen (a page scrolls over the rest); within 5% of the edges, arrows by 5%; the handle restyled, its position said. */
@Component({
  selector: 'app-handle-compare-next-demo',
  imports: [
    ScFrame,
    NgOptimizedImage,
    ScCompareNext,
    ScCompareNextBefore,
    ScCompareNextAfter,
    ScCompareNextHandle,
    ScCompareNextLabel,
    SiGripVerticalIcon,
  ],
  template: \`
    <div class="w-full max-w-2xl space-y-2">
      <div
        scCompareNext
        handleOnly
        [step]="5"
        [bounds]="5"
        [(position)]="position"
        scFrame
        class="aspect-3/2"
      >
        <img
          scCompareNextBefore
          ngSrc="/images/compare-before.jpg"
          fill
          priority
          alt="Mountains at dawn, as shot: grey and flat"
        />
        <img
          scCompareNextAfter
          ngSrc="/images/cropper-mountains.jpg"
          fill
          priority
          alt="The same photo, edited: warm light and deep colours"
        />
        <span scCompareNextLabel="before">Before</span>
        <span scCompareNextLabel="after">After</span>
        <div
          scCompareNextHandle
          aria-label="Before and after"
          [aria-valuetext]="position() + '% before'"
          class="*:text-black before:bg-amber-400 after:bg-amber-400"
        >
          <svg siGripVerticalIcon></svg>
        </div>
      </div>
      <p class="text-muted-foreground text-sm tabular-nums">
        {{ position() }}% before
      </p>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class HandleCompareNextDemo {
  private readonly position = signal(30);
}`;
}
