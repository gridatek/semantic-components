import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SingleLightboxDemo } from './single-lightbox-demo';

@Component({
  selector: 'app-single-lightbox-demo-container',
  imports: [DemoContainer, SingleLightboxDemo],
  template: `
    <app-demo-container title="Single Image" [code]="code">
      <app-single-lightbox-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SingleLightboxDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScLightbox,
  ScLightboxContainer,
  ScLightboxTrigger,
  LightboxImage,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-single-lightbox-demo',
  imports: [ScLightbox, ScLightboxContainer, ScLightboxTrigger],
  template: \`
    <div sc-lightbox [images]="[image]">
      <button
        sc-lightbox-trigger
        [index]="0"
        class="w-48 rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-ring"
      >
        <img
          [src]="image.src"
          [alt]="image.alt"
          class="w-full aspect-video object-cover"
        />
      </button>
      <div sc-lightbox-container></div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SingleLightboxDemo {
  readonly image: LightboxImage = {
    src: 'https://picsum.photos/800/600?random=30',
    alt: 'Single image',
    title: 'Featured Photo',
    description: 'This is a featured photo with detailed information.',
  };
}`;
}
