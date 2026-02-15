import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { UltrawideAspectRatioDemo } from './ultrawide-aspect-ratio-demo';

@Component({
  selector: 'app-ultrawide-aspect-ratio-demo-container',
  imports: [DemoContainer, UltrawideAspectRatioDemo],
  template: `
    <app-demo-container
      title="21:9 Ultrawide"
      demoUrl="/demos/aspect-ratio/ultrawide-aspect-ratio-demo"
      [code]="code"
    >
      <app-ultrawide-aspect-ratio-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UltrawideAspectRatioDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScAspectRatio } from '@semantic-components/ui';

@Component({
  selector: 'app-ultrawide-aspect-ratio-demo',
  imports: [ScAspectRatio],
  template: \`
    <div class="w-[500px] overflow-hidden rounded-md">
      <div sc-aspect-ratio [ratio]="21 / 9">
        <img
          src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
          alt="Photo by Drew Beamer"
          class="size-full object-cover"
        />
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UltrawideAspectRatioDemo {}`;
}
