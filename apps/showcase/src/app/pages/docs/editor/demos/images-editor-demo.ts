import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScEditor,
  ScEditorBold,
  ScEditorContent,
  ScEditorFooter,
  ScEditorItalic,
  ScEditorSeparator,
  ScEditorToolbar,
  ScEditorToolbarGroup,
  provideEditor,
} from '@semantic-components/editor';
import {
  ScEditorImage,
  type ScEditorUploadHandler,
  ScEditorUploads,
  withImages,
} from '@semantic-components/editor/images';
import { ScButton, ScProgress } from '@semantic-components/ui';
import {
  SiBoldIcon,
  SiImagePlusIcon,
  SiItalicIcon,
  SiXIcon,
} from '@semantic-icons/lucide-icons';

/**
 * The core editor and one feature: images, picked, dropped or pasted, each
 * uploaded with a progress bar.
 */
@Component({
  selector: 'app-images-editor-demo',
  providers: [provideEditor(withImages())],
  imports: [
    FormField,
    ScButton,
    ScEditor,
    ScEditorBold,
    ScEditorContent,
    ScEditorFooter,
    ScEditorImage,
    ScEditorUploads,
    ScEditorItalic,
    ScEditorSeparator,
    ScEditorToolbar,
    ScEditorToolbarGroup,
    ScProgress,
    SiBoldIcon,
    SiImagePlusIcon,
    SiItalicIcon,
    SiXIcon,
  ],
  template: `
    <div class="w-full">
      <div
        scEditor
        #images="scEditorUploads"
        [formField]="editorForm.body"
        [upload]="upload"
        class="overflow-hidden rounded-lg border"
      >
        <div scEditorToolbar aria-label="Formatting">
          <div scEditorToolbarGroup>
            <button scEditorBold value="bold">
              <svg siBoldIcon></svg>
              <span class="sr-only">Bold</span>
            </button>
            <button scEditorItalic value="italic">
              <svg siItalicIcon></svg>
              <span class="sr-only">Italic</span>
            </button>
          </div>

          <div scEditorSeparator></div>

          <div scEditorToolbarGroup>
            <button scEditorImage value="image">
              <svg siImagePlusIcon></svg>
              <span class="sr-only">Add image</span>
            </button>
          </div>
        </div>

        <div
          scEditorContent
          ariaLabel="Story"
          placeholder="Write, or drop an image here…"
        ></div>

        @if (images.uploads().length) {
          <div scEditorFooter>
            @for (upload of images.uploads(); track upload.id) {
              <div class="flex items-center gap-2">
                <span class="truncate">Uploading {{ upload.file.name }}</span>
                <div
                  scProgress
                  [value]="upload.progress * 100"
                  [aria-label]="'Uploading ' + upload.file.name"
                  class="w-32"
                ></div>
                <button
                  scButton
                  variant="ghost"
                  size="icon-xs"
                  type="button"
                  (click)="images.cancel(upload.id)"
                >
                  <svg siXIcon></svg>
                  <span class="sr-only">Cancel upload</span>
                </button>
              </div>
            }
          </div>
        }
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ImagesEditorDemo {
  private readonly model = signal({ body: '' });
  readonly editorForm = form(this.model);

  /**
   * A pretend upload: reports progress for a second, then gives the image a
   * local address. A real one would send the file to your server.
   */
  readonly upload: ScEditorUploadHandler = (file, { onProgress, signal }) =>
    new Promise((resolve, reject) => {
      let progress = 0;
      const timer = setInterval(() => {
        progress += 0.2;
        onProgress(progress);
        if (progress >= 1) {
          clearInterval(timer);
          resolve(URL.createObjectURL(file));
        }
      }, 200);
      signal.addEventListener('abort', () => {
        clearInterval(timer);
        reject(signal.reason);
      });
    });
}
