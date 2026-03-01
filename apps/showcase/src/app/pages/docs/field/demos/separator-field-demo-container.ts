import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SeparatorFieldDemo } from './separator-field-demo';

@Component({
  selector: 'app-separator-field-demo-container',
  imports: [DemoContainer, SeparatorFieldDemo],
  template: `
    <app-demo-container
      title="Field Separator"
      [code]="code"
      demoUrl="/demos/field/separator-field-demo"
    >
      <app-separator-field-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeparatorFieldDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScField,
  ScFieldGroup,
  ScFieldSeparator,
  ScInput,
  ScLabel,
  ScSeparator,
} from '@semantic-components/ui';

@Component({
  selector: 'app-separator-field-demo',
  imports: [
    ScField,
    ScLabel,
    ScFieldGroup,
    ScFieldSeparator,
    ScSeparator,
    ScInput,
  ],
  template: \`
    <div scFieldGroup>
      <div scField>
        <label scLabel>Email</label>
        <input scInput type="email" placeholder="Enter your email" />
      </div>

      <div scFieldSeparator>
        <div scSeparator class="absolute inset-0 top-1/2"></div>
        <span
          class="text-muted-foreground px-2 bg-background relative mx-auto block w-fit"
        >
          or
        </span>
      </div>

      <div scField>
        <label scLabel>Phone</label>
        <input scInput type="tel" placeholder="Enter your phone" />
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeparatorFieldDemo {}`;
}
