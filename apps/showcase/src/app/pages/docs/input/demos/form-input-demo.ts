import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { email, form, FormField, required } from '@angular/forms/signals';
import {
  ScCard,
  ScCardContent,
  ScCardHeader,
  ScCardTitle,
  ScField,
  ScInput,
  ScLabel,
} from '@semantic-components/ui-lab';

interface CreateAccountForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-form-input-demo',
  imports: [
    FormField,
    ScCard,
    ScCardContent,
    ScCardHeader,
    ScCardTitle,
    ScField,
    ScInput,
    ScLabel,
  ],
  template: `
    <div sc-card class="max-w-md">
      <div sc-card-header>
        <h4 sc-card-title class="text-base">Create Account</h4>
      </div>
      <div sc-card-content class="grid gap-4">
        <div class="grid grid-cols-2 gap-4">
          <div sc-field>
            <label sc-label>First name</label>
            <input
              sc-input
              type="text"
              [formField]="accountForm.firstName"
              placeholder="John"
            />
          </div>
          <div sc-field>
            <label sc-label>Last name</label>
            <input
              sc-input
              type="text"
              [formField]="accountForm.lastName"
              placeholder="Doe"
            />
          </div>
        </div>
        <div sc-field>
          <label sc-label>Email</label>
          <input
            sc-input
            type="email"
            [formField]="accountForm.email"
            placeholder="john&#64;example.com"
          />
        </div>
        <div sc-field>
          <label sc-label>Password</label>
          <input sc-input type="password" [formField]="accountForm.password" />
        </div>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormInputDemo {
  readonly formModel = signal<CreateAccountForm>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  readonly accountForm = form(this.formModel, (s) => {
    required(s.firstName);
    required(s.lastName);
    required(s.email);
    email(s.email);
    required(s.password);
  });
}
