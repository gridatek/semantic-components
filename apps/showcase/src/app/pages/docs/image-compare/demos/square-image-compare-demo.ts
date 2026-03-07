import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScImageCompare,
  ScImageCompareAfter,
  ScImageCompareArea,
  ScImageCompareBefore,
  ScImageCompareLabel,
  ScImageCompareSlider,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-square-image-compare-demo',
  imports: [
    ScImageCompare,
    ScImageCompareArea,
    ScImageCompareBefore,
    ScImageCompareAfter,
    ScImageCompareSlider,
    ScImageCompareLabel,
  ],
  template: `
    <div scImageCompare class="aspect-square w-full max-w-md">
      <div scImageCompareArea>
        @let img = 'https://picsum.photos/seed/compare-square/500/500';
        <img scImageCompareBefore [src]="img + '?grayscale'" alt="Before" />
        <img scImageCompareAfter [src]="img" alt="After" />
        <div scImageCompareSlider></div>
        <div scImageCompareLabel class="top-2 left-2">Before</div>
        <div scImageCompareLabel class="top-2 right-2">After</div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SquareImageCompareDemo {}
