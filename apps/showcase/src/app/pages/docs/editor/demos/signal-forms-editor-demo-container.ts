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
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  FormField,
  disabled,
  form,
  maxLength,
  required,
} from '@angular/forms/signals';
import {
  ScEditor,
  ScEditorBold,
  ScEditorContent,
  ScEditorItalic,
  ScEditorToolbar,
  ScEditorToolbarGroup,
} from '@semantic-components/editor';
import {
  ScButton,
  ScCheckbox,
  ScCheckboxField,
  ScField,
  ScFieldDescription,
  ScFieldErrors,
  ScLabel,
} from '@semantic-components/ui';
import { SiBoldIcon, SiItalicIcon } from '@semantic-icons/lucide-icons';

interface PostModel {
  body: string;
  locked: boolean;
}

/**
 * \`[formField]\` on the editor: the value is its HTML, \`required\` and
 * \`maxLength\` check it, \`disabled\` follows the schema. Once left invalid,
 * \`scFieldErrors\` (inside the field) describes the document.
 */
@Component({
  selector: 'app-signal-forms-editor-demo',
  imports: [
    FormField,
    ScButton,
    ScCheckbox,
    ScCheckboxField,
    ScField,
    ScFieldDescription,
    ScFieldErrors,
    ScLabel,
    ScEditor,
    ScEditorBold,
    ScEditorContent,
    ScEditorItalic,
    ScEditorToolbar,
    ScEditorToolbarGroup,
    SiBoldIcon,
    SiItalicIcon,
  ],
  template: \`
    <div class="w-full max-w-lg space-y-4">
      <div scField>
        <div
          scEditor
          [formField]="postForm.body"
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
            </div>
          </div>
          <div
            scEditorContent
            ariaLabel="Post"
            placeholder="What's on your mind?"
          ></div>
        </div>
        <p scFieldDescription>A post of up to 200 characters of HTML.</p>
        <p scFieldErrors></p>
      </div>

      <div scCheckboxField>
        <input type="checkbox" scCheckbox [formField]="postForm.locked" />
        <label scLabel>Lock the post</label>
      </div>

      <div class="flex gap-2">
        <button scButton variant="outline" type="button" (click)="reset()">
          Reset
        </button>
        <button scButton type="button" (click)="fill()">Fill</button>
      </div>

      <div class="bg-muted rounded-md p-4">
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
    maxLength(path.body, 200, { message: 'Keep it under 200 characters.' });
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
