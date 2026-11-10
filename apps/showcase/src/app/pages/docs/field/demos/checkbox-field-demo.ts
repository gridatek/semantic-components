import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScCheckbox,
  ScCheckboxField,
  ScFieldDescription,
  ScFieldGroup,
  ScFieldSeparator,
  ScFieldset,
  ScLabel,
  ScLegend,
} from '@semantic-components/ui';

/** Checkboxes under a legend; one with a description beside it. */
@Component({
  selector: 'app-checkbox-field-demo',
  imports: [
    ScCheckbox,
    ScCheckboxField,
    ScFieldDescription,
    ScFieldGroup,
    ScFieldSeparator,
    ScFieldset,
    ScLabel,
    ScLegend,
  ],
  template: `
    <div scFieldGroup class="w-full max-w-xs">
      <fieldset scFieldset>
        <legend scLegend variant="label">
          Show these items on the desktop
        </legend>
        <p scFieldDescription>
          Select the items you want to show on the desktop.
        </p>
        <div scFieldGroup class="gap-3">
          <div scCheckboxField>
            <input scCheckbox [(checked)]="hardDisks" />
            <label scLabel class="font-normal">Hard disks</label>
          </div>
          <div scCheckboxField>
            <input scCheckbox />
            <label scLabel class="font-normal">External disks</label>
          </div>
          <div scCheckboxField>
            <input scCheckbox />
            <label scLabel class="font-normal">CDs, DVDs, and iPods</label>
          </div>
          <div scCheckboxField>
            <input scCheckbox />
            <label scLabel class="font-normal">Connected servers</label>
          </div>
        </div>
      </fieldset>
      <div scFieldSeparator></div>
      <div scCheckboxField>
        <input scCheckbox [(checked)]="sync" />
        <label scLabel>Sync Desktop &amp; Documents folders</label>
        <p scFieldDescription>
          Your Desktop &amp; Documents folders are being synced with iCloud
          Drive. You can access them from other devices.
        </p>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class CheckboxFieldDemo {
  protected readonly hardDisks = signal(true);
  protected readonly sync = signal(true);
}
