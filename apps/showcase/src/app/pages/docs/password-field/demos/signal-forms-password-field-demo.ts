import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { FormField, form, minLength, required } from '@angular/forms/signals';
import { ScLabel } from '@semantic-components/ui';
import {
  ScPasswordField,
  ScPasswordFieldInput,
  ScPasswordFieldInputGroup,
  ScPasswordFieldToggle,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-signal-forms-password-field-demo',
  imports: [
    FormField,
    ScPasswordField,
    ScPasswordFieldInputGroup,
    ScPasswordFieldInput,
    ScPasswordFieldToggle,
    ScLabel,
  ],
  template: `
    <div class="max-w-sm space-y-4">
      <div scPasswordField class="space-y-2">
        <label
          scLabel
          [class.text-destructive]="
            loginForm.password().invalid() && loginForm.password().touched()
          "
        >
          Password
        </label>
        <div scPasswordFieldInputGroup>
          <input
            scPasswordFieldInput
            [formField]="loginForm.password"
            placeholder="Enter password"
            [class.border-destructive]="
              loginForm.password().invalid() && loginForm.password().touched()
            "
          />
          <button scPasswordFieldToggle></button>
        </div>
        @if (loginForm.password().invalid() && loginForm.password().touched()) {
          <p class="text-destructive text-sm font-medium" role="alert">
            @if (hasError(loginForm.password, 'required')) {
              Password is required
            } @else if (hasError(loginForm.password, 'minLength')) {
              Password must be at least 8 characters
            }
          </p>
        }
      </div>

      <div class="bg-muted/50 rounded-lg border p-4">
        <p class="text-sm font-medium">Form State:</p>
        <pre class="text-muted-foreground mt-2 text-xs">{{ formState() }}</pre>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignalFormsPasswordFieldDemo {
  private readonly formModel = signal({
    password: '',
  });

  readonly loginForm = form(this.formModel, (path) => {
    required(path.password);
    minLength(path.password, 8);
  });

  formState(): string {
    return JSON.stringify(
      {
        value: this.formModel(),
        valid: this.loginForm.password().valid(),
        invalid: this.loginForm.password().invalid(),
        touched: this.loginForm.password().touched(),
      },
      null,
      2,
    );
  }

  hasError(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    field: any,
    errorKey: string,
  ): boolean {
    const errors = field().errors();
    if (!errors || !Array.isArray(errors)) return false;
    return errors.some(
      (e: { rule?: string; name?: string }) =>
        e.rule === errorKey || e.name === errorKey,
    );
  }
}
