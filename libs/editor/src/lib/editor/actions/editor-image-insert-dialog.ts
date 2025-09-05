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

export interface ImageData {
  url: string | null | undefined;
  alt: string | null | undefined;
  title: string | null | undefined;
}

@Component({
  selector: 'sc-editor-image-insert-dialog',
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
          <h2 sc-dialog-title>Insert Image</h2>
          <button sc-dialog-close type="button">
            <svg class="h-4 w-4" si-x-icon></svg>
            <span class="sr-only">Close</span>
          </button>
        </div>

        <form class="space-y-4" [formGroup]="imageForm">
          <div class="space-y-2">
            <label sc-label for="image-url">Image URL</label>
            <input
              id="image-url"
              sc-input
              type="url"
              name="image-url"
              formControlName="url"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div class="space-y-2">
            <label sc-label for="alt">Alt text</label>
            <input
              id="alt"
              sc-input
              type="text"
              formControlName="alt"
              name="alt"
              placeholder="Describe the image"
            />
          </div>

          <div class="space-y-2">
            <label sc-label for="title">Title (optional)</label>
            <input
              id="title"
              sc-input
              type="text"
              formControlName="title"
              name="title"
              placeholder="Image title"
            />
          </div>

          <button
            class="w-full"
            (click)="
              dialogRef.close({
                url: url?.value,
                alt: alt?.value,
                title: title?.value,
              })
            "
            sc-button
            type="submit"
          >
            Add image
          </button>
        </form>
      </div>
    </div>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScEditorImageInsertDialog {
  dialogRef = inject<DialogRef<ImageData>>(DialogRef<ImageData>);

  imageForm = new FormGroup({
    url: new FormControl('https://placehold.co/600x400', Validators.required),
    alt: new FormControl(''),
    title: new FormControl(''),
  });

  get url() {
    return this.imageForm.get('url');
  }

  get alt() {
    return this.imageForm.get('alt');
  }

  get title() {
    return this.imageForm.get('title');
  }
}
