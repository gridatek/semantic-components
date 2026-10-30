import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScInputGroup,
  ScInputGroupAddon,
  ScInputGroupButton,
  ScInputGroupText,
  ScTextarea,
} from '@semantic-components/ui';
import {
  SiCopyIcon,
  SiCornerDownLeftIcon,
  SiFileCodeIcon,
  SiRefreshCwIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-textarea-input-group-demo',
  imports: [
    ScInputGroup,
    ScInputGroupAddon,
    ScInputGroupButton,
    ScInputGroupText,
    ScTextarea,
    SiCopyIcon,
    SiCornerDownLeftIcon,
    SiFileCodeIcon,
    SiRefreshCwIcon,
  ],
  template: `
    <div scInputGroup class="max-w-md">
      <textarea
        scTextarea
        placeholder="console.log('Hello, world!');"
        aria-label="Code"
        class="min-h-[200px] font-mono"
      ></textarea>
      <div scInputGroupAddon align="block-end" class="border-t">
        <span scInputGroupText>Line 1, Column 1</span>
        <button scInputGroupButton variant="default" size="sm" class="ms-auto">
          Run
          <svg siCornerDownLeftIcon></svg>
        </button>
      </div>
      <div scInputGroupAddon align="block-start" class="border-b">
        <span scInputGroupText class="font-mono font-medium">
          <svg siFileCodeIcon></svg>
          script.js
        </span>
        <button scInputGroupButton size="icon-xs" class="ms-auto">
          <svg siRefreshCwIcon></svg>
          <span class="sr-only">Refresh</span>
        </button>
        <button scInputGroupButton size="icon-xs">
          <svg siCopyIcon></svg>
          <span class="sr-only">Copy</span>
        </button>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class TextareaInputGroupDemo {}
