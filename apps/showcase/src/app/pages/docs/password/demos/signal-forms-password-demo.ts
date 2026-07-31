import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form, minLength, required } from '@angular/forms/signals';
import {
  ScField,
  ScInputGroup,
  ScInputGroupAddon,
  ScLabel,
  ScPasswordInput,
  ScPasswordProvider,
  ScPasswordToggle,
} from '@semantic-components/ui';
import { SiEyeIcon, SiEyeOffIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-signal-forms-password-demo',
  imports: [
    FormField,
    ScField,
    ScPasswordProvider,
    ScPasswordInput,
    ScPasswordToggle,
    ScInputGroup,
    ScInputGroupAddon,
    ScLabel,
    SiEyeIcon,
    SiEyeOffIcon,
  ],
  template: `
    <div class="w-full max-w-sm space-y-4">
      <div scField class="space-y-2">
        <label
          scLabel
          [class.text-destructive]="
            loginForm.password().invalid() && loginForm.password().touched()
          "
        >
          Password
        </label>
        <div scPasswordProvider #passwordField="scPasswordProvider">
          <div scInputGroup>
            <input
              scPasswordInput
              [formField]="loginForm.password"
              placeholder="Enter password"
              [class.border-destructive]="
                loginForm.password().invalid() && loginForm.password().touched()
              "
            />
            <div scInputGroupAddon align="inline-end">
              <button scPasswordToggle>
                @if (passwordField.visible()) {
                  <svg siEyeOffIcon></svg>
                } @else {
                  <svg siEyeIcon></svg>
                }
                <span class="sr-only">Toggle password visibility</span>
              </button>
            </div>
          </div>
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
})
export class SignalFormsPasswordDemo {
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
