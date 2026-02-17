import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { FieldsetDemo } from './fieldset-demo';

@Component({
  selector: 'app-fieldset-demo-container',
  imports: [DemoContainer, FieldsetDemo],
  template: `
    <app-demo-container
      title="FieldSet with Legend"
      [code]="code"
      demoUrl="/demos/field/fieldset-demo"
    >
      <app-fieldset-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldsetDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScFieldset,
  ScLegend,
  ScFieldGroup,
  ScField,
  ScFieldDescription,
} from "@semantic-components/ui";
import { ScLabel } from '@semantic-components/ui';
import { ScInput } from "@semantic-components/ui-lab";

@Component({
  selector: 'app-fieldset-demo',
  imports: [
    ScFieldset,
    ScLegend,
    ScFieldGroup,
    ScField,
    ScLabel,
    ScFieldDescription,
    ScInput,
  ],
  template: \`
    <fieldset scFieldset>
      <legend scLegend>Personal Information</legend>
      <p scFieldDescription>Please provide your personal details below.</p>

      <div scFieldGroup>
        <div scField>
          <label scLabel for="firstName">First Name</label>
          <input scInput id="firstName" type="text" placeholder="John" />
        </div>

        <div scField>
          <label scLabel for="lastName">Last Name</label>
          <input scInput id="lastName" type="text" placeholder="Doe" />
        </div>

        <div scField>
          <label scLabel for="email">Email</label>
          <input
            scInput
            id="email"
            type="email"
            placeholder="john.doe@example.com"
          />
        </div>
      </div>
    </fieldset>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldsetDemo {}`;
}
