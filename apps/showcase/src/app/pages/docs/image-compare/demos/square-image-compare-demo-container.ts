import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SquareImageCompareDemo } from './square-image-compare-demo';

@Component({
  selector: 'app-square-image-compare-demo-container',
  imports: [DemoContainer, SquareImageCompareDemo],
  template: `
    <app-demo-container
      title="Square Images"
      demoUrl="/demos/image-compare/square-image-compare-demo"
      [code]="code"
    >
      <app-square-image-compare-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SquareImageCompareDemoContainer {
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
  selector: 'app-square-image-compare-demo',
  imports: [
    ScImageCompare,
    ScImageCompareContainer,
    ScImageCompareBefore,
    ScImageCompareAfter,
    ScImageCompareSlider,
    ScImageCompareLabel,
  ],
  template: \`
    <div sc-image-compare class="w-full max-w-md aspect-square">
      <div sc-image-compare-container>
        <img
          sc-image-compare-before
          src="https://picsum.photos/500/500?grayscale&random=7"
          alt="Before"
        />
        <img
          sc-image-compare-after
          src="https://picsum.photos/500/500?random=7"
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
export class SquareImageCompareDemo {}`;
}
