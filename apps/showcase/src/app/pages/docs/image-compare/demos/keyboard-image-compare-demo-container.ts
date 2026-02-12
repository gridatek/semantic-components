import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { KeyboardImageCompareDemo } from './keyboard-image-compare-demo';

@Component({
  selector: 'app-keyboard-image-compare-demo-container',
  imports: [DemoContainer, KeyboardImageCompareDemo],
  template: `
    <app-demo-container
      title="Keyboard Navigation"
      demoUrl="/demos/image-compare/keyboard-image-compare-demo"
      [code]="code"
    >
      <app-keyboard-image-compare-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KeyboardImageCompareDemoContainer {
  readonly code = `import {
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
  selector: 'app-keyboard-image-compare-demo',
  imports: [
    ScImageCompare,
    ScImageCompareContainer,
    ScImageCompareBefore,
    ScImageCompareAfter,
    ScImageCompareSlider,
    ScImageCompareLabel,
  ],
  template: \`
    <p class="text-sm text-muted-foreground mb-4">
      Focus the comparison and use arrow keys to adjust. Hold Shift for larger
      steps.
    </p>
    <ul
      class="text-sm space-y-1 list-disc list-inside text-muted-foreground mb-4"
    >
      <li>
        <kbd class="px-1 py-0.5 bg-muted rounded text-xs">←</kbd>
        /
        <kbd class="px-1 py-0.5 bg-muted rounded text-xs">→</kbd>
        - Move slider
      </li>
      <li>
        <kbd class="px-1 py-0.5 bg-muted rounded text-xs">Home</kbd>
        - Go to start
      </li>
      <li>
        <kbd class="px-1 py-0.5 bg-muted rounded text-xs">End</kbd>
        - Go to end
      </li>
      <li>
        <kbd class="px-1 py-0.5 bg-muted rounded text-xs">Shift</kbd>
        + Arrow - Move by 10%
      </li>
    </ul>
    <div sc-image-compare class="w-full max-w-2xl aspect-[2/1]">
      <div sc-image-compare-container>
        <img
          sc-image-compare-before
          src="https://picsum.photos/800/400?grayscale&random=8"
          alt="Before"
        />
        <img
          sc-image-compare-after
          src="https://picsum.photos/800/400?random=8"
          alt="After"
        />
        <div sc-image-compare-slider></div>
        <div sc-image-compare-label class="top-2 left-2">Before</div>
        <div sc-image-compare-label class="top-2 right-2">After</div>
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KeyboardImageCompareDemo {}`;
}
