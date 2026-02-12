import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { FourThreeAspectRatioDemo } from './four-three-aspect-ratio-demo';

@Component({
  selector: 'app-four-three-aspect-ratio-demo-container',
  imports: [DemoContainer, FourThreeAspectRatioDemo],
  template: `
    <app-demo-container
      title="4:3 Aspect Ratio"
      demoUrl="/demos/aspect-ratio/four-three-aspect-ratio-demo"
      [code]="code"
    >
      <app-four-three-aspect-ratio-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FourThreeAspectRatioDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScAspectRatio } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-four-three-aspect-ratio-demo',
  imports: [ScAspectRatio],
  template: \`
    <div class="w-[450px] overflow-hidden rounded-md">
      <div sc-aspect-ratio [ratio]="4 / 3">
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
export class FourThreeAspectRatioDemo {}`;
}
