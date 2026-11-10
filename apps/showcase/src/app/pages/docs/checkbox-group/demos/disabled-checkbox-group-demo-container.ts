import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DisabledCheckboxGroupDemo } from './disabled-checkbox-group-demo';

@Component({
  selector: 'app-disabled-checkbox-group-demo-container',
  imports: [DemoContainer, DisabledCheckboxGroupDemo],
  template: `
    <app-demo-container
      title="Disabled"
      demoUrl="/demos/checkbox-group/disabled-checkbox-group-demo"
      [code]="code"
    >
      <app-disabled-checkbox-group-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledCheckboxGroupDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScCheckbox,
  ScCheckboxField,
  ScCheckboxGroup,
} from '@semantic-components/ui';

/** A disabled group: every checkbox in it dimmed, out of the Tab order. */
@Component({
  selector: 'app-disabled-checkbox-group-demo',
  imports: [ScCheckbox, ScCheckboxField, ScCheckboxGroup],
  template: \`
    <div scCheckboxGroup aria-label="Apples" disabled [(value)]="apples">
      <label scCheckboxField>
        <input scCheckbox value="fuji-apple" />
        Fuji
      </label>
      <label scCheckboxField>
        <input scCheckbox value="gala-apple" />
        Gala
      </label>
      <label scCheckboxField>
        <input scCheckbox value="granny-smith-apple" />
        Granny Smith
      </label>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledCheckboxGroupDemo {
  protected readonly apples = signal(['gala-apple']);
}`;
}
