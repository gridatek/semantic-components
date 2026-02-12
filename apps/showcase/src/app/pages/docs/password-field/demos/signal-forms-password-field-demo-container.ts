import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SignalFormsPasswordFieldDemo } from './signal-forms-password-field-demo';

@Component({
  selector: 'app-signal-forms-password-field-demo-container',
  imports: [DemoContainer, SignalFormsPasswordFieldDemo],
  template: `
    <app-demo-container
      title="Signal Forms"
      demoUrl="/demos/password-field/signal-forms-password-field-demo"
      [code]="code"
    >
      <app-signal-forms-password-field-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SignalFormsPasswordFieldDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { FormField, form, required, minLength } from '@angular/forms/signals';
import {
  ScPasswordField,
  ScPasswordFieldInputGroup,
  ScPasswordFieldInput,
  ScPasswordFieldToggle,
} from '@semantic-components/ui-lab';
import { ScLabel } from '@semantic-components/ui-lab';

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
  template: \`
    <div class="max-w-sm space-y-4">
      <div sc-password-field class="space-y-2">
        <label
          sc-label
          [class.text-destructive]="
            loginForm.password().invalid() && loginForm.password().touched()
          "
        >
          Password
        </label>
        <div sc-password-field-input-group>
          <input
            sc-password-field-input
            [formField]="loginForm.password"
            placeholder="Enter password"
            [class.border-destructive]="
              loginForm.password().invalid() && loginForm.password().touched()
            "
          />
          <button sc-password-field-toggle></button>
        </div>
        @if (loginForm.password().invalid() && loginForm.password().touched()) {
          <p class="text-sm font-medium text-destructive" role="alert">
            @if (hasError(loginForm.password, 'required')) {
              Password is required
            } @else if (hasError(loginForm.password, 'minLength')) {
              Password must be at least 8 characters
            }
          </p>
        }
      </div>

      <div class="rounded-lg border bg-muted/50 p-4">
        <p class="text-sm font-medium">Form State:</p>
        <pre class="mt-2 text-xs text-muted-foreground">{{ formState() }}</pre>
      </div>
    </div>
  \`,
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
}`;
}
