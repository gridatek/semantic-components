import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ParentCheckboxGroupDemo } from './parent-checkbox-group-demo';

@Component({
  selector: 'app-parent-checkbox-group-demo-container',
  imports: [DemoContainer, ParentCheckboxGroupDemo],
  template: `
    <app-demo-container
      title="Parent checkbox"
      demoUrl="/demos/checkbox-group/parent-checkbox-group-demo"
      [code]="code"
    >
      <app-parent-checkbox-group-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ParentCheckboxGroupDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScCheckbox,
  ScCheckboxField,
  ScCheckboxGroup,
} from '@semantic-components/ui';

/** A parent checkbox: ticks all of allValues or none, mixed when only some are. */
@Component({
  selector: 'app-parent-checkbox-group-demo',
  imports: [ScCheckbox, ScCheckboxField, ScCheckboxGroup],
  template: \`
    <div
      scCheckboxGroup
      aria-label="Apples"
      [allValues]="allApples"
      [(value)]="apples"
    >
      <label scCheckboxField>
        <input scCheckbox parent />
        Apples
      </label>
      <div class="flex flex-col gap-3 ps-6">
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
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ParentCheckboxGroupDemo {
  protected readonly allApples = [
    'fuji-apple',
    'gala-apple',
    'granny-smith-apple',
  ];
  protected readonly apples = signal<string[]>([]);
}`;
}
