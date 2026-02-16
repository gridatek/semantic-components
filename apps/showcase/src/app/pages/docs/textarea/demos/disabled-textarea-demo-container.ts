import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DisabledTextareaDemo } from './disabled-textarea-demo';

@Component({
  selector: 'app-disabled-textarea-demo-container',
  imports: [DemoContainer, DisabledTextareaDemo],
  template: `
    <app-demo-container
      title="Disabled"
      demoUrl="/demos/textarea/disabled-textarea-demo"
      [code]="code"
    >
      <app-disabled-textarea-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledTextareaDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { disabled, form, FormField } from '@angular/forms/signals';
import { ScField, ScLabel, ScTextarea } from '@semantic-components/ui';

@Component({
  selector: 'app-disabled-textarea-demo',
  imports: [FormField, ScField, ScLabel, ScTextarea],
  template: \`
    <div sc-field>
      <label sc-label>Disabled</label>
      <textarea
        sc-textarea
        [formField]="disabledForm.message"
        placeholder="Disabled textarea"
      ></textarea>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledTextareaDemo {
  readonly formModel = signal({ message: '' });
  readonly disabledForm = form(this.formModel, (s) => {
    disabled(s.message);
  });
}`;
}
