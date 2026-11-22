import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { PreviewsFileInputDemo } from './previews-file-input-demo';

@Component({
  selector: 'app-previews-file-input-demo-container',
  imports: [DemoContainer, PreviewsFileInputDemo],
  template: `
    <app-demo-container
      title="Previews"
      [code]="code"
      demoUrl="/demos/file-input/previews-file-input-demo"
    >
      <app-previews-file-input-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class PreviewsFileInputDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScFileInput,
  ScFileInputDropzone,
  ScFileInputItem,
  ScFileInputItemPreview,
  ScFileInputItemRemove,
  ScFileInputList,
  ScFileInputTrigger,
} from '@semantic-components/ui';
import { SiImageIcon, SiXIcon } from '@semantic-icons/lucide-icons';

/** Images shown as you choose them: the preview part makes each thumbnail (and frees it when the file goes). */
@Component({
  selector: 'app-previews-file-input-demo',
  imports: [
    ScFileInput,
    ScFileInputDropzone,
    ScFileInputItem,
    ScFileInputItemPreview,
    ScFileInputItemRemove,
    ScFileInputList,
    ScFileInputTrigger,
    SiImageIcon,
    SiXIcon,
  ],
  template: \`
    <div
      scFileInput
      #files="scFileInput"
      multiple
      accept="image/*"
      class="w-full max-w-md"
    >
      <div scFileInputDropzone>
        <svg siImageIcon></svg>
        <p>Drop images here</p>
        <button scFileInputTrigger size="sm">Browse images</button>
      </div>
      <ul scFileInputList aria-label="Images" class="grid-cols-3">
        @for (file of files.value(); track file) {
          <li scFileInputItem [file]="file" class="relative flex-col p-1">
            <span scFileInputItemPreview class="aspect-square size-auto w-full">
              <svg siImageIcon></svg>
            </span>
            <span class="w-full truncate text-xs">{{ file.name }}</span>
            <button
              scFileInputItemRemove
              class="bg-background/80 absolute end-1 top-1"
            >
              <svg siXIcon></svg>
              <span class="sr-only">Remove {{ file.name }}</span>
            </button>
          </li>
        }
      </ul>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class PreviewsFileInputDemo {}`;
}
