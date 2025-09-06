import { DialogRef } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import {
  ScButton,
  ScDialog,
  ScDialogClose,
  ScDialogContent,
  ScDialogHeader,
  ScDialogTitle,
  ScInput,
  ScLabel,
} from '@semantic-components/ui';
import { SiXIcon } from '@semantic-icons/lucide-icons';

export interface VideoData {
  url: string | null | undefined;
  width: number | null | undefined;
  height: number | null | undefined;
}

@Component({
  selector: 'sc-editor-video-insert-dialog',
  imports: [
    ReactiveFormsModule,
    ScDialog,
    ScDialogContent,
    ScDialogHeader,
    ScDialogTitle,
    ScDialogClose,
    ScInput,
    ScLabel,
    ScButton,
    SiXIcon,
  ],
  template: `
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/80" sc-dialog>
      <div class="mx-auto my-8 max-w-md" sc-dialog-content>
        <div sc-dialog-header>
          <h2 sc-dialog-title>Insert Video</h2>
          <button sc-dialog-close type="button">
            <svg class="h-4 w-4" si-x-icon></svg>
            <span class="sr-only">Close</span>
          </button>
        </div>

        <form class="space-y-4" [formGroup]="videoForm">
          <div class="space-y-2">
            <label sc-label for="video-url">YouTube URL</label>
            <input
              id="video-url"
              sc-input
              type="url"
              name="url"
              formControlName="url"
              placeholder="https://www.youtube.com/watch?v=..."
            />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-2">
              <label sc-label for="width">Width (px)</label>
              <input
                id="width"
                sc-input
                type="number"
                name="width"
                formControlName="width"
                placeholder="640"
              />
            </div>
            <div class="space-y-2">
              <label sc-label for="height">Height (px)</label>
              <input
                id="height"
                sc-input
                type="number"
                name="height"
                formControlName="height"
                placeholder="480"
              />
            </div>
          </div>

          <button class="w-full" (click)="dialogRef.close(getVideoInfo())" sc-button type="submit">
            Add video
          </button>
        </form>
      </div>
    </div>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScEditorVideoInsertDialog {
  dialogRef = inject<DialogRef<VideoData>>(DialogRef<VideoData>);

  videoForm = new FormGroup({
    url: new FormControl('https://www.youtube.com/watch?v=KaLxCiilHns', Validators.required),
    width: new FormControl(''),
    height: new FormControl(''),
  });

  get url() {
    return this.videoForm.get('url');
  }

  get width() {
    return this.videoForm.get('width');
  }

  get height() {
    return this.videoForm.get('height');
  }

  getVideoInfo() {
    return {
      url: this.url?.value,
      width: parseInt(this.width?.value ?? ''),
      height: parseInt(this.height?.value ?? ''),
    };
  }
}
