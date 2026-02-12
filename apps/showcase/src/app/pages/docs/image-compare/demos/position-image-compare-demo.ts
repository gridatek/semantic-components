import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScImageCompare,
  ScImageCompareContainer,
  ScImageCompareBefore,
  ScImageCompareAfter,
  ScImageCompareSlider,
  ScImageCompareLabel,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-position-image-compare-demo',
  imports: [
    ScImageCompare,
    ScImageCompareContainer,
    ScImageCompareBefore,
    ScImageCompareAfter,
    ScImageCompareSlider,
    ScImageCompareLabel,
  ],
  template: `
    <div
      sc-image-compare
      [(position)]="position"
      class="w-full max-w-2xl aspect-[2/1]"
    >
      <div sc-image-compare-container>
        <img
          sc-image-compare-before
          src="https://picsum.photos/800/400?grayscale&random=5"
          alt="Before"
        />
        <img
          sc-image-compare-after
          src="https://picsum.photos/800/400?random=5"
          alt="After"
        />
        <div sc-image-compare-slider></div>
        <div sc-image-compare-label class="top-2 left-2">Before</div>
        <div sc-image-compare-label class="top-2 right-2">After</div>
      </div>
    </div>
    <p class="text-sm text-muted-foreground mt-4">
      Current position: {{ position() }}%
    </p>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PositionImageCompareDemo {
  readonly position = signal(25);
}
