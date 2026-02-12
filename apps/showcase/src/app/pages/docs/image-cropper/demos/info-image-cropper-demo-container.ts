import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { InfoImageCropperDemo } from './info-image-cropper-demo';

@Component({
  selector: 'app-info-image-cropper-demo-container',
  imports: [DemoContainer, InfoImageCropperDemo],
  template: `
    <app-demo-container
      title="Crop Area Info"
      demoUrl="/demos/image-cropper/info-image-cropper-demo"
      [code]="code"
    >
      <app-info-image-cropper-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoImageCropperDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import {
  CropArea,
  ScImageCropper,
  ScImageCropperContainer,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-info-image-cropper-demo',
  imports: [ScImageCropper, ScImageCropperContainer],
  template: \`
    <div class="space-y-4">
      <div
        sc-image-cropper
        [src]="imageSrc()"
        [(cropArea)]="cropArea"
        [containerHeight]="300"
      >
        <div
          sc-image-cropper-container
          class="rounded-lg overflow-hidden border"
        ></div>
      </div>

      <div class="rounded-md border p-4 bg-muted/50">
        <div class="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span class="text-muted-foreground">X:</span>
            <span class="ml-2 font-mono">{{ cropArea().x.toFixed(0) }}px</span>
          </div>
          <div>
            <span class="text-muted-foreground">Y:</span>
            <span class="ml-2 font-mono">{{ cropArea().y.toFixed(0) }}px</span>
          </div>
          <div>
            <span class="text-muted-foreground">Width:</span>
            <span class="ml-2 font-mono">
              {{ cropArea().width.toFixed(0) }}px
            </span>
          </div>
          <div>
            <span class="text-muted-foreground">Height:</span>
            <span class="ml-2 font-mono">
              {{ cropArea().height.toFixed(0) }}px
            </span>
          </div>
        </div>
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoImageCropperDemo {
  readonly imageSrc = signal(
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
  );

  readonly cropArea = signal<CropArea>({
    x: 50,
    y: 50,
    width: 200,
    height: 200,
  });
}`;
}
