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
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaxlengthTextareaDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { FormField, form, maxLength } from '@angular/forms/signals';
import {
  ScField,
  ScFieldDescription,
  ScLabel,
  ScTextarea,
} from '@semantic-components/ui';

@Component({
  selector: 'app-maxlength-textarea-demo',
  imports: [FormField, ScField, ScFieldDescription, ScLabel, ScTextarea],
  template: \`
    <div scField class="w-full max-w-sm">
      <label scLabel>Description</label>
      <textarea
        scTextarea
        [formField]="descForm.description"
        placeholder="Enter description..."
      ></textarea>
      <p scFieldDescription>Max 200 characters.</p>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
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
