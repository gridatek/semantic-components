import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { FormInputDemo } from './form-input-demo';

@Component({
  selector: 'app-form-input-demo-container',
  imports: [DemoContainer, FormInputDemo],
  template: `
    <app-demo-container
      title="Form Example"
      demoUrl="/demos/input/form-input-demo"
      [code]="code"
    >
      <app-form-input-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormInputDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { email, form, FormField, required } from '@angular/forms/signals';
import { ScField } from '@semantic-components/ui';
import {
  ScCard,
  ScCardBody,
  ScCardHeader,
  ScCardTitle,
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
    ScCardBody,
    ScCardHeader,
    ScCardTitle,
    ScField,
    ScInput,
    ScLabel,
  ],
  template: \`
    <div scCard class="max-w-md">
      <div scCardHeader>
        <h4 scCardTitle class="text-base">Create Account</h4>
      </div>
      <div scCardBody class="grid gap-4">
        <div class="grid grid-cols-2 gap-4">
          <div scField>
            <label scLabel>First name</label>
            <input
              scInput
              type="text"
              [formField]="accountForm.firstName"
              placeholder="John"
            />
          </div>
          <div scField>
            <label scLabel>Last name</label>
            <input
              scInput
              type="text"
              [formField]="accountForm.lastName"
              placeholder="Doe"
            />
          </div>
        </div>
        <div scField>
          <label scLabel>Email</label>
          <input
            scInput
            type="email"
            [formField]="accountForm.email"
            placeholder="john&#64;example.com"
          />
        </div>
        <div scField>
          <label scLabel>Password</label>
          <input scInput type="password" [formField]="accountForm.password" />
        </div>
      </div>
    </div>
  \`,
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
}`;
}
