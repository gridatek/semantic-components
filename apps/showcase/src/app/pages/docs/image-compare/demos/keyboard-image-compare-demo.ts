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
  selector: 'app-keyboard-image-compare-demo',
  imports: [
    ScImageCompare,
    ScImageCompareArea,
    ScImageCompareBefore,
    ScImageCompareAfter,
    ScImageCompareSlider,
    ScImageCompareLabel,
  ],
  template: `
    <div class="w-full max-w-2xl space-y-4">
      <p class="text-muted-foreground text-sm">
        Focus the comparison and use arrow keys to adjust. Hold Shift for larger
        steps.
      </p>
      <ul class="text-muted-foreground list-inside list-disc space-y-1 text-sm">
        <li>
          <kbd class="bg-muted rounded px-1 py-0.5 text-xs">←</kbd>
          /
          <kbd class="bg-muted rounded px-1 py-0.5 text-xs">→</kbd>
          - Move slider
        </li>
        <li>
          <kbd class="bg-muted rounded px-1 py-0.5 text-xs">Home</kbd>
          - Go to start
        </li>
        <li>
          <kbd class="bg-muted rounded px-1 py-0.5 text-xs">End</kbd>
          - Go to end
        </li>
        <li>
          <kbd class="bg-muted rounded px-1 py-0.5 text-xs">Shift</kbd>
          + Arrow - Move by 10%
        </li>
      </ul>
      <div scImageCompare class="aspect-2/1 w-full">
        <div scImageCompareArea>
          @let img = 'https://picsum.photos/seed/compare-keyboard/800/400';
          <img scImageCompareBefore [src]="img + '?grayscale'" alt="Before" />
          <img scImageCompareAfter [src]="img" alt="After" />
          <div scImageCompareSlider></div>
          <div scImageCompareLabel class="top-2 left-2">Before</div>
          <div scImageCompareLabel class="top-2 right-2">After</div>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KeyboardImageCompareDemo {}
