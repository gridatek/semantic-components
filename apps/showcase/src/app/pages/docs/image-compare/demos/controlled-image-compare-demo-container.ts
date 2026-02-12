import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ControlledImageCompareDemo } from './controlled-image-compare-demo';

@Component({
  selector: 'app-controlled-image-compare-demo-container',
  imports: [DemoContainer, ControlledImageCompareDemo],
  template: `
    <app-demo-container
      title="Controlled Position"
      demoUrl="/demos/image-compare/controlled-image-compare-demo"
      [code]="code"
    >
      <app-controlled-image-compare-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControlledImageCompareDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  signal,
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
  selector: 'app-controlled-image-compare-demo',
  imports: [
    ScImageCompare,
    ScImageCompareContainer,
    ScImageCompareBefore,
    ScImageCompareAfter,
    ScImageCompareSlider,
    ScImageCompareLabel,
  ],
  template: \`
    <div
      sc-image-compare
      [(position)]="position"
      class="w-full max-w-2xl aspect-[2/1]"
    >
      <div sc-image-compare-container>
        <img
          sc-image-compare-before
          src="https://picsum.photos/800/400?grayscale&random=6"
          alt="Before"
        />
        <img
          sc-image-compare-after
          src="https://picsum.photos/800/400?random=6"
          alt="After"
        />
        <div sc-image-compare-slider></div>
        <div sc-image-compare-label class="top-2 left-2">Before</div>
        <div sc-image-compare-label class="top-2 right-2">After</div>
      </div>
    </div>
    <div class="flex items-center gap-4 max-w-2xl mt-4">
      <input
        type="range"
        min="0"
        max="100"
        [value]="position()"
        (input)="position.set(+$any($event.target).value)"
        class="flex-1"
      />
      <span class="text-sm w-12 text-right">{{ position() }}%</span>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControlledImageCompareDemo {
  readonly position = signal(50);
}`;
}
