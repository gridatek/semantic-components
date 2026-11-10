import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { FormCheckboxNextDemo } from './form-checkbox-next-demo';

@Component({
  selector: 'app-form-checkbox-next-demo-container',
  imports: [DemoContainer, FormCheckboxNextDemo],
  template: `
    <app-demo-container
      title="Form"
      demoUrl="/demos/checkbox-next/form-checkbox-next-demo"
      [code]="code"
    >
      <app-form-checkbox-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class FormCheckboxNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScCard,
  ScCardContent,
  ScCardHeader,
  ScCardTitle,
  ScCheckboxNext,
  ScCheckboxNextField,
  ScFieldGroup,
  ScLabel,
} from '@semantic-components/ui';

/** Without a form: each checked state two-way bound, [(checked)]. */
@Component({
  selector: 'app-form-checkbox-next-demo',
  imports: [
    ScCard,
    ScCardContent,
    ScCardHeader,
    ScCardTitle,
    ScCheckboxNext,
    ScCheckboxNextField,
    ScFieldGroup,
    ScLabel,
  ],
  template: \`
    <div scCard class="w-full max-w-md">
      <div scCardHeader>
        <h3 scCardTitle>Notification Preferences</h3>
      </div>
      <div scCardContent>
        <div scFieldGroup class="gap-3">
          <div scCheckboxNextField>
            <input type="checkbox" scCheckboxNext [(checked)]="email" />
            <label scLabel>Email notifications</label>
          </div>
          <div scCheckboxNextField>
            <input type="checkbox" scCheckboxNext [(checked)]="sms" />
            <label scLabel>SMS notifications</label>
          </div>
          <div scCheckboxNextField>
            <input type="checkbox" scCheckboxNext [(checked)]="push" />
            <label scLabel>Push notifications</label>
          </div>
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class FormCheckboxNextDemo {
  protected readonly email = signal(true);
  protected readonly sms = signal(false);
  protected readonly push = signal(true);
}`;
}
