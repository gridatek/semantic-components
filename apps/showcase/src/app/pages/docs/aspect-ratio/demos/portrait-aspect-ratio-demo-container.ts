import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { PortraitAspectRatioDemo } from './portrait-aspect-ratio-demo';

@Component({
  selector: 'app-portrait-aspect-ratio-demo-container',
  imports: [DemoContainer, PortraitAspectRatioDemo],
  template: `
    <app-demo-container
      title="9:16 Portrait"
      demoUrl="/demos/aspect-ratio/portrait-aspect-ratio-demo"
      [code]="code"
    >
      <app-portrait-aspect-ratio-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortraitAspectRatioDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScAspectRatio } from '@semantic-components/ui';

@Component({
  selector: 'app-portrait-aspect-ratio-demo',
  imports: [ScAspectRatio],
  template: \`
    <div class="w-[200px] overflow-hidden rounded-md">
      <div sc-aspect-ratio [ratio]="9 / 16">
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
export class PortraitAspectRatioDemo {}`;
}
