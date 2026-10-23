import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { FormSignaturePadDemo } from './form-signature-pad-demo';

@Component({
  selector: 'app-form-signature-pad-demo-container',
  imports: [DemoContainer, FormSignaturePadDemo],
  template: `
    <app-demo-container
      title="Form"
      [code]="code"
      demoUrl="/demos/signature-pad/form-signature-pad-demo"
    >
      <app-form-signature-pad-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class FormSignaturePadDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, FormRoot, form, required } from '@angular/forms/signals';
import { ScButton, ScField, ScFieldErrors, ScInput, ScLabel, type ScSignature, ScSignaturePad, ScSignaturePadClear, ScSignaturePadLine, ScSignaturePadSurface } from '@semantic-components/ui';

/** A \`[formField]\`: \`required()\` in the schema; left unsigned, the field shows its error. */
@Component({
  selector: 'app-form-signature-pad-demo',
  imports: [
    ScSignaturePad,
    ScSignaturePadSurface,
    ScSignaturePadLine,
    ScSignaturePadClear,
    ScField,
    ScLabel,
    ScInput,
    ScFieldErrors,
    ScButton,
    FormField,
    FormRoot,
  ],
  template: \`
    <form [formRoot]="signForm" class="w-full max-w-md space-y-4">
      <div scField>
        <label scLabel for="signer-name">Full name</label>
        <input id="signer-name" scInput [formField]="signForm.name" />
        <p scFieldErrors></p>
      </div>
      <div scField>
        <p id="signature-label" class="text-sm font-medium">Signature</p>
        <div scSignaturePad [formField]="signForm.signature" class="space-y-2">
          <div scSignaturePadSurface aria-labelledby="signature-label">
            <div scSignaturePadLine>× Sign here</div>
          </div>
          <button scSignaturePadClear size="sm">Clear</button>
        </div>
        <p scFieldErrors></p>
      </div>
      <div class="flex gap-2">
        <button scButton type="submit">Sign</button>
      </div>
      @if (sent()) {
        <p class="text-muted-foreground text-sm" role="status">
          Signed by {{ model().name }}.
        </p>
      }
    </form>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class FormSignaturePadDemo {
  readonly model = signal<{ name: string; signature: ScSignature | null }>({
    name: '',
    signature: null,
  });
  readonly sent = signal(false);
  readonly signForm = form(
    this.model,
    (path) => {
      required(path.name, { message: 'Enter your name.' });
      required(path.signature, { message: 'Sign above.' });
    },
    { submission: { action: async () => this.sent.set(true) } },
  );
}`;
}
