import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScImageCompare,
  ScImageCompareContainer,
  ScImageCompareBefore,
  ScImageCompareAfter,
  ScImageCompareSlider,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-no-labels-image-compare-demo',
  imports: [
    ScImageCompare,
    ScImageCompareContainer,
    ScImageCompareBefore,
    ScImageCompareAfter,
    ScImageCompareSlider,
  ],
  template: `
    <div sc-image-compare class="w-full max-w-2xl aspect-[2/1]">
      <div sc-image-compare-container>
        <img
          sc-image-compare-before
          src="https://picsum.photos/800/400?grayscale&random=3"
          alt="Before"
        />
        <img
          sc-image-compare-after
          src="https://picsum.photos/800/400?random=3"
          alt="After"
        />
        <div sc-image-compare-slider></div>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoLabelsImageCompareDemo {}
