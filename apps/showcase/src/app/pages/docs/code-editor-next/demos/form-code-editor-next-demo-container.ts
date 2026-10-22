import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { FormCodeEditorNextDemo } from './form-code-editor-next-demo';

@Component({
  selector: 'app-form-code-editor-next-demo-container',
  imports: [DemoContainer, FormCodeEditorNextDemo],
  template: `
    <app-demo-container
      title="In a form"
      [code]="code"
      demoUrl="/demos/code-editor-next/form-code-editor-next-demo"
    >
      <app-form-code-editor-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class FormCodeEditorNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, FormRoot, form, required } from '@angular/forms/signals';
import { ScCodeBlock, ScCodeEditorNext } from '@semantic-components/code';
import {
  ScButton,
  ScField,
  ScFieldDescription,
  ScFieldErrors,
  ScLabel,
} from '@semantic-components/ui';

/** A [formField] (a string): named by the field’s label, required from the schema, marked once left. */
@Component({
  selector: 'app-form-code-editor-next-demo',
  imports: [
    FormField,
    FormRoot,
    ScCodeBlock,
    ScCodeEditorNext,
    ScField,
    ScLabel,
    ScFieldDescription,
    ScFieldErrors,
    ScButton,
  ],
  template: \`
    <form [formRoot]="queryForm" class="grid gap-3">
      <div scField>
        <label scLabel>Query</label>
        <div scCodeBlock>
          <div
            scCodeEditorNext
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
  \`,
  host: { class: 'block w-full max-w-2xl' },
  encapsulation: ViewEncapsulation.None,
})
export class FormCodeEditorNextDemo {
  readonly model = signal({ sql: '' });
  readonly ran = signal(0);
  readonly queryForm = form(
    this.model,
    (s) => required(s.sql, { message: 'Write a query.' }),
    {
      submission: {
        action: async () => this.ran.set(this.model().sql.split('\\n').length),
      },
    },
  );
}`;
}
