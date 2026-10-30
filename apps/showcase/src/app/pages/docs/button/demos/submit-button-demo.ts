import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, FormRoot, form, required } from '@angular/forms/signals';
import {
  ScButton,
  ScField,
  ScFieldErrors,
  ScInput,
  ScLabel,
} from '@semantic-components/ui';

/** In a form: a button doesn't submit it (type "button"); a submit button does. */
@Component({
  selector: 'app-submit-button-demo',
  imports: [
    FormField,
    FormRoot,
    ScButton,
    ScField,
    ScFieldErrors,
    ScInput,
    ScLabel,
  ],
  template: `
    <form [formRoot]="profileForm" class="grid w-full max-w-xs gap-3">
      <div scField>
        <label scLabel>Name</label>
        <input scInput [formField]="profileForm.name" />
        <div scFieldErrors></div>
      </div>
      <div class="flex gap-2">
        <button scButton variant="outline" (click)="cancel()">Cancel</button>
        <button scButton type="submit">Save</button>
      </div>
      @if (status()) {
        <p class="text-muted-foreground text-sm" role="status">
          {{ status() }}
        </p>
      }
    </form>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SubmitButtonDemo {
  readonly model = signal({ name: '' });
  readonly status = signal('');
  readonly profileForm = form(
    this.model,
    (s) => required(s.name, { message: 'Enter a name.' }),
    {
      submission: {
        action: async () => {
          this.status.set(`Saved: ${this.model().name}`);
        },
      },
    },
  );

  /** A plain button: it resets, and the form isn't submitted. */
  cancel(): void {
    this.model.set({ name: '' });
    this.profileForm().reset();
    this.status.set('Cancelled');
  }
}
