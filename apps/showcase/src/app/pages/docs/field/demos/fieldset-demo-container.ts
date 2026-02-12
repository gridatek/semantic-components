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
  ScFieldSet,
  ScFieldLegend,
  ScFieldGroup,
  ScField,
  ScLabel,
  ScFieldDescription,
  ScInput,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-fieldset-demo',
  imports: [
    ScFieldSet,
    ScFieldLegend,
    ScFieldGroup,
    ScField,
    ScLabel,
    ScFieldDescription,
    ScInput,
  ],
  template: \`
    <fieldset sc-field-set>
      <legend sc-field-legend>Personal Information</legend>
      <p sc-field-description>Please provide your personal details below.</p>

      <div sc-field-group>
        <div sc-field>
          <label sc-label for="firstName">First Name</label>
          <input sc-input id="firstName" type="text" placeholder="John" />
        </div>

        <div sc-field>
          <label sc-label for="lastName">Last Name</label>
          <input sc-input id="lastName" type="text" placeholder="Doe" />
        </div>

        <div sc-field>
          <label sc-label for="email">Email</label>
          <input
            sc-input
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
