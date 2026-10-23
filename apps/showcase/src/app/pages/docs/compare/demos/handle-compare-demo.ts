import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScCompare,
  ScCompareAfter,
  ScCompareBefore,
  ScCompareHandle,
  ScCompareLabel,
} from '@semantic-components/ui';
import { SiGripVerticalIcon } from '@semantic-icons/lucide-icons';

/** Only the handle drags (a page can scroll over the rest); the handle restyled, its position shown. */
@Component({
  selector: 'app-handle-compare-demo',
  imports: [
    ScCompare,
    ScCompareBefore,
    ScCompareAfter,
    ScCompareHandle,
    ScCompareLabel,
    SiGripVerticalIcon,
  ],
  template: `
    <div class="w-full max-w-2xl space-y-2">
      <div
        scCompare
        handleOnly
        [bounds]="5"
        [(position)]="position"
        class="aspect-3/2 rounded-lg"
      >
        <img
          scCompareBefore
          src="/images/compare-before.jpg"
          alt="Mountains at dawn, as shot: grey and flat"
        />
        <img
          scCompareAfter
          src="/images/cropper-mountains.jpg"
          alt="The same photo, edited: warm light and deep colours"
        />
        <span scCompareLabel="before">Before</span>
        <span scCompareLabel="after">After</span>
        <div
          scCompareHandle
          aria-label="Before and after"
          [attr.aria-valuetext]="position() + '% before'"
          class="*:text-black before:bg-amber-400 after:bg-amber-400"
        >
          <svg siGripVerticalIcon></svg>
        </div>
      </div>
      <p class="text-muted-foreground text-sm tabular-nums">
        {{ position() }}% before
      </p>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class HandleCompareDemo {
  readonly position = signal(30);
}
