import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SignalFormsEditorDemo } from './signal-forms-editor-demo';

@Component({
  selector: 'app-signal-forms-editor-demo-container',
  imports: [DemoContainer, SignalFormsEditorDemo],
  template: `
    <app-demo-container
      title="A post with validation"
      demoUrl="/demos/editor/signal-forms-editor-demo"
      [code]="code"
    >
      <app-signal-forms-editor-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class SignalFormsEditorDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, disabled, form, required } from '@angular/forms/signals';
import {
  ScButton,
  ScCheckbox,
  ScField,
  ScFieldDescription,
  ScFieldErrors,
  ScFrame,
  ScLabel,
  ScToggle,
  ScToolbar,
  ScToolbarWidget,
  ScToolbarWidgetGroup,
} from '@semantic-components/ui';
import {
  ScEditor,
  ScEditorCharCount,
  ScEditorCommand,
  ScEditorContent,
  ScEditorCount,
} from '@semantic-components/ui/editor';
import { SiBoldIcon, SiItalicIcon } from '@semantic-icons/lucide-icons';

interface PostModel {
  body: string;
  locked: boolean;
}

/**
 * \`[formField]\` on the editor: the value is its HTML, \`required\` checks it,
 * \`disabled\` follows the schema, and \`characterLimit\` stops the text at 280
 * characters (counted in the footer). Once left invalid,
 * \`scFieldErrors\` (inside the field) describes the document.
 */
@Component({
  selector: 'app-signal-forms-editor-demo',
  imports: [
    ScToolbar,
    ScToolbarWidget,
    ScToolbarWidgetGroup,
    ScToggle,
    ScFrame,
    FormField,
    ScButton,
    ScCheckbox,
    ScField,
    ScFieldDescription,
    ScFieldErrors,
    ScLabel,
    ScEditor,
    ScEditorCommand,
    ScEditorContent,
    ScEditorCharCount,
    ScEditorCount,
    SiBoldIcon,
    SiItalicIcon,
  ],
  template: \`
    <div class="w-full max-w-lg space-y-4">
      <div scField>
        <div
          scEditor
          [formField]="postForm.body"
          [characterLimit]="280"
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
          </div>
          <div
            scFrame
            scEditorContent
            ariaLabel="Post"
            placeholder="What's on your mind?"
          ></div>
          <div class="text-muted-foreground px-1 text-xs">
            <div scEditorCount>
              <span scEditorCharCount #count="scEditorCharCount">
                {{ count.charCount() }} / {{ count.limit() }}
              </span>
            </div>
          </div>
        </div>
        <p scFieldDescription>A post of up to 280 characters.</p>
        <p scFieldErrors></p>
      </div>

      <div scField orientation="horizontal">
        <input scCheckbox [formField]="postForm.locked" />
        <label scLabel>Lock the post</label>
      </div>

      <div class="flex gap-2">
        <button scButton variant="outline" type="button" (click)="reset()">
          Reset
        </button>
        <button scButton type="button" (click)="fill()">Fill</button>
      </div>

      <div scFrame class="bg-muted p-4">
        <p class="text-sm font-medium">Form state</p>
        <pre class="text-muted-foreground mt-2 text-xs whitespace-pre-wrap">{{
          formState()
        }}</pre>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SignalFormsEditorDemo {
  private readonly model = signal<PostModel>({ body: '', locked: false });

  readonly postForm = form(this.model, (path) => {
    required(path.body, { message: 'Write the post.' });
    disabled(path.body, ({ valueOf }) => valueOf(path.locked));
  });

  formState(): string {
    const body = this.postForm.body();
    return JSON.stringify(
      {
        value: body.value(),
        valid: body.valid(),
        touched: body.touched(),
        disabled: body.disabled(),
      },
      null,
      2,
    );
  }

  reset(): void {
    this.model.set({ body: '', locked: false });
    this.postForm().reset();
  }

  fill(): void {
    this.model.update((m) => ({
      ...m,
      body: '<p>Hello, <strong>world</strong></p>',
    }));
  }
}`;
}
