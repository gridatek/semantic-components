import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { NoLabelsImageCompareDemo } from './no-labels-image-compare-demo';

@Component({
  selector: 'app-no-labels-image-compare-demo-container',
  imports: [DemoContainer, NoLabelsImageCompareDemo],
  template: `
    <app-demo-container
      title="Without Labels"
      demoUrl="/demos/image-compare/no-labels-image-compare-demo"
      [code]="code"
    >
      <app-no-labels-image-compare-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoLabelsImageCompareDemoContainer {
  readonly code = `import {
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
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-no-labels-image-compare-demo',
  imports: [
    ScImageCompare,
    ScImageCompareArea,
    ScImageCompareBefore,
    ScImageCompareAfter,
    ScImageCompareSlider,
  ],
  template: \`
    <div scImageCompare class="w-full max-w-2xl aspect-2/1">
      <div scImageCompareArea>
        <img
          scImageCompareBefore
          src="https://picsum.photos/seed/compare-nolabels/800/400?grayscale"
          alt="Before"
        />
        <img
          scImageCompareAfter
          src="https://picsum.photos/seed/compare-nolabels/800/400"
          alt="After"
        />
        <div scImageCompareSlider></div>
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoLabelsImageCompareDemo {}`;
}
