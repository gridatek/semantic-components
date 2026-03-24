import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import {
  FormField,
  FormRoot,
  email,
  form,
  required,
} from '@angular/forms/signals';
import { RouterLink } from '@angular/router';
import {
  ScButton,
  ScCard,
  ScCardBody,
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
import { SiMailIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-forgot-password',
  imports: [
    FormField,
    FormRoot,
    RouterLink,
    ScButton,
    ScCard,
    ScCardBody,
    ScCardDescription,
    ScCardFooter,
    ScCardHeader,
    ScCardTitle,
    ScField,
    ScFieldGroup,
    ScInput,
    ScLabel,
    ScLink,
    SiMailIcon,
  ],
  template: `
    <div class="bg-muted/30 flex min-h-screen items-center justify-center">
      <div scCard class="w-full max-w-md">
        <div scCardHeader class="text-center">
          <div class="mb-2 flex justify-center">
            <svg siMailIcon class="text-muted-foreground size-10"></svg>
          </div>
          <h1 scCardTitle>Forgot your password?</h1>
          <p scCardDescription>
            Enter your email address and we'll send you a reset link.
          </p>
        </div>
        <div scCardBody>
          <form [formRoot]="forgotPasswordForm">
            <div scFieldGroup>
              <div scField>
                <label scLabel>Email</label>
                <input
                  scInput
                  type="email"
                  [formField]="forgotPasswordForm.email"
                  placeholder="name@example.com"
                />
              </div>
              <button scButton class="w-full" type="submit">
                Send Reset Link
              </button>
            </div>
          </form>
        </div>
        <div scCardFooter class="justify-center">
          <a scLink variant="link" routerLink="/login">Back to login</a>
        </div>
      </div>
    </div>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ForgotPasswordPage {
  private readonly formModel = signal({
    email: '',
  });

  readonly forgotPasswordForm = form(
    this.formModel,
    (s) => {
      required(s.email);
      email(s.email);
    },
    {
      submission: {
        action: async (formTree) => {
          console.log('Submitting:', formTree().value());
        },
      },
    },
  );
}
