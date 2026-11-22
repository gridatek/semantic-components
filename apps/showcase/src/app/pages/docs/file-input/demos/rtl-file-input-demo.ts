import { Dir } from '@angular/cdk/bidi';
import { Component, LOCALE_ID, ViewEncapsulation } from '@angular/core';
import {
  ScFileInput,
  ScFileInputDropzone,
  ScFileInputItem,
  ScFileInputItemPreview,
  ScFileInputItemRemove,
  ScFileInputItemSize,
  ScFileInputList,
  ScFileInputTrigger,
} from '@semantic-components/ui';
import {
  SiFileIcon,
  SiUploadIcon,
  SiXIcon,
} from '@semantic-icons/lucide-icons';

/** In a right-to-left page: the list, its sizes in the locale, the remove buttons at the end. */
@Component({
  selector: 'app-rtl-file-input-demo',
  imports: [
    Dir,
    ScFileInput,
    ScFileInputDropzone,
    ScFileInputItem,
    ScFileInputItemPreview,
    ScFileInputItemRemove,
    ScFileInputItemSize,
    ScFileInputList,
    ScFileInputTrigger,
    SiFileIcon,
    SiUploadIcon,
    SiXIcon,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'ar' }],
  template: `
    <div dir="rtl" lang="ar" class="w-full max-w-md">
      <div scFileInput #files="scFileInput" multiple>
        <div scFileInputDropzone>
          <svg siUploadIcon></svg>
          <p>أفلت الملفات هنا</p>
          <button scFileInputTrigger size="sm">تصفح الملفات</button>
        </div>
        <ul scFileInputList aria-label="الملفات المختارة">
          @for (file of files.value(); track file) {
            <li scFileInputItem [file]="file">
              <span scFileInputItemPreview><svg siFileIcon></svg></span>
              <span class="min-w-0 flex-1 truncate">{{ file.name }}</span>
              <span scFileInputItemSize></span>
              <button scFileInputItemRemove>
                <svg siXIcon></svg>
                <span class="sr-only">إزالة {{ file.name }}</span>
              </button>
            </li>
          }
        </ul>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlFileInputDemo {}
