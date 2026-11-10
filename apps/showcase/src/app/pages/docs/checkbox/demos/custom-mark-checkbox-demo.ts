import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScCheckbox,
  ScCheckboxField,
  ScFieldGroup,
  ScFieldset,
  ScLegend,
} from '@semantic-components/ui';

/**
 * The mark's shape from your own image: --sc-checkbox-check (and
 * --sc-checkbox-indeterminate), on the checkbox or any element round it. A
 * mask: the image's outline only, in the preset's colour.
 */
@Component({
  selector: 'app-custom-mark-checkbox-demo',
  imports: [
    FormField,
    ScCheckbox,
    ScCheckboxField,
    ScFieldGroup,
    ScFieldset,
    ScLegend,
  ],
  template: `
    <fieldset
      scFieldset
      class="w-56"
      style="--sc-checkbox-check: url(/images/checkbox-heart.svg)"
    >
      <legend scLegend variant="label">Favorite colors</legend>
      <div scFieldGroup class="gap-3">
        <label scCheckboxField>
          <input type="checkbox" scCheckbox [formField]="colorsForm.red" />
          Red
        </label>
        <label scCheckboxField>
          <input type="checkbox" scCheckbox [formField]="colorsForm.green" />
          Green
        </label>
        <label scCheckboxField>
          <input type="checkbox" scCheckbox [formField]="colorsForm.blue" />
          Blue
        </label>
      </div>
    </fieldset>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class CustomMarkCheckboxDemo {
  protected readonly colorsForm = form(
    signal({ red: true, green: false, blue: true }),
  );
}
