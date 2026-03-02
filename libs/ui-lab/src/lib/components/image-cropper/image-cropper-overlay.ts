import { _IdGenerator } from '@angular/cdk/a11y';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  inject,
} from '@angular/core';
import { SC_IMAGE_CROPPER } from './image-cropper';

@Component({
  selector: '[scImageCropperOverlay]',
  template: `
    <svg class="h-full w-full">
      <defs>
        <mask [id]="maskId">
          <rect width="100%" height="100%" fill="white" />
          @if (isCircle()) {
            <ellipse
              [attr.cx]="cropCenterX()"
              [attr.cy]="cropCenterY()"
              [attr.rx]="cropRadiusX()"
              [attr.ry]="cropRadiusY()"
              fill="black"
            />
          } @else {
            <rect
              [attr.x]="cropper.cropArea().x"
              [attr.y]="cropper.cropArea().y"
              [attr.width]="cropper.cropArea().width"
              [attr.height]="cropper.cropArea().height"
              fill="black"
            />
          }
        </mask>
      </defs>
      <rect
        width="100%"
        height="100%"
        fill="rgba(0,0,0,0.5)"
        [attr.mask]="'url(#' + maskId + ')'"
      />
    </svg>
  `,
  host: {
    'data-slot': 'image-cropper-overlay',
    class: 'pointer-events-none absolute inset-0',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScImageCropperOverlay {
  protected readonly cropper = inject(SC_IMAGE_CROPPER);

  readonly maskId = inject(_IdGenerator).getId('sc-crop-mask-');

  protected readonly isCircle = computed(
    () => this.cropper.cropShape() === 'circle',
  );

  protected readonly cropCenterX = computed(
    () => this.cropper.cropArea().x + this.cropper.cropArea().width / 2,
  );

  protected readonly cropCenterY = computed(
    () => this.cropper.cropArea().y + this.cropper.cropArea().height / 2,
  );

  protected readonly cropRadiusX = computed(
    () => this.cropper.cropArea().width / 2,
  );

  protected readonly cropRadiusY = computed(
    () => this.cropper.cropArea().height / 2,
  );
}
