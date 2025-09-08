import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { ImageCropperComponent } from './image-cropper.component';

@Component({
  selector: 'app-root',
  imports: [ImageCropperComponent],
  template: `
    <div class="container">
      <div class="header">
        <h1>🖼️ Angular Image Cropper</h1>
        <p>Upload an image and crop it with precision controls</p>
      </div>

      <div class="content">
        <app-image-cropper />
      </div>
    </div>
  `,
  styles: [],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
