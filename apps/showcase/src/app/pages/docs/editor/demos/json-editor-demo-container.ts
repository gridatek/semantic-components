import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { JsonEditorDemo } from './json-editor-demo';

@Component({
  selector: 'app-json-editor-demo-container',
  imports: [DemoContainer, JsonEditorDemo],
  template: `
    <app-demo-container
      title="JSON"
      demoUrl="/demos/editor/json-editor-demo"
      [code]="code"
    >
      <app-json-editor-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class JsonEditorDemoContainer {
  readonly code = `import { JsonPipe } from '@angular/common';
import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form, required } from '@angular/forms/signals';
import {
  ScEditor,
  ScEditorBold,
  ScEditorBulletList,
  ScEditorContent,
  ScEditorItalic,
  ScEditorTaskList,
  ScEditorToolbar,
  ScEditorToolbarGroup,
  ScEditorView,
} from '@semantic-components/editor';
import { ScButton } from '@semantic-components/ui';
import {
  SiBoldIcon,
  SiItalicIcon,
  SiListIcon,
  SiListTodoIcon,
} from '@semantic-icons/lucide-icons';
import type { JSONContent } from '@tiptap/core';

const SAMPLE: JSONContent = {
  type: 'doc',
  content: [
    {
      type: 'heading',
      attrs: { level: 2 },
      content: [{ type: 'text', text: 'Stored as JSON' }],
    },
    {
      type: 'paragraph',
      content: [
        { type: 'text', text: 'The same document, as ' },
        { type: 'text', marks: [{ type: 'bold' }], text: 'Tiptap’s JSON' },
        { type: 'text', text: ' instead of HTML.' },
      ],
    },
    {
      type: 'taskList',
      content: [
        {
          type: 'taskItem',
          attrs: { checked: true },
          content: [
            {
              type: 'paragraph',
              content: [{ type: 'text', text: 'Start from null' }],
            },
          ],
        },
        {
          type: 'taskItem',
          attrs: { checked: false },
          content: [
            {
              type: 'paragraph',
              content: [{ type: 'text', text: 'Get JSON back' }],
            },
          ],
        },
      ],
    },
  ],
};

/**
 * The value in Tiptap's JSON: the form starts with \`null\` (or a JSON
 * document), so the editor gives JSON back — \`null\` when it's empty.
 * \`scEditorView\` displays it as it displays HTML.
 */
@Component({
  selector: 'app-json-editor-demo',
  imports: [
    FormField,
    JsonPipe,
    ScButton,
    ScEditor,
    ScEditorBold,
    ScEditorBulletList,
    ScEditorContent,
    ScEditorItalic,
    ScEditorTaskList,
    ScEditorToolbar,
    ScEditorToolbarGroup,
    ScEditorView,
    SiBoldIcon,
    SiItalicIcon,
    SiListIcon,
    SiListTodoIcon,
  ],
  template: \`
    <div class="w-full space-y-4">
      <div class="grid gap-6 lg:grid-cols-2">
        <div
          scEditor
          [formField]="noteForm.body"
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
              <button scEditorBulletList value="bullet-list">
                <svg siListIcon></svg>
                <span class="sr-only">Bullet list</span>
              </button>
              <button scEditorTaskList value="task-list">
                <svg siListTodoIcon></svg>
                <span class="sr-only">Task list</span>
              </button>
            </div>
          </div>
          <div
            scEditorContent
            ariaLabel="Note"
            placeholder="Write a note…"
            class="max-h-none"
          ></div>
        </div>

        <article
          [scEditorView]="noteForm.body().value()"
          aria-label="Saved note"
          class="rounded-lg border p-4 lg:mt-[49px]"
        ></article>
      </div>

      <div class="flex gap-2">
        <button scButton variant="outline" type="button" (click)="clear()">
          Clear
        </button>
        <button scButton type="button" (click)="load()">Load sample</button>
      </div>

      <div class="bg-muted rounded-md p-4">
        <p class="text-sm font-medium">
          Value ({{ noteForm.body().valid() ? 'valid' : 'empty' }})
        </p>
        <pre
          class="text-muted-foreground mt-2 max-h-64 overflow-auto text-xs"
          >{{ noteForm.body().value() | json }}</pre
        >
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class JsonEditorDemo {
  private readonly model = signal<{ body: JSONContent | null }>({
    body: null,
  });
  readonly noteForm = form(this.model, (path) => {
    required(path.body);
  });

  clear(): void {
    this.model.set({ body: null });
  }

  load(): void {
    this.model.set({ body: SAMPLE });
  }
}`;
}
