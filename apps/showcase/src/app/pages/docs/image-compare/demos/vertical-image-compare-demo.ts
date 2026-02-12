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
  ScImageCompareLabel,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-vertical-image-compare-demo',
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
      [orientation]="'vertical'"
      class="w-full max-w-sm aspect-[2/3]"
    >
      <div sc-image-compare-container>
        <img
          sc-image-compare-before
          src="https://picsum.photos/400/600?grayscale&random=4"
          alt="Top"
        />
        <img
          sc-image-compare-after
          src="https://picsum.photos/400/600?random=4"
          alt="Bottom"
        />
        <div sc-image-compare-slider></div>
        <div sc-image-compare-label class="top-2 left-2">Top</div>
        <div sc-image-compare-label class="bottom-2 left-2">Bottom</div>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerticalImageCompareDemo {}
