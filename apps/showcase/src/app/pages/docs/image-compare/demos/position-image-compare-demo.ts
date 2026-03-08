import { DecimalPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
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
  selector: 'app-position-image-compare-demo',
  imports: [
    DecimalPipe,
    ScImageCompare,
    ScImageCompareArea,
    ScImageCompareBefore,
    ScImageCompareAfter,
    ScImageCompareSlider,
    ScImageCompareLabel,
  ],
  template: `
    <div class="w-full max-w-2xl space-y-4">
      <div scImageCompare [(position)]="position" class="aspect-2/1 w-full">
        <div scImageCompareArea>
          @let img = 'https://picsum.photos/seed/compare-position/800/400';
          <img scImageCompareBefore [src]="img + '?grayscale'" alt="Before" />
          <img scImageCompareAfter [src]="img" alt="After" />
          <div scImageCompareSlider></div>
          <div scImageCompareLabel class="top-2 left-2">Before</div>
          <div scImageCompareLabel class="top-2 right-2">After</div>
        </div>
      </div>
      <p class="text-muted-foreground text-sm">
        Current position: {{ position() | number: '1.0-0' }}%
      </p>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PositionImageCompareDemo {
  readonly position = signal(25);
}
