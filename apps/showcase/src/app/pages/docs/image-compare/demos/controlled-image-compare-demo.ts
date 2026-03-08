import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { ScSlider } from '@semantic-components/ui';
import {
  ScImageCompare,
  ScImageCompareAfter,
  ScImageCompareArea,
  ScImageCompareBefore,
  ScImageCompareLabel,
  ScImageCompareSlider,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-controlled-image-compare-demo',
  imports: [
    ScImageCompare,
    ScImageCompareArea,
    ScImageCompareBefore,
    ScImageCompareAfter,
    ScImageCompareSlider,
    ScImageCompareLabel,
    ScSlider,
  ],
  template: `
    <div class="w-full max-w-2xl space-y-4">
      <div scImageCompare [(position)]="position" class="aspect-2/1 w-full">
        <div scImageCompareArea>
          @let img = 'https://picsum.photos/seed/compare-controlled/800/400';
          <img scImageCompareBefore [src]="img + '?grayscale'" alt="Before" />
          <img scImageCompareAfter [src]="img" alt="After" />
          <div scImageCompareSlider></div>
          <div scImageCompareLabel class="top-2 left-2">Before</div>
          <div scImageCompareLabel class="top-2 right-2">After</div>
        </div>
      </div>
      <div class="flex items-center gap-4">
        <input
          type="range"
          scSlider
          [(value)]="position"
          aria-label="Comparison position"
          class="flex-1"
        />
        <span class="w-12 text-right text-sm">{{ position() }}%</span>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControlledImageCompareDemo {
  readonly position = signal(50);
}
