import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScCheckbox,
  ScCheckboxField,
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
    ScCheckboxField,
    ScFieldDescription,
    ScFieldGroup,
    ScFieldset,
    ScLegend,
  ],
  template: `
    <fieldset scFieldset class="w-full max-w-sm">
      <legend scLegend variant="label">Show these items on the desktop:</legend>
      <p scFieldDescription>
        Select the items you want to show on the desktop.
      </p>
      <div scFieldGroup class="gap-3">
        <label scCheckboxField>
          <input scCheckbox [formField]="desktopForm.hardDisks" />
          Hard disks
        </label>
        <label scCheckboxField>
          <input scCheckbox [formField]="desktopForm.externalDisks" />
          External disks
        </label>
        <label scCheckboxField>
          <input scCheckbox [formField]="desktopForm.media" />
          CDs, DVDs, and iPods
        </label>
        <label scCheckboxField>
          <input scCheckbox [formField]="desktopForm.servers" />
          Connected servers
        </label>
      </div>
    </fieldset>
  `,
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
}
