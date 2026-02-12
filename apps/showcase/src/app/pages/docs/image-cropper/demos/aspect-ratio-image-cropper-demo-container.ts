import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { AspectRatioImageCropperDemo } from './aspect-ratio-image-cropper-demo';

@Component({
  selector: 'app-aspect-ratio-image-cropper-demo-container',
  imports: [DemoContainer, AspectRatioImageCropperDemo],
  template: `
    <app-demo-container
      title="With Aspect Ratio Presets"
      demoUrl="/demos/image-cropper/aspect-ratio-image-cropper-demo"
      [code]="code"
    >
      <app-aspect-ratio-image-cropper-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AspectRatioImageCropperDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScImageCropper,
  ScImageCropperContainer,
  ScImageCropperAspectRatio,
  ScImageCropperControls,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-aspect-ratio-image-cropper-demo',
  imports: [
    ScImageCropper,
    ScImageCropperContainer,
    ScImageCropperControls,
    ScImageCropperAspectRatio,
  ],
  template: \`
    <div
      sc-image-cropper
      [src]="imageSrc()"
      [aspectRatio]="selectedAspectRatio()"
      [containerHeight]="300"
      class="space-y-4"
    >
      <div
        sc-image-cropper-container
        class="rounded-lg overflow-hidden border"
      ></div>

      <div class="flex items-center justify-between">
        <div
          sc-image-cropper-aspect-ratio
          [options]="aspectRatioOptions"
          (aspectRatioChange)="onAspectRatioChange($event)"
        ></div>
        <div sc-image-cropper-controls></div>
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AspectRatioImageCropperDemo {
  readonly imageSrc = signal(
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
  );

  readonly selectedAspectRatio = signal<number | null>(null);

  readonly aspectRatioOptions = [
    { label: 'Free', value: null },
    { label: '1:1', value: 1 },
    { label: '4:3', value: 4 / 3 },
    { label: '16:9', value: 16 / 9 },
    { label: '3:2', value: 3 / 2 },
  ];

  onAspectRatioChange(ratio: number | null): void {
    this.selectedAspectRatio.set(ratio);
  }
}`;
}
