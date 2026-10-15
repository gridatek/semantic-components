import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScCodeEditor,
  ScCodeEditorContent,
  ScCodeEditorCopyButton,
  ScCodeEditorHeader,
  ScCodeEditorLabel,
} from '@semantic-components/code';
import { SiCheckIcon, SiCopyIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-json-code-editor-demo',
  imports: [
    ScCodeEditor,
    ScCodeEditorHeader,
    ScCodeEditorLabel,
    ScCodeEditorContent,
    ScCodeEditorCopyButton,
    SiCheckIcon,
    SiCopyIcon,
  ],
  template: `
    <div scCodeEditor>
      <div scCodeEditorHeader>
        <div class="flex items-center gap-2">
          <span class="text-muted-foreground text-sm">config.json</span>
          <span scCodeEditorLabel>json</span>
        </div>
        <button
          scCodeEditorCopyButton
          #copy="scCodeEditorCopyButton"
          [code]="jsonCode"
        >
          @if (copy.copied()) {
            <svg siCheckIcon></svg>
          } @else {
            <svg siCopyIcon></svg>
          }

          <span class="sr-only">{{
            copy.copied() ? 'Copied' : 'Copy code'
          }}</span>
        </button>
      </div>
      <div
        scCodeEditorContent
        ariaLabel="Code editor"
        [(value)]="jsonCode"
        language="json"
        filename="config.json"
        class="max-h-[250px]"
      ></div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class JsonCodeEditorDemo {
  jsonCode = `{
  "name": "my-project",
  "version": "1.0.0",
  "scripts": {
    "start": "node server.js",
    "build": "webpack --mode production",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.18.0",
    "lodash": "^4.17.21"
  },
  "devDependencies": {
    "typescript": "^5.0.0"
  }
}`;
}
