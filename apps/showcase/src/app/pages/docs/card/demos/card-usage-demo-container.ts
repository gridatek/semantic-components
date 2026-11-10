import { Component, ViewEncapsulation } from '@angular/core';
import { UsageCode } from '../../../../components/usage-code/usage-code';
import { CardUsageDemo } from './card-usage-demo';

@Component({
  selector: 'app-card-usage-demo-container',
  imports: [UsageCode, CardUsageDemo],
  template: `
    <app-usage-code [code]="code">
      <ng-template><app-card-usage-demo /></ng-template>
    </app-usage-code>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class CardUsageDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  FormField,
  FormRoot,
  email,
  form,
  required,
} from '@angular/forms/signals';
import {
  ScButton,
  ScCard,
  ScCardAction,
  ScCardContent,
  ScCardDescription,
  ScCardFooter,
  ScCardHeader,
  ScCardTitle,
  ScField,
  ScFieldGroup,
  ScInput,
  ScLabel,
  ScLink,
} from '@semantic-components/ui';

@Component({
  selector: 'app-card-usage-demo',
  imports: [
    FormField,
    FormRoot,
    ScButton,
    ScCard,
    ScCardAction,
    ScCardContent,
    ScCardDescription,
    ScCardFooter,
    ScCardHeader,
    ScCardTitle,
    ScField,
    ScFieldGroup,
    ScInput,
    ScLabel,
    ScLink,
  ],
  template: \`
    <div scCard class="w-full max-w-sm">
      <div scCardHeader>
        <h3 scCardTitle>Login to your account</h3>
        <p scCardDescription>Enter your email below to login to your account</p>
        <div scCardAction>
          <button scButton variant="link">Sign Up</button>
        </div>
      </div>
      <div scCardContent>
        <form id="login-form" [formRoot]="loginForm">
          <div scFieldGroup>
            <div scField>
              <label scLabel>Email</label>
              <input
                scInput
                type="email"
                [formField]="loginForm.email"
                placeholder="m&#64;example.com"
              />
            </div>
            <div scField>
              <div class="flex items-center">
                <label scLabel>Password</label>
                <a scLink variant="link" href="#" class="ms-auto">
                  Forgot your password?
                </a>
              </div>
              <input scInput type="password" [formField]="loginForm.password" />
            </div>
          </div>
        </form>
      </div>
      <div scCardFooter class="flex-col gap-2">
        <button scButton type="submit" form="login-form" class="w-full">
          Login
        </button>
        <button scButton variant="outline" class="w-full">
          Login with Google
        </button>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class CardUsageDemo {
  private readonly model = signal({ email: '', password: '' });
  protected readonly loginForm = form(
    this.model,
    (path) => {
      required(path.email);
      email(path.email);
      required(path.password);
    },
    // Submitted from the footer's Login (form="…"); invalid, the fields are
    // marked and the action waits.
    { submission: { action: async () => undefined } },
  );
}`;
}
