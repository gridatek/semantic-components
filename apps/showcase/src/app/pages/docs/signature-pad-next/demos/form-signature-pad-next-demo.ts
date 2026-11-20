import { Component, ViewEncapsulation, computed, signal } from '@angular/core';
import { FormField, FormRoot, form, required } from '@angular/forms/signals';
import {
  ScButton,
  ScField,
  ScFieldErrors,
  ScInput,
  ScLabel,
  type ScSignatureNext,
  ScSignaturePadNext,
  signatureToSvg,
} from '@semantic-components/ui';

/**
 * A `[formField]`: `required()` in the schema. Left unsigned, the field
 * shows its error and the pad is marked invalid; signed, the signature is
 * shown back, as exported.
 */
@Component({
  selector: 'app-form-signature-pad-next-demo',
  imports: [
    ScSignaturePadNext,
    ScField,
    ScLabel,
    ScInput,
    ScFieldErrors,
    ScButton,
    FormField,
    FormRoot,
  ],
  template: `
    <form [formRoot]="signForm" class="w-full max-w-md space-y-4">
      <div scField>
        <label scLabel for="next-signer-name">Full name</label>
        <input id="next-signer-name" scInput [formField]="signForm.name" />
        <p scFieldErrors></p>
      </div>
      <div scField>
        <p id="next-signature-label" class="text-sm font-medium">Signature</p>
        <div
          scSignaturePadNext
          #pad="scSignaturePadNext"
          [formField]="signForm.signature"
          aria-labelledby="next-signature-label"
        ></div>
        <p scFieldErrors></p>
      </div>
      <div class="flex gap-2">
        <button scButton type="submit">Sign</button>
        <button
          scButton
          variant="outline"
          type="button"
          [disabled]="pad.empty()"
          (click)="pad.clear()"
        >
          Clear
        </button>
      </div>
      @if (signed(); as signed) {
        <div role="status" class="space-y-2">
          <p class="text-muted-foreground text-sm">
            Signed by {{ model().name }}:
          </p>
          <img [src]="signed" alt="The signature" class="max-h-20" />
        </div>
      }
    </form>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class FormSignaturePadNextDemo {
  private readonly model = signal<{
    name: string;
    signature: ScSignatureNext | null;
  }>({ name: '', signature: null });

  /** What was sent, drawn as exported. */
  private readonly sent = signal<ScSignatureNext | null>(null);

  private readonly signed = computed(() => {
    const sent = this.sent();
    return sent
      ? `data:image/svg+xml,${encodeURIComponent(signatureToSvg(sent))}`
      : null;
  });

  private readonly signForm = form(
    this.model,
    (path) => {
      required(path.name, { message: 'Enter your name.' });
      required(path.signature, { message: 'Sign above.' });
    },
    {
      submission: {
        action: async () => this.sent.set(this.model().signature),
      },
    },
  );
}
