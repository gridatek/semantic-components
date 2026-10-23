import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { FormConfettiDemo } from './form-confetti-demo';

@Component({
  selector: 'app-form-confetti-demo-container',
  imports: [DemoContainer, FormConfettiDemo],
  template: `
    <app-demo-container
      title="After a form"
      [code]="code"
      demoUrl="/demos/confetti/form-confetti-demo"
    >
      <app-form-confetti-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class FormConfettiDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, inject, signal } from '@angular/core';
import { FormField, FormRoot, form, required } from '@angular/forms/signals';
import {
  ScButton,
  ScField,
  ScFieldErrors,
  ScInput,
  ScLabel,
} from '@semantic-components/ui';
import { ScConfetti } from '@semantic-components/ui/confetti';

/** The service, from code: when the form is sent, sides() — and your words for screen readers. */
@Component({
  selector: 'app-form-confetti-demo',
  imports: [
    FormField,
    FormRoot,
    ScButton,
    ScField,
    ScFieldErrors,
    ScInput,
    ScLabel,
  ],
  template: \`
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
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class FormConfettiDemo {
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
}`;
}
