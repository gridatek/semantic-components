import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { FormDateInputDemo } from './form-date-input-demo';

@Component({
  selector: 'app-form-date-input-demo-container',
  imports: [DemoContainer, FormDateInputDemo],
  template: `
    <app-demo-container
      title="In a form"
      [code]="code"
      demoUrl="/demos/date-input/form-date-input-demo"
    >
      <app-form-date-input-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class FormDateInputDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, FormRoot, form, required } from '@angular/forms/signals';
import {
  ScButton,
  ScDateInput,
  ScField,
  ScFieldErrors,
  ScLabel,
} from '@semantic-components/ui';

/** A [formField]: required, from the schema; marked once left. */
@Component({
  selector: 'app-form-date-input-demo',
  imports: [
    FormField,
    FormRoot,
    ScDateInput,
    ScField,
    ScFieldErrors,
    ScLabel,
    ScButton,
  ],
  template: \`
    <form [formRoot]="signupForm" class="grid w-48 gap-3">
      <div scField>
        <label scLabel>Date of birth</label>
        <input
          scDateInput
          placeholder="MM/DD/YYYY"
          [formField]="signupForm.birth"
        />
        <div scFieldErrors></div>
      </div>
      <button scButton type="submit" class="justify-self-start">Sign up</button>
      @if (born()) {
        <p class="text-sm" role="status">Born on {{ born() }}.</p>
      }
    </form>
  \`,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class FormDateInputDemo {
  readonly model = signal<{ birth: Temporal.PlainDate | null }>({
    birth: null,
  });
  readonly born = signal('');
  readonly signupForm = form(
    this.model,
    (s) => required(s.birth, { message: 'Enter your date of birth.' }),
    {
      submission: {
        action: async () => this.born.set(this.model().birth?.toString() ?? ''),
      },
    },
  );
}`;
}
