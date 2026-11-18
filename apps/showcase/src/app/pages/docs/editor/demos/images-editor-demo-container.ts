import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ImagesEditorDemo } from './images-editor-demo';

@Component({
  selector: 'app-images-editor-demo-container',
  imports: [DemoContainer, ImagesEditorDemo],
  template: `
    <app-demo-container
      title="A story with pictures"
      [code]="code"
      demoUrl="/demos/editor/images-editor-demo"
    >
      <app-images-editor-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ImagesEditorDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScButton,
  ScFrame,
  ScProgress,
  ScProgressRange,
  ScProgressTrack,
  ScToggle,
  ScToolbar,
  ScToolbarSeparator,
  ScToolbarWidget,
  ScToolbarWidgetGroup,
} from '@semantic-components/ui';
import {
  ScEditor,
  ScEditorCommand,
  ScEditorContent,
  provideEditor,
} from '@semantic-components/ui/editor';
import {
  ScEditorImage,
  type ScEditorUploadHandler,
  ScEditorUploads,
  withImages,
} from '@semantic-components/ui/editor/images';
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
    ScToolbar,
    ScToolbarWidget,
    ScToolbarWidgetGroup,
    ScToolbarSeparator,
    ScToggle,
    ScFrame,
    FormField,
    ScButton,
    ScEditor,
    ScEditorCommand,
    ScEditorContent,
    ScEditorImage,
    ScEditorUploads,
    ScProgress,
    ScProgressRange,
    ScProgressTrack,
    SiBoldIcon,
    SiImagePlusIcon,
    SiItalicIcon,
    SiXIcon,
  ],
  template: \`
    <div class="w-full">
      <div
        scEditor
        #images="scEditorUploads"
        [formField]="editorForm.body"
        [upload]="upload"
        class="flex flex-col gap-2"
      >
        <div scToolbar aria-label="Formatting" class="w-full flex-wrap">
          <div scToolbarWidgetGroup>
            <button scToolbarWidget scToggle scEditorCommand="bold">
              <svg siBoldIcon></svg>
              <span class="sr-only">Bold</span>
            </button>
            <button scToolbarWidget scToggle scEditorCommand="italic">
              <svg siItalicIcon></svg>
              <span class="sr-only">Italic</span>
            </button>
          </div>

          <div scToolbarSeparator></div>

          <div scToolbarWidgetGroup>
            <button scToolbarWidget scToggle scEditorImage>
              <svg siImagePlusIcon></svg>
              <span class="sr-only">Add image</span>
            </button>
          </div>
        </div>

        <div
          scFrame
          scEditorContent
          ariaLabel="Story"
          placeholder="Write, or drop an image here…"
        ></div>

        @if (images.uploads().length) {
          <div class="text-muted-foreground px-1 text-xs">
            @for (upload of images.uploads(); track upload.id) {
              <div class="flex items-center gap-2">
                <span class="truncate">Uploading {{ upload.file.name }}</span>
                <div
                  scProgress
                  [value]="upload.progress * 100"
                  [attr.aria-label]="'Uploading ' + upload.file.name"
                  class="w-32"
                >
                  <div scProgressTrack><div scProgressRange></div></div>
                </div>
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
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ImagesEditorDemo {
  private readonly model = signal({ body: '' });
  private readonly editorForm = form(this.model);

  /**
   * A pretend upload: reports progress for a second, then gives the image a
   * local address. A real one would send the file to your server.
   */
  private readonly upload: ScEditorUploadHandler = (
    file,
    { onProgress, signal },
  ) =>
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
}`;
}
