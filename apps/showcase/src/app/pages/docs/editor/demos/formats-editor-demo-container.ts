import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { FormatsEditorDemo } from './formats-editor-demo';

@Component({
  selector: 'app-formats-editor-demo-container',
  imports: [DemoContainer, FormatsEditorDemo],
  template: `
    <app-demo-container
      title="A note in three formats"
      demoUrl="/demos/editor/formats-editor-demo"
      [code]="code"
    >
      <app-formats-editor-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class FormatsEditorDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, computed, signal } from '@angular/core';
import { FormField, form, required } from '@angular/forms/signals';
import {
  ScEditor,
  ScEditorBold,
  ScEditorBulletList,
  ScEditorContent,
  type ScEditorFormat,
  ScEditorItalic,
  ScEditorTaskList,
  ScEditorToolbar,
  ScEditorToolbarGroup,
  type ScEditorValue,
  ScEditorView,
  provideEditor,
} from '@semantic-components/editor';
import { withMarkdown } from '@semantic-components/editor/markdown';
import {
  ScButton,
  ScToggleGroup,
  ScToggleGroupItem,
} from '@semantic-components/ui';
import {
  SiBoldIcon,
  SiItalicIcon,
  SiListIcon,
  SiListTodoIcon,
} from '@semantic-icons/lucide-icons';

const FORMATS: ScEditorFormat[] = ['html', 'json', 'markdown', 'text'];

/** The same note in each format. */
const SAMPLES: Record<ScEditorFormat, ScEditorValue> = {
  html: '<h2>Formats</h2><p>The same note as <strong>HTML</strong>.</p><ul data-type="taskList"><li data-type="taskItem" data-checked="true"><p>Pick a format</p></li></ul>',
  json: {
    type: 'doc',
    content: [
      {
        type: 'heading',
        attrs: { level: 2 },
        content: [{ type: 'text', text: 'Formats' }],
      },
      {
        type: 'paragraph',
        content: [
          { type: 'text', text: 'The same note as ' },
          { type: 'text', marks: [{ type: 'bold' }], text: 'JSON' },
          { type: 'text', text: '.' },
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
                content: [{ type: 'text', text: 'Pick a format' }],
              },
            ],
          },
        ],
      },
    ],
  },
  markdown:
    '## Formats\\n\\nThe same note as **Markdown**.\\n\\n- [x] Pick a format',
  text: 'Formats\\nThe same note as plain text.\\nPick a format',
};

/**
 * \`format\` picks what the form holds: HTML, Tiptap's JSON, Markdown or plain
 * text.
 * Switching it rewrites the value in the new format; \`scEditorView\` shows
 * any of them, given the same format.
 */
@Component({
  selector: 'app-formats-editor-demo',
  providers: [provideEditor(withMarkdown())],
  imports: [
    FormField,
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
    ScToggleGroup,
    ScToggleGroupItem,
    SiBoldIcon,
    SiItalicIcon,
    SiListIcon,
    SiListTodoIcon,
  ],
  template: \`
    <div class="w-full space-y-4">
      <div class="flex flex-wrap items-center gap-2">
        <div
          scToggleGroup
          type="single"
          variant="outline"
          aria-label="Format"
          [value]="format()"
          (valueChange)="setFormat($event)"
        >
          @for (f of formats; track f) {
            <button scToggleGroupItem [value]="f">
              {{ formatLabels[f] }}
            </button>
          }
        </div>
        <button scButton variant="outline" type="button" (click)="clear()">
          Clear
        </button>
        <button scButton type="button" (click)="load()">Load sample</button>
      </div>

      <div class="grid gap-6 lg:grid-cols-2">
        <div
          scEditor
          [formField]="noteForm.body"
          [format]="format()"
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
          [format]="format()"
          aria-label="Saved note"
          class="rounded-lg border p-4 lg:mt-[49px]"
        ></article>
      </div>

      <div class="bg-muted rounded-md p-4">
        <p class="text-sm font-medium">
          {{ formatLabels[format()] }} value ({{
            noteForm.body().valid() ? 'valid' : 'empty'
          }})
        </p>
        <pre
          tabindex="0"
          class="text-muted-foreground mt-2 max-h-64 overflow-auto text-xs whitespace-pre-wrap"
          >{{ shownValue() }}</pre>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class FormatsEditorDemo {
  readonly formats = FORMATS;
  readonly formatLabels: Record<ScEditorFormat, string> = {
    html: 'HTML',
    json: 'JSON',
    markdown: 'Markdown',
    text: 'Text',
  };

  readonly format = signal<ScEditorFormat>('json');

  private readonly model = signal<{ body: ScEditorValue }>({ body: null });
  readonly noteForm = form(this.model, (path) => {
    required(path.body);
  });

  /** The value as it is stored: a string as it is, JSON written out. */
  readonly shownValue = computed(() => {
    const value = this.noteForm.body().value();
    return typeof value === 'string'
      ? JSON.stringify(value)
      : JSON.stringify(value, null, 2);
  });

  setFormat(value: string | string[] | null): void {
    if (typeof value === 'string') this.format.set(value as ScEditorFormat);
  }

  clear(): void {
    this.model.set({ body: this.format() === 'json' ? null : '' });
  }

  load(): void {
    this.model.set({ body: SAMPLES[this.format()] });
  }
}`;
}
