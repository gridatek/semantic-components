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
    <div scImageCompare class="w-full max-w-md aspect-square">
      <div scImageCompareContainer>
        <img
          scImageCompareBefore
          src="https://picsum.photos/500/500?grayscale&random=7"
          alt="Before"
        />
        <img
          scImageCompareAfter
          src="https://picsum.photos/500/500?random=7"
          alt="After"
        />
        <div scImageCompareSlider></div>
        <div scImageCompareLabel class="top-2 left-2">Before</div>
        <div scImageCompareLabel class="top-2 right-2">After</div>
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SquareImageCompareDemo {}`;
}
