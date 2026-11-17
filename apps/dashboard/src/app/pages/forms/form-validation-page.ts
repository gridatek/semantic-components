import { Component, ViewEncapsulation, inject, signal } from '@angular/core';
import {
  FormField,
  FormRoot,
  email,
  form,
  max,
  min,
  minLength,
  pattern,
  required,
  submit,
  validate,
} from '@angular/forms/signals';
import {
  ScButton,
  ScCard,
  ScCardBody,
  ScCardDescription,
  ScCardFooter,
  ScCardHeader,
  ScCardTitle,
  ScCheckbox,
  ScField,
  ScFieldDescription,
  ScFieldErrors,
  ScFieldGroup,
  ScInput,
  ScLabel,
  ScToaster,
} from '@semantic-components/ui';
import { PageHeader } from '../../layout/page-header';

const EMPTY = {
  username: '',
  email: '',
  age: 18,
  website: '',
  password: '',
  confirm: '',
  terms: false,
};

/** Form Validation (Pro): each rule, its message under the field, shown once touched or sent. */
@Component({
  selector: 'app-form-validation-page',
  imports: [
    FormField,
    FormRoot,
    ScButton,
    ScCard,
    ScCardBody,
    ScCardDescription,
    ScCardFooter,
    ScCardHeader,
    ScCardTitle,
    ScCheckbox,
    ScField,
    ScFieldDescription,
    ScFieldErrors,
    ScFieldGroup,
    ScInput,
    ScLabel,
    PageHeader,
  ],
  template: `
    <app-page-header
      title="Form Validation"
      [trail]="[{ label: 'Forms' }, { label: 'Validation' }]"
    />

    <form
      [formRoot]="signupForm"
      class="mx-auto w-full max-w-2xl"
      (submit)="send($event)"
    >
      <div scCard>
        <div scCardHeader>
          <h2 scCardTitle>Create an account</h2>
          <p scCardDescription>
            Every field has a rule; send the form empty to see them all.
          </p>
        </div>
        <div scCardBody>
          <div scFieldGroup class="grid gap-4 md:grid-cols-2">
            <div scField>
              <label scLabel>Username</label>
              <input
                scInput
                autocomplete="username"
                [formField]="signupForm.username"
              />
              <p scFieldDescription>
                3 or more letters, numbers or underscores.
              </p>
              <div scFieldErrors></div>
            </div>
            <div scField>
              <label scLabel>Email</label>
              <input
                scInput
                type="email"
                autocomplete="email"
                [formField]="signupForm.email"
              />
              <div scFieldErrors></div>
            </div>
            <div scField>
              <label scLabel>Age</label>
              <input scInput type="number" [formField]="signupForm.age" />
              <p scFieldDescription>From 18 to 120.</p>
              <div scFieldErrors></div>
            </div>
            <div scField>
              <label scLabel>Website (optional)</label>
              <input scInput type="url" [formField]="signupForm.website" />
              <div scFieldErrors></div>
            </div>
            <div scField>
              <label scLabel>Password</label>
              <input
                scInput
                type="password"
                autocomplete="new-password"
                [formField]="signupForm.password"
              />
              <p scFieldDescription>
                8 or more characters, one of them a number.
              </p>
              <div scFieldErrors></div>
            </div>
            <div scField>
              <label scLabel>Confirm password</label>
              <input
                scInput
                type="password"
                autocomplete="new-password"
                [formField]="signupForm.confirm"
              />
              <div scFieldErrors></div>
            </div>
            <div scField orientation="horizontal" class="md:col-span-2">
              <input scCheckbox [formField]="signupForm.terms" />
              <label scLabel>I accept the terms</label>
              <div scFieldErrors></div>
            </div>
          </div>
        </div>
        <div scCardFooter class="justify-end gap-2">
          <button scButton type="button" variant="outline" (click)="clear()">
            Clear
          </button>
          <button scButton type="submit">Create account</button>
        </div>
      </div>
    </form>
  `,
  host: { class: 'flex flex-col gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class FormValidationPage {
  private readonly toaster = inject(ScToaster);
  private readonly model = signal({ ...EMPTY });
  private readonly signupForm = form(this.model, (path) => {
    required(path.username, { message: 'A username is needed.' });
    pattern(path.username, /^\w{3,}$/, {
      message: 'At least 3 letters, numbers or _.',
    });
    required(path.email, { message: 'An email is needed.' });
    email(path.email, { message: 'This is not an email address.' });
    min(path.age, 18, { message: 'You must be 18 or older.' });
    max(path.age, 120, { message: 'That is older than anyone.' });
    pattern(path.website, /^$|^https?:\/\/\S+\.\S+$/, {
      message: 'Start with http:// or https://.',
    });
    required(path.password, { message: 'A password is needed.' });
    minLength(path.password, 8, { message: 'At least 8 characters.' });
    pattern(path.password, /\d/, { message: 'Add a number.' });
    validate(path.confirm, ({ value, valueOf }) =>
      value() === valueOf(path.password)
        ? undefined
        : { kind: 'mismatch', message: 'The passwords differ.' },
    );
    required(path.terms, { message: 'Please accept the terms.' });
  });

  private send(event: Event): void {
    event.preventDefault();
    void submit(this.signupForm, async () => {
      this.toaster.show({ variant: 'success', title: 'Account created' });
      return undefined;
    });
    if (this.signupForm().invalid())
      this.toaster.show({
        variant: 'error',
        title: 'Check the highlighted fields',
      });
  }

  private clear(): void {
    this.model.set({ ...EMPTY });
    this.signupForm().reset();
  }
}
