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
  ScImageCompareLabel,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-labels-image-compare-demo',
  imports: [
    ScImageCompare,
    ScImageCompareArea,
    ScImageCompareBefore,
    ScImageCompareAfter,
    ScImageCompareSlider,
    ScImageCompareLabel,
  ],
  template: `
    @let img = 'https://picsum.photos/seed/compare-labels/800/400';
    <div scImageCompare class="aspect-2/1 w-full max-w-2xl">
      <div scImageCompareArea>
        <img scImageCompareBefore [src]="img + '?blur=5'" alt="Blurred" />
        <img scImageCompareAfter [src]="img" alt="Sharp" />
        <div scImageCompareSlider></div>
        <div scImageCompareLabel class="top-2 left-2">Blurred</div>
        <div scImageCompareLabel class="top-2 right-2">Sharp</div>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabelsImageCompareDemo {}
