import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { LabelInputDemo } from './label-input-demo';

@Component({
  selector: 'app-label-input-demo-container',
  imports: [DemoContainer, LabelInputDemo],
  template: `
    <app-demo-container
      title="With Label"
      demoUrl="/demos/input/label-input-demo"
      [code]="code"
    >
      <app-label-input-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabelInputDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { FormField, form, required } from '@angular/forms/signals';
import { ScField, ScFieldErrors, ScLabel } from '@semantic-components/ui';
import { ScInput } from '@semantic-components/ui';

@Component({
  selector: 'app-label-input-demo',
  imports: [FormField, ScField, ScFieldErrors, ScInput, ScLabel],
  template: \`
    <div scField>
      <label scLabel>Email</label>
      <input
        scInput
        type="email"
        [formField]="emailForm.email"
        placeholder="Email"
      />
      <div scFieldErrors></div>
    </div>
    <pre class="mt-4 text-xs">
invalid: {{ emailForm.email().invalid() }}
disabled: {{ emailForm.email().disabled() }}
dirty: {{ emailForm.email().dirty() }}
value: "{{ emailForm.email().value() }}"
    </pre
    >
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabelInputDemo {
  readonly formModel = signal({ email: '' });
  readonly emailForm = form(this.formModel, (s) => {
    required(s.email, { message: 'Email is required' });
  });
}`;
}
