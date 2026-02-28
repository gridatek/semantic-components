import {
  ChangeDetectionStrategy,
  Component,
  signal,
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
  selector: 'app-controlled-image-compare-demo',
  imports: [
    ScImageCompare,
    ScImageCompareArea,
    ScImageCompareBefore,
    ScImageCompareAfter,
    ScImageCompareSlider,
    ScImageCompareLabel,
  ],
  template: `
    <div
      scImageCompare
      [(position)]="position"
      class="aspect-2/1 w-full max-w-2xl"
    >
      <div scImageCompareArea>
        @let img = 'https://picsum.photos/seed/compare-controlled/800/400';
        <img scImageCompareBefore [src]="img + '?grayscale'" alt="Before" />
        <img scImageCompareAfter [src]="img" alt="After" />
        <div scImageCompareSlider></div>
        <div scImageCompareLabel class="top-2 left-2">Before</div>
        <div scImageCompareLabel class="top-2 right-2">After</div>
      </div>
    </div>
    <div class="mt-4 flex max-w-2xl items-center gap-4">
      <input
        type="range"
        min="0"
        max="100"
        [value]="position()"
        (input)="position.set(+$any($event.target).value)"
        class="flex-1"
      />
      <span class="w-12 text-right text-sm">{{ position() }}%</span>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControlledImageCompareDemo {
  readonly position = signal(50);
}
