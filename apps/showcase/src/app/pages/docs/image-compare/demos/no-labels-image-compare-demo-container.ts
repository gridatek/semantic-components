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
  ScImageCompareAfter,
  ScImageCompareArea,
  ScImageCompareBefore,
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
    @let img = 'https://picsum.photos/seed/compare-nolabels/800/400';
    <div scImageCompare class="aspect-2/1 w-full max-w-2xl">
      <div scImageCompareArea>
        <img scImageCompareBefore [src]="img + '?grayscale'" alt="Before" />
        <img scImageCompareAfter [src]="img" alt="After" />
        <div scImageCompareSlider></div>
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoLabelsImageCompareDemo {}`;
}
