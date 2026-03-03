import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { VerticalImageCompareDemo } from './vertical-image-compare-demo';

@Component({
  selector: 'app-vertical-image-compare-demo-container',
  imports: [DemoContainer, VerticalImageCompareDemo],
  template: `
    <app-demo-container
      title="Vertical Orientation"
      demoUrl="/demos/image-compare/vertical-image-compare-demo"
      [code]="code"
    >
      <app-vertical-image-compare-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerticalImageCompareDemoContainer {
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
  ScImageCompareLabel,
  ScImageCompareSlider,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-vertical-image-compare-demo',
  imports: [
    ScImageCompare,
    ScImageCompareArea,
    ScImageCompareBefore,
    ScImageCompareAfter,
    ScImageCompareSlider,
    ScImageCompareLabel,
  ],
  template: \`
    <div
      scImageCompare
      [orientation]="'vertical'"
      class="aspect-2/3 w-full max-w-sm"
    >
      <div scImageCompareArea>
        @let img = 'https://picsum.photos/seed/compare-vertical/400/600';
        <img scImageCompareBefore [src]="img + '?grayscale'" alt="Top" />
        <img scImageCompareAfter [src]="img" alt="Bottom" />
        <div scImageCompareSlider></div>
        <div scImageCompareLabel class="top-2 left-2">Top</div>
        <div scImageCompareLabel class="bottom-2 left-2">Bottom</div>
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerticalImageCompareDemo {}`;
}
