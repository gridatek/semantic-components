import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { HandleCompareDemo } from './handle-compare-demo';

@Component({
  selector: 'app-handle-compare-demo-container',
  imports: [DemoContainer, HandleCompareDemo],
  template: `
    <app-demo-container
      title="Handle only, bounds and step"
      [code]="code"
      demoUrl="/demos/compare/handle-compare-demo"
    >
      <app-handle-compare-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class HandleCompareDemoContainer {
  private readonly code = `import { NgOptimizedImage } from '@angular/common';
import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScCompare,
  ScCompareAfter,
  ScCompareBefore,
  ScCompareHandle,
  ScCompareLabel,
  ScFrame,
} from '@semantic-components/ui';
import { SiGripVerticalIcon } from '@semantic-icons/lucide-icons';

/** Only the handle drags, on any screen (a page scrolls over the rest); within 5% of the edges, arrows by 5%; the handle restyled, its position said. */
@Component({
  selector: 'app-handle-compare-demo',
  imports: [
    ScFrame,
    NgOptimizedImage,
    ScCompare,
    ScCompareBefore,
    ScCompareAfter,
    ScCompareHandle,
    ScCompareLabel,
    SiGripVerticalIcon,
  ],
  template: \`
    <div class="w-full max-w-2xl space-y-2">
      <div
        scCompare
        handleOnly
        [step]="5"
        [bounds]="5"
        [(position)]="position"
        scFrame
        class="aspect-3/2"
      >
        <img
          scCompareBefore
          ngSrc="/images/compare-before.jpg"
          fill
          priority
          alt="Mountains at dawn, as shot: grey and flat"
        />
        <img
          scCompareAfter
          ngSrc="/images/cropper-mountains.jpg"
          fill
          priority
          alt="The same photo, edited: warm light and deep colours"
        />
        <span scCompareLabel="before">Before</span>
        <span scCompareLabel="after">After</span>
        <div
          scCompareHandle
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
export class HandleCompareDemo {
  private readonly position = signal(30);
}`;
}
