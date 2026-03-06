import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ShowDefaultPasswordFieldDemo } from './show-default-password-field-demo';

@Component({
  selector: 'app-show-default-password-field-demo-container',
  imports: [DemoContainer, ShowDefaultPasswordFieldDemo],
  template: `
    <app-demo-container
      title="Show by Default"
      demoUrl="/demos/password-field/show-default-password-field-demo"
      [code]="code"
    >
      <app-show-default-password-field-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ShowDefaultPasswordFieldDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { ScLabel } from '@semantic-components/ui';
import {
  ScPasswordField,
  ScPasswordFieldInput,
  ScPasswordFieldInputGroup,
  ScPasswordFieldToggle,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-show-default-password-field-demo',
  imports: [
    ScPasswordField,
    ScPasswordFieldInputGroup,
    ScPasswordFieldInput,
    ScPasswordFieldToggle,
    ScLabel,
  ],
  template: \`
    <div
      scPasswordField
      [(value)]="apiKey"
      [showByDefault]="true"
      class="space-y-2"
    >
      <label scLabel>API Key</label>
      <div scPasswordFieldInputGroup>
        <input scPasswordFieldInput placeholder="sk-..." />
        <button scPasswordFieldToggle></button>
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowDefaultPasswordFieldDemo {
  readonly apiKey = signal<string>('sk-1234567890abcdef');
}`;
}
