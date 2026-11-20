import { Dir } from '@angular/cdk/bidi';
import { Component, LOCALE_ID, ViewEncapsulation } from '@angular/core';
import {
  ScFrame,
  ScImageCropperNext,
  ScImageCropperNextGrid,
  ScImageCropperNextHandle,
  ScImageCropperNextImage,
  ScImageCropperNextRotate,
  ScImageCropperNextSelection,
  ScImageCropperNextViewport,
  ScImageCropperNextZoom,
} from '@semantic-components/ui';
import { SiRotateCwIcon } from '@semantic-icons/lucide-icons';

/**
 * In a right-to-left page: the image and its crop are not mirrored (a photo
 * has no direction); the controls are, and the numbers read in Arabic.
 */
@Component({
  selector: 'app-rtl-image-cropper-next-demo',
  imports: [
    Dir,
    ScFrame,
    ScImageCropperNext,
    ScImageCropperNextViewport,
    ScImageCropperNextImage,
    ScImageCropperNextSelection,
    ScImageCropperNextGrid,
    ScImageCropperNextHandle,
    ScImageCropperNextZoom,
    ScImageCropperNextRotate,
    SiRotateCwIcon,
  ],
  template: `
    <div dir="rtl" lang="ar">
      <div scImageCropperNext aria-label="صورة">
        <div scImageCropperNextViewport scFrame class="h-60">
          <img
            scImageCropperNextImage
            src="/images/cropper-mountains.jpg"
            alt="جبال عند الفجر"
          />
          <div
            scImageCropperNextSelection
            aria-label="القص"
            valueText="{width} × {height} بكسل، عند {x}، {y}"
          >
            <div scImageCropperNextGrid></div>
          </div>
          @for (handle of handles; track handle.position) {
            <div
              [scImageCropperNextHandle]="handle.position"
              [attr.aria-label]="handle.label"
              valueText="{width} × {height} بكسل"
            ></div>
          }
        </div>
        <div class="flex items-center gap-2">
          <input scImageCropperNextZoom aria-label="التكبير" class="w-40" />
          <button scImageCropperNextRotate>
            <svg siRotateCwIcon></svg>
            <span class="sr-only">تدوير</span>
          </button>
        </div>
      </div>
    </div>
  `,
  providers: [{ provide: LOCALE_ID, useValue: 'ar' }],
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlImageCropperNextDemo {
  private readonly handles = [
    { position: 'nw', label: 'الزاوية العلوية اليسرى' },
    { position: 'ne', label: 'الزاوية العلوية اليمنى' },
    { position: 'se', label: 'الزاوية السفلية اليمنى' },
    { position: 'sw', label: 'الزاوية السفلية اليسرى' },
  ] as const;
}
