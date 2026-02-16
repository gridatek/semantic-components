import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicImageCompareDemo } from './basic-image-compare-demo';

@Component({
  selector: 'app-basic-image-compare-demo-container',
  imports: [DemoContainer, BasicImageCompareDemo],
  template: `
    <app-demo-container
      title="Basic"
      demoUrl="/demos/image-compare/basic-image-compare-demo"
      [code]="code"
    >
      <app-basic-image-compare-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicImageCompareDemoContainer {
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
  selector: 'app-basic-image-compare-demo',
  imports: [
    ScImageCompare,
    ScImageCompareContainer,
    ScImageCompareBefore,
    ScImageCompareAfter,
    ScImageCompareSlider,
    ScImageCompareLabel,
  ],
  template: \`
    <div scImageCompare class="w-full max-w-2xl aspect-[2/1]">
      <div scImageCompareContainer>
        <img
          scImageCompareBefore
          src="https://picsum.photos/800/400?grayscale&random=1"
          alt="Before"
        />
        <img
          scImageCompareAfter
          src="https://picsum.photos/800/400?random=1"
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
export class BasicImageCompareDemo {}`;
}
