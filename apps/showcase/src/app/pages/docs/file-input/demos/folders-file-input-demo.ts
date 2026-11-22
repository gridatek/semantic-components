import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScFileInput,
  ScFileInputDropzone,
  ScFileInputItem,
  ScFileInputItemPreview,
  ScFileInputItemRemove,
  ScFileInputItemSize,
  ScFileInputList,
  ScFileInputTrigger,
  fileRelativePath,
} from '@semantic-components/ui';
import {
  SiFileIcon,
  SiFolderIcon,
  SiXIcon,
} from '@semantic-icons/lucide-icons';

/** directory: a folder picked — or dropped, read through — each file with its path (fileRelativePath). */
@Component({
  selector: 'app-folders-file-input-demo',
  imports: [
    ScFileInput,
    ScFileInputDropzone,
    ScFileInputItem,
    ScFileInputItemPreview,
    ScFileInputItemRemove,
    ScFileInputItemSize,
    ScFileInputList,
    ScFileInputTrigger,
    SiFileIcon,
    SiFolderIcon,
    SiXIcon,
  ],
  template: `
    <div scFileInput #files="scFileInput" directory class="w-full max-w-md">
      <div scFileInputDropzone>
        <svg siFolderIcon></svg>
        <p>Drop a folder here</p>
        <button scFileInputTrigger size="sm">Choose a folder</button>
      </div>
      <ul scFileInputList aria-label="Folder files">
        @for (file of files.value(); track file) {
          <li scFileInputItem [file]="file">
            <span scFileInputItemPreview><svg siFileIcon></svg></span>
            <span class="min-w-0 flex-1 truncate">{{ path(file) }}</span>
            <span scFileInputItemSize></span>
            <button scFileInputItemRemove>
              <svg siXIcon></svg>
              <span class="sr-only">Remove {{ file.name }}</span>
            </button>
          </li>
        }
      </ul>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class FoldersFileInputDemo {
  private readonly path = fileRelativePath;
}
