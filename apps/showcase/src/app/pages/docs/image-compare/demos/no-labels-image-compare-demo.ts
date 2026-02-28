import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScImageCompare,
  ScImageCompareArea,
  ScImageCompareBefore,
  ScImageCompareAfter,
  ScImageCompareSlider,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-no-labels-image-compare-demo',
  imports: [
    ScImageCompare,
    ScImageCompareArea,
    ScImageCompareBefore,
    ScImageCompareAfter,
    ScImageCompareSlider,
  ],
  template: `
    @let img = 'https://picsum.photos/seed/compare-nolabels/800/400';
    <div scImageCompare class="aspect-2/1 w-full max-w-2xl">
      <div scImageCompareArea>
        <img scImageCompareBefore [src]="img + '?grayscale'" alt="Before" />
        <img scImageCompareAfter [src]="img" alt="After" />
        <div scImageCompareSlider></div>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoLabelsImageCompareDemo {}
