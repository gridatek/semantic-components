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

/** Fieldsets of checkboxes, a separator between them; a link in a description. */
@Component({
  selector: 'app-group-field-demo',
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
        <legend scLegend variant="label">Responses</legend>
        <p scFieldDescription>
          Get notified when ChatGPT responds to requests that take time, like
          research or image generation.
        </p>
        <div scFieldGroup class="gap-3">
          <div scCheckboxField>
            <input
              type="checkbox"
              scCheckbox
              [(checked)]="push"
              [disabled]="true"
            />
            <label scLabel class="font-normal">Push notifications</label>
          </div>
        </div>
      </fieldset>
      <div scFieldSeparator></div>
      <fieldset scFieldset>
        <legend scLegend variant="label">Tasks</legend>
        <p scFieldDescription>
          Get notified when tasks you&apos;ve created have updates.
          <a href="#tasks">Manage tasks</a>
        </p>
        <div scFieldGroup class="gap-3">
          <div scCheckboxField>
            <input type="checkbox" scCheckbox />
            <label scLabel class="font-normal">Push notifications</label>
          </div>
          <div scCheckboxField>
            <input type="checkbox" scCheckbox />
            <label scLabel class="font-normal">Email notifications</label>
          </div>
        </div>
      </fieldset>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class GroupFieldDemo {
  protected readonly push = signal(true);
}
