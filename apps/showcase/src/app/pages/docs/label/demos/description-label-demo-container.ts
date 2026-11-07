import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DescriptionLabelDemo } from './description-label-demo';

@Component({
  selector: 'app-description-label-demo-container',
  imports: [DemoContainer, DescriptionLabelDemo],
  template: `
    <app-demo-container
      title="With a description"
      demoUrl="/demos/label/description-label-demo"
      [code]="code"
    >
      <app-description-label-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class DescriptionLabelDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScField,
  ScFieldDescription,
  ScInput,
  ScLabel,
} from '@semantic-components/ui';

/** A field’s label and its description: the description is read with the control. */
@Component({
  selector: 'app-description-label-demo',
  imports: [ScField, ScFieldDescription, ScInput, ScLabel],
  template: \`
    <div scField class="w-full max-w-sm">
      <label scLabel>Email</label>
      <input scInput type="email" placeholder="m@example.com" />
      <p scFieldDescription>We’ll never share your email with anyone.</p>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DescriptionLabelDemo {}`;
}
