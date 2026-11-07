import { Component, ViewEncapsulation } from '@angular/core';
import { ScCheckbox, ScCheckboxField, ScLabel } from '@semantic-components/ui';

/** In a right-to-left page: the box at the right, the text after it. */
@Component({
  selector: 'app-rtl-label-demo',
  imports: [ScCheckbox, ScCheckboxField, ScLabel],
  template: `
    <div dir="rtl" lang="ar">
      <div scCheckboxField>
        <input type="checkbox" scCheckbox />
        <label scLabel>قبول الشروط والأحكام</label>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlLabelDemo {}
