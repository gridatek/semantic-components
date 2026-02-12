import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicLightboxDemo } from './basic-lightbox-demo';

@Component({
  selector: 'app-basic-lightbox-demo-container',
  imports: [DemoContainer, BasicLightboxDemo],
  template: `
    <app-demo-container title="Basic" [code]="code">
      <app-basic-lightbox-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicLightboxDemoContainer {
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
  selector: 'app-basic-lightbox-demo',
  imports: [ScLightbox, ScLightboxContainer, ScLightboxTrigger],
  template: \`
    <div class="space-y-2">
      <div sc-lightbox [images]="images">
        <div class="flex gap-4">
          @for (image of images; track image.src; let i = $index) {
            <button
              sc-lightbox-trigger
              [index]="i"
              class="w-32 h-32 rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <img
                [src]="image.thumbnail || image.src"
                [alt]="image.alt"
                class="size-full object-cover"
              />
            </button>
          }
        </div>
        <div sc-lightbox-container></div>
      </div>
      <p class="text-sm text-muted-foreground">
        Click an image to open the lightbox. Use arrow keys or buttons to
        navigate.
      </p>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicLightboxDemo {
  readonly images: LightboxImage[] = [
    { src: 'https://picsum.photos/800/600?random=1', alt: 'Random image 1' },
    { src: 'https://picsum.photos/800/600?random=2', alt: 'Random image 2' },
    { src: 'https://picsum.photos/800/600?random=3', alt: 'Random image 3' },
    { src: 'https://picsum.photos/800/600?random=4', alt: 'Random image 4' },
  ];
}`;
}
