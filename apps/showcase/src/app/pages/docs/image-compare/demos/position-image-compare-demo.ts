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
        @let img = 'https://picsum.photos/seed/compare-position/800/400';
        <img scImageCompareBefore [src]="img + '?grayscale'" alt="Before" />
        <img scImageCompareAfter [src]="img" alt="After" />
        <div scImageCompareSlider></div>
        <div scImageCompareLabel class="top-2 left-2">Before</div>
        <div scImageCompareLabel class="top-2 right-2">After</div>
      </div>
    </div>
    <p class="text-muted-foreground mt-4 text-sm">
      Current position: {{ position() }}%
    </p>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PositionImageCompareDemo {
  readonly position = signal(25);
}
