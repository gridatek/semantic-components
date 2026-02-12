import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { MaxlengthTextareaDemo } from './maxlength-textarea-demo';

@Component({
  selector: 'app-maxlength-textarea-demo-container',
  imports: [DemoContainer, MaxlengthTextareaDemo],
  template: `
    <app-demo-container
      title="With Character Limit"
      demoUrl="/demos/textarea/maxlength-textarea-demo"
      [code]="code"
    >
      <app-maxlength-textarea-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaxlengthTextareaDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { form, FormField, maxLength } from '@angular/forms/signals';
import {
  ScField,
  ScFieldDescription,
  ScLabel,
  ScTextarea,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-maxlength-textarea-demo',
  imports: [FormField, ScField, ScFieldDescription, ScLabel, ScTextarea],
  template: \`
    <div sc-field>
      <label sc-label>Description</label>
      <textarea
        sc-textarea
        [formField]="descForm.description"
        placeholder="Enter description..."
      ></textarea>
      <p sc-field-description>Max 200 characters.</p>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaxlengthTextareaDemo {
  readonly formModel = signal({ description: '' });
  readonly descForm = form(this.formModel, (s) => {
    maxLength(s.description, 200);
  });
}`;
}
