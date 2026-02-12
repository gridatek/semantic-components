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
  selector: 'app-labels-image-compare-demo',
  imports: [
    ScImageCompare,
    ScImageCompareContainer,
    ScImageCompareBefore,
    ScImageCompareAfter,
    ScImageCompareSlider,
    ScImageCompareLabel,
  ],
  template: `
    <div sc-image-compare class="w-full max-w-2xl aspect-[2/1]">
      <div sc-image-compare-container>
        <img
          sc-image-compare-before
          src="https://picsum.photos/800/400?blur=5&random=2"
          alt="Blurred"
        />
        <img
          sc-image-compare-after
          src="https://picsum.photos/800/400?random=2"
          alt="Sharp"
        />
        <div sc-image-compare-slider></div>
        <div sc-image-compare-label class="top-2 left-2">Blurred</div>
        <div sc-image-compare-label class="top-2 right-2">Sharp</div>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabelsImageCompareDemo {}
