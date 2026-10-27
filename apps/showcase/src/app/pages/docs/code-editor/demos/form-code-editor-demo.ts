import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, FormRoot, form, required } from '@angular/forms/signals';
import {
  ScButton,
  ScField,
  ScFieldDescription,
  ScFieldErrors,
  ScLabel,
} from '@semantic-components/ui';
import { ScCodeBlock } from '@semantic-components/ui/code-block';
import { ScCodeEditor } from '@semantic-components/ui/code-editor';

/** A [formField] (a string): named by the field’s label, required from the schema, marked once left. */
@Component({
  selector: 'app-form-code-editor-demo',
  imports: [
    FormField,
    FormRoot,
    ScCodeBlock,
    ScCodeEditor,
    ScField,
    ScLabel,
    ScFieldDescription,
    ScFieldErrors,
    ScButton,
  ],
  template: `
    <form [formRoot]="queryForm" class="grid gap-3">
      <div scField>
        <label scLabel>Query</label>
        <div scCodeBlock>
          <div
            scCodeEditor
            language="sql"
            placeholder="SELECT …"
            class="h-32"
            [formField]="queryForm.sql"
          ></div>
        </div>
        <p scFieldDescription>Escape, then Tab, moves on.</p>
        <div scFieldErrors></div>
      </div>
      <button scButton type="submit" class="justify-self-start">Run</button>
      @if (ran()) {
        <p class="text-sm" role="status">Ran {{ ran() }} lines.</p>
      }
    </form>
  `,
  host: { class: 'block w-full max-w-2xl' },
  encapsulation: ViewEncapsulation.None,
})
export class FormCodeEditorDemo {
  readonly model = signal({ sql: '' });
  readonly ran = signal(0);
  readonly queryForm = form(
    this.model,
    (s) => required(s.sql, { message: 'Write a query.' }),
    {
      submission: {
        action: async () => this.ran.set(this.model().sql.split('\n').length),
      },
    },
  );
}
