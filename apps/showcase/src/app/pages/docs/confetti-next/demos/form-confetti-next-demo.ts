import { Component, ViewEncapsulation, inject, signal } from '@angular/core';
import { FormField, FormRoot, form, required } from '@angular/forms/signals';
import {
  ScButton,
  ScField,
  ScFieldErrors,
  ScInput,
  ScLabel,
} from '@semantic-components/ui';
import { ScConfetti } from '@semantic-components/ui-lab/confetti';

/** The service, from code: when the form is sent, sides() — and your words for screen readers. */
@Component({
  selector: 'app-form-confetti-next-demo',
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
    <form [formRoot]="signupForm" class="grid w-full max-w-sm gap-4">
      <div scField>
        <label scLabel>Your name</label>
        <input scInput [formField]="signupForm.name" />
        <div scFieldErrors></div>
      </div>
      <button scButton type="submit">Join</button>
      <p class="text-sm" role="status">
        @if (joined()) {
          Welcome aboard, {{ joined() }}!
        }
      </p>
    </form>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class FormConfettiNextDemo {
  private readonly confetti = inject(ScConfetti);
  readonly model = signal({ name: '' });
  readonly joined = signal('');
  readonly signupForm = form(
    this.model,
    (s) => required(s.name, { message: 'Your name, please.' }),
    {
      submission: {
        action: async () => {
          this.joined.set(this.model().name);
          await this.confetti.sides();
        },
      },
    },
  );
}
