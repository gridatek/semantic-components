import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { TypeSignaturePadNextDemo } from './type-signature-pad-next-demo';

@Component({
  selector: 'app-type-signature-pad-next-demo-container',
  imports: [DemoContainer, TypeSignaturePadNextDemo],
  template: `
    <app-demo-container
      title="Type instead"
      [code]="code"
      demoUrl="/demos/signature-pad-next/type-signature-pad-next-demo"
    >
      <app-type-signature-pad-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class TypeSignaturePadNextDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, FormRoot, form, required } from '@angular/forms/signals';
import {
  ScButton,
  ScField,
  ScFieldDescription,
  ScFieldErrors,
  ScInput,
  ScLabel,
  type ScSignatureNext,
  ScSignaturePadNext,
} from '@semantic-components/ui';

/**
 * Drawing needs a pointer: the way to sign with a keyboard is yours, a
 * second field. The schema asks for one or the other.
 */
@Component({
  selector: 'app-type-signature-pad-next-demo',
  imports: [
    ScSignaturePadNext,
    ScField,
    ScLabel,
    ScInput,
    ScFieldDescription,
    ScFieldErrors,
    ScButton,
    FormField,
    FormRoot,
  ],
  template: \`
    <form [formRoot]="signForm" class="w-full max-w-md space-y-4">
      <div scField>
        <p id="drawn-label" class="text-sm font-medium">Draw your signature</p>
        <div
          scSignaturePadNext
          [formField]="signForm.drawn"
          aria-labelledby="drawn-label"
        ></div>
        <p scFieldErrors></p>
      </div>
      <div scField>
        <label scLabel for="typed-signature">Or type your full name</label>
        <input
          id="typed-signature"
          scInput
          class="font-serif italic"
          [formField]="signForm.typed"
        />
        <p scFieldDescription>Typing your name signs as drawing does.</p>
      </div>
      <button scButton type="submit">Sign</button>
      @if (sent()) {
        <p role="status" class="text-muted-foreground text-sm">
          Signed {{ sent() }}.
        </p>
      }
    </form>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class TypeSignaturePadNextDemo {
  private readonly model = signal<{
    drawn: ScSignatureNext | null;
    typed: string;
  }>({ drawn: null, typed: '' });

  private readonly sent = signal('');

  private readonly signForm = form(
    this.model,
    (path) => {
      // One or the other: drawn, unless a name is typed.
      required(path.drawn, {
        when: ({ valueOf }) => !valueOf(path.typed).trim(),
        message: 'Sign above, or type your name below.',
      });
    },
    {
      submission: {
        action: async () =>
          this.sent.set(
            this.model().drawn ? 'by hand' : \`as “\${this.model().typed}”\`,
          ),
      },
    },
  );
}`;
}
