import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import {
  ScFileUpload,
  ScFileUploadDropzone,
  ScFileUploadFile,
  ScFileUploadItem,
  ScFileUploadItemDelete,
  ScFileUploadItemName,
  ScFileUploadItemPreview,
  ScFileUploadItemSize,
  ScFileUploadList,
} from '@semantic-components/ui';
import { SiImageIcon, SiXIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-image-file-upload-demo',
  imports: [
    ScFileUpload,
    ScFileUploadDropzone,
    ScFileUploadList,
    ScFileUploadItem,
    ScFileUploadItemPreview,
    ScFileUploadItemName,
    ScFileUploadItemSize,
    ScFileUploadItemDelete,
    SiImageIcon,
    SiXIcon,
  ],
  template: `
    <div class="max-w-lg">
      <div
        scFileUpload
        [multiple]="true"
        accept="image/*"
        [maxSize]="5242880"
        [(files)]="files"
        (error)="onError($event)"
      >
        <div scFileUploadDropzone class="p-8">
          <div class="flex flex-col items-center gap-2 text-center">
            <svg siImageIcon class="text-muted-foreground size-10"></svg>
            <div class="space-y-1">
              <p class="text-sm font-medium">Upload images</p>
              <p class="text-muted-foreground text-xs">PNG, JPG up to 5MB</p>
            </div>
          </div>
        </div>

        @if (files().length > 0) {
          <div scFileUploadList>
            @for (file of files(); track file.id) {
              <div scFileUploadItem [file]="file">
                <div
                  scFileUploadItemPreview
                  [file]="file"
                  class="size-12 rounded-md"
                ></div>
                <div class="min-w-0 flex-1">
                  <div scFileUploadItemName>{{ file.file.name }}</div>
                  <div scFileUploadItemSize [file]="file"></div>
                </div>
                <button scFileUploadItemDelete [fileId]="file.id">
                  <svg siXIcon></svg>
                  <span class="sr-only">Remove file</span>
                </button>
              </div>
            }
          </div>
        }
      </div>
      @if (errorMessage()) {
        <div class="text-destructive mt-2 text-sm">{{ errorMessage() }}</div>
      }
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageFileUploadDemo {
  readonly files = signal<ScFileUploadFile[]>([]);
  readonly errorMessage = signal<string>('');

  onError(message: string): void {
    this.errorMessage.set(message);
    setTimeout(() => this.errorMessage.set(''), 3000);
  }
}
