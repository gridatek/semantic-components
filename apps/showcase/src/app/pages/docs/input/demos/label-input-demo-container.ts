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
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabelInputDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { form, FormField, required } from '@angular/forms/signals';
import { ScField, ScFieldError, ScLabel } from '@semantic-components/ui';
import { ScInput } from '@semantic-components/ui';

@Component({
  selector: 'app-label-input-demo',
  imports: [FormField, ScField, ScFieldError, ScInput, ScLabel],
  template: \`
    <div scField>
      <label scLabel>Email</label>
      <input
        scInput
        type="email"
        [formField]="emailForm.email"
        placeholder="Email"
      />
      @for (error of emailForm.email().errors(); track error.kind) {
        <p scFieldError>{{ error.message }}</p>
      }
    </div>
    <pre class="mt-4 text-xs">
invalid: {{ emailForm.email().invalid() }}
disabled: {{ emailForm.email().disabled() }}
dirty: {{ emailForm.email().dirty() }}
value: "{{ emailForm.email().value() }}"
    </pre
    >
  \`,
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
