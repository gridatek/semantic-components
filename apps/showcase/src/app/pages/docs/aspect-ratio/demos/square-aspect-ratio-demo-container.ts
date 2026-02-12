import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SquareAspectRatioDemo } from './square-aspect-ratio-demo';

@Component({
  selector: 'app-square-aspect-ratio-demo-container',
  imports: [DemoContainer, SquareAspectRatioDemo],
  template: `
    <app-demo-container
      title="1:1 Square"
      demoUrl="/demos/aspect-ratio/square-aspect-ratio-demo"
      [code]="code"
    >
      <app-square-aspect-ratio-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SquareAspectRatioDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScAspectRatio } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-square-aspect-ratio-demo',
  imports: [ScAspectRatio],
  template: \`
    <div class="w-[300px] overflow-hidden rounded-md">
      <div sc-aspect-ratio [ratio]="1">
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
export class SquareAspectRatioDemo {}`;
}
