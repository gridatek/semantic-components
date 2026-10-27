import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, disabled, form, required } from '@angular/forms/signals';
import {
  ScButton,
  ScCheckbox,
  ScCheckboxField,
  ScField,
  ScFieldDescription,
  ScFieldErrors,
  ScLabel,
} from '@semantic-components/ui';
import {
  ScEditor,
  ScEditorBold,
  ScEditorCharCount,
  ScEditorContent,
  ScEditorCount,
  ScEditorFooter,
  ScEditorItalic,
  ScEditorToolbar,
  ScEditorToolbarGroup,
} from '@semantic-components/ui/editor';
import { SiBoldIcon, SiItalicIcon } from '@semantic-icons/lucide-icons';

interface PostModel {
  body: string;
  locked: boolean;
}

/**
 * `[formField]` on the editor: the value is its HTML, `required` checks it,
 * `disabled` follows the schema, and `characterLimit` stops the text at 280
 * characters (counted in the footer). Once left invalid,
 * `scFieldErrors` (inside the field) describes the document.
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
    ScEditorCharCount,
    ScEditorCount,
    ScEditorFooter,
    SiBoldIcon,
    SiItalicIcon,
  ],
  template: `
    <div class="w-full max-w-lg space-y-4">
      <div scField>
        <div
          scEditor
          [formField]="postForm.body"
          [characterLimit]="280"
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
          <div scEditorFooter>
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
  `,
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
}
