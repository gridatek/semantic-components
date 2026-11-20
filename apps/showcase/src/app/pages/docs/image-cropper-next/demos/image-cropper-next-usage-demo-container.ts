import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ImageCropperNextUsageDemo } from './image-cropper-next-usage-demo';

@Component({
  selector: 'app-image-cropper-next-usage-demo-container',
  imports: [DemoContainer, ImageCropperNextUsageDemo],
  template: `
    <app-demo-container
      title="Usage"
      [code]="code"
      demoUrl="/demos/image-cropper-next/image-cropper-next-usage-demo"
    >
      <app-image-cropper-next-usage-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ImageCropperNextUsageDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScButton,
  ScFrame,
  type ScImageCropNext,
  ScImageCropperNext,
  ScImageCropperNextFlip,
  ScImageCropperNextGrid,
  ScImageCropperNextHandle,
  ScImageCropperNextImage,
  ScImageCropperNextRotate,
  ScImageCropperNextSelection,
  ScImageCropperNextViewport,
  ScImageCropperNextZoom,
  ScNativeSelect,
  ScNativeSelectContainer,
  ScNativeSelectIcon,
  ScNativeSelectOption,
  cropImage,
} from '@semantic-components/ui';
import {
  SiChevronDownIcon,
  SiFlipHorizontal2Icon,
  SiRotateCwIcon,
} from '@semantic-icons/lucide-icons';

/**
 * A box over the image: drag it or its handles, pick a ratio, zoom, turn
 * and flip — then Crop makes it a file, shown below.
 */
@Component({
  selector: 'app-image-cropper-next-usage-demo',
  imports: [
    ScButton,
    ScFrame,
    ScImageCropperNext,
    ScImageCropperNextViewport,
    ScImageCropperNextImage,
    ScImageCropperNextSelection,
    ScImageCropperNextGrid,
    ScImageCropperNextHandle,
    ScImageCropperNextZoom,
    ScImageCropperNextRotate,
    ScImageCropperNextFlip,
    ScNativeSelect,
    ScNativeSelectContainer,
    ScNativeSelectIcon,
    ScNativeSelectOption,
    SiChevronDownIcon,
    SiRotateCwIcon,
    SiFlipHorizontal2Icon,
  ],
  template: \`
    <div
      scImageCropperNext
      aria-label="Photo"
      [(crop)]="crop"
      [aspectRatio]="ratio()"
    >
      <div scImageCropperNextViewport scFrame class="h-80">
        <img
          scImageCropperNextImage
          src="/images/cropper-mountains.jpg"
          alt="Mountains at dawn"
        />
        <div
          scImageCropperNextSelection
          aria-label="Crop"
          valueText="{width} by {height} pixels, at {x}, {y}"
        >
          <div scImageCropperNextGrid></div>
        </div>
        @for (handle of handles; track handle.position) {
          <div
            [scImageCropperNextHandle]="handle.position"
            [attr.aria-label]="handle.label"
            valueText="{width} by {height} pixels"
          ></div>
        }
      </div>

      <div class="flex flex-wrap items-center gap-2">
        <div scNativeSelectContainer class="w-32">
          <select
            scNativeSelect
            aria-label="Aspect ratio"
            (change)="pick($event)"
          >
            @for (option of ratios; track option.label) {
              <option scNativeSelectOption [value]="option.label">
                {{ option.label }}
              </option>
            }
          </select>
          <svg siChevronDownIcon scNativeSelectIcon></svg>
        </div>
        <input scImageCropperNextZoom aria-label="Zoom" class="w-32" />
        <button scImageCropperNextRotate>
          <svg siRotateCwIcon></svg>
          <span class="sr-only">Rotate</span>
        </button>
        <button scImageCropperNextFlip>
          <svg siFlipHorizontal2Icon></svg>
          <span class="sr-only">Flip</span>
        </button>
        <button scButton class="ms-auto" (click)="save()">Crop</button>
      </div>

      @if (result(); as result) {
        <img
          [src]="result"
          alt="The cropped photo"
          scFrame
          size="sm"
          class="max-h-40 self-start"
        />
      }
    </div>
  \`,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ImageCropperNextUsageDemo {
  private readonly crop = signal<ScImageCropNext | null>(null);
  private readonly ratio = signal<number | null>(null);
  private readonly result = signal<string | null>(null);

  private readonly ratios = [
    { label: 'Free', value: null },
    { label: 'Square', value: 1 },
    { label: '4:3', value: 4 / 3 },
    { label: '16:9', value: 16 / 9 },
  ];

  private readonly handles = [
    { position: 'nw', label: 'Top left corner' },
    { position: 'n', label: 'Top edge' },
    { position: 'ne', label: 'Top right corner' },
    { position: 'e', label: 'Right edge' },
    { position: 'se', label: 'Bottom right corner' },
    { position: 's', label: 'Bottom edge' },
    { position: 'sw', label: 'Bottom left corner' },
    { position: 'w', label: 'Left edge' },
  ] as const;

  private pick(event: Event): void {
    const label = (event.target as HTMLSelectElement).value;
    this.ratio.set(this.ratios.find((r) => r.label === label)?.value ?? null);
  }

  private async save(): Promise<void> {
    const crop = this.crop();
    if (!crop) return;
    const file = await cropImage('/images/cropper-mountains.jpg', crop);
    const previous = this.result();
    if (previous) URL.revokeObjectURL(previous);
    this.result.set(URL.createObjectURL(file));
  }
}`;
}
