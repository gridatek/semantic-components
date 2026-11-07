import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { FieldTextareaDemo } from './field-textarea-demo';

@Component({
  selector: 'app-field-textarea-demo-container',
  imports: [DemoContainer, FieldTextareaDemo],
  template: `
    <app-demo-container
      title="Field"
      demoUrl="/demos/textarea/field-textarea-demo"
      [code]="code"
    >
      <app-field-textarea-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class FieldTextareaDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScField,
  ScFieldDescription,
  ScLabel,
  ScTextarea,
} from '@semantic-components/ui';

/** In a field: named by its label, described by its description. */
@Component({
  selector: 'app-field-textarea-demo',
  imports: [ScField, ScFieldDescription, ScLabel, ScTextarea],
  template: \`
    <div scField class="w-full max-w-sm">
      <label scLabel>Message</label>
      <p scFieldDescription>Enter your message below.</p>
      <textarea scTextarea placeholder="Type your message here."></textarea>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class FieldTextareaDemo {}`;
}
