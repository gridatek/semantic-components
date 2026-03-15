import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { GalleryMarqueeDemo } from './gallery-marquee-demo';

@Component({
  selector: 'app-gallery-marquee-demo-container',
  imports: [DemoContainer, GalleryMarqueeDemo],
  template: `
    <app-demo-container title="Gallery" [code]="code">
      <app-gallery-marquee-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryMarqueeDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScMarquee,
  ScMarqueeContent,
  ScMarqueeItem,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-gallery-marquee-demo',
  imports: [ScMarquee, ScMarqueeContent, ScMarqueeItem],
  template: \`
    <div scMarquee [duration]="35" [gap]="16">
      <div scMarqueeContent>
        @for (i of images; track i) {
          <div
            scMarqueeItem
            class="from-primary/20 to-primary/5 flex h-32 w-48 items-center justify-center rounded-lg bg-linear-to-br"
          >
            <span class="text-4xl opacity-50">📷</span>
          </div>
        }
      </div>
      <div scMarqueeContent aria-hidden="true">
        @for (i of images; track i) {
          <div
            scMarqueeItem
            class="from-primary/20 to-primary/5 flex h-32 w-48 items-center justify-center rounded-lg bg-linear-to-br"
          >
            <span class="text-4xl opacity-50">📷</span>
          </div>
        }
      </div>
    </div>
  \`,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryMarqueeDemo {
  readonly images = [1, 2, 3, 4, 5, 6];
}`;
}
