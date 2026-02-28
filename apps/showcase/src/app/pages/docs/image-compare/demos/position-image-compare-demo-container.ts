import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { PositionImageCompareDemo } from './position-image-compare-demo';

@Component({
  selector: 'app-position-image-compare-demo-container',
  imports: [DemoContainer, PositionImageCompareDemo],
  template: `
    <app-demo-container
      title="Custom Initial Position"
      demoUrl="/demos/image-compare/position-image-compare-demo"
      [code]="code"
    >
      <app-position-image-compare-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PositionImageCompareDemoContainer {
  readonly code = `import {
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
  selector: 'app-position-image-compare-demo',
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
      [(position)]="position"
      class="w-full max-w-2xl aspect-2/1"
    >
      <div scImageCompareArea>
        <img
          scImageCompareBefore
          src="https://picsum.photos/seed/compare-position/800/400?grayscale"
          alt="Before"
        />
        <img
          scImageCompareAfter
          src="https://picsum.photos/seed/compare-position/800/400"
          alt="After"
        />
        <div scImageCompareSlider></div>
        <div scImageCompareLabel class="top-2 left-2">Before</div>
        <div scImageCompareLabel class="top-2 right-2">After</div>
      </div>
    </div>
    <p class="text-sm text-muted-foreground mt-4">
      Current position: {{ position() }}%
    </p>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PositionImageCompareDemo {
  readonly position = signal(25);
}`;
}
