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
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PositionImageCompareDemoContainer {
  readonly code = `import {
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
  template: \`
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
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PositionImageCompareDemo {
  readonly position = signal(25);
}`;
}
