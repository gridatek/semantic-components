import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ErrorFieldDemo } from './error-field-demo';

@Component({
  selector: 'app-error-field-demo-container',
  imports: [DemoContainer, ErrorFieldDemo],
  template: `
    <app-demo-container
      title="With Errors"
      [code]="code"
      demoUrl="/demos/field/error-field-demo"
    >
      <app-error-field-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorFieldDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { FormField, form, minLength, required } from '@angular/forms/signals';
import {
  ScField,
  ScFieldDescription,
  ScFieldErrors,
  ScLabel,
} from '@semantic-components/ui';
import { ScInput } from '@semantic-components/ui';

@Component({
  selector: 'app-error-field-demo',
  imports: [
    FormField,
    ScField,
    ScFieldDescription,
    ScFieldErrors,
    ScInput,
    ScLabel,
  ],
  template: \`
    <div scField>
      <label scLabel>Password</label>
      <input
        scInput
        type="password"
        [formField]="passwordForm.password"
        placeholder="Enter password"
      />
      <p scFieldDescription>Must be at least 8 characters.</p>
      <div scFieldErrors></div>
    </div>
  \`,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorFieldDemo {
  readonly formModel = signal({ password: '' });
  readonly passwordForm = form(this.formModel, (s) => {
    required(s.password, { message: 'Password is required' });
    minLength(s.password, 8, {
      message: 'Password must be at least 8 characters',
    });
  });
}`;
}
