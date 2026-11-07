import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { TextareaFieldDemo } from './textarea-field-demo';

@Component({
  selector: 'app-textarea-field-demo-container',
  imports: [DemoContainer, TextareaFieldDemo],
  template: `
    <app-demo-container
      title="Textarea"
      demoUrl="/demos/field/textarea-field-demo"
      [code]="code"
    >
      <app-textarea-field-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class TextareaFieldDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScField,
  ScFieldDescription,
  ScFieldGroup,
  ScFieldset,
  ScLabel,
  ScTextarea,
} from '@semantic-components/ui';

/** A textarea with its label and description. */
@Component({
  selector: 'app-textarea-field-demo',
  imports: [
    ScField,
    ScFieldDescription,
    ScFieldGroup,
    ScFieldset,
    ScLabel,
    ScTextarea,
  ],
  template: \`
    <fieldset scFieldset class="w-full max-w-xs">
      <div scFieldGroup>
        <div scField>
          <label scLabel>Feedback</label>
          <textarea
            scTextarea
            placeholder="Your feedback helps us improve..."
            rows="4"
          ></textarea>
          <p scFieldDescription>Share your thoughts about our service.</p>
        </div>
      </div>
    </fieldset>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class TextareaFieldDemo {}`;
}
