import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { GroupCheckboxDemo } from './group-checkbox-demo';

@Component({
  selector: 'app-group-checkbox-demo-container',
  imports: [DemoContainer, GroupCheckboxDemo],
  template: `
    <app-demo-container
      title="Group"
      demoUrl="/demos/checkbox/group-checkbox-demo"
      [code]="code"
    >
      <app-group-checkbox-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class GroupCheckboxDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScCheckbox,
  ScField,
  ScFieldDescription,
  ScFieldGroup,
  ScFieldset,
  ScLegend,
} from '@semantic-components/ui';

/** Several checkboxes in a fieldset, named by its legend. */
@Component({
  selector: 'app-group-checkbox-demo',
  imports: [
    FormField,
    ScCheckbox,
    ScFieldDescription,
    ScFieldGroup,
    ScFieldset,
    ScLegend,
    ScField,
  ],
  template: \`
    <fieldset scFieldset class="w-full max-w-sm">
      <legend scLegend variant="label">Show these items on the desktop:</legend>
      <p scFieldDescription>
        Select the items you want to show on the desktop.
      </p>
      <div scFieldGroup class="gap-3">
        <label scField orientation="horizontal">
          <input scCheckbox [formField]="desktopForm.hardDisks" />
          Hard disks
        </label>
        <label scField orientation="horizontal">
          <input scCheckbox [formField]="desktopForm.externalDisks" />
          External disks
        </label>
        <label scField orientation="horizontal">
          <input scCheckbox [formField]="desktopForm.media" />
          CDs, DVDs, and iPods
        </label>
        <label scField orientation="horizontal">
          <input scCheckbox [formField]="desktopForm.servers" />
          Connected servers
        </label>
      </div>
    </fieldset>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class GroupCheckboxDemo {
  protected readonly desktopForm = form(
    signal({
      hardDisks: true,
      externalDisks: true,
      media: false,
      servers: false,
    }),
  );
}`;
}
