import { Dir } from '@angular/cdk/bidi';
import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScCheckbox,
  ScCheckboxField,
  ScCheckboxGroup,
} from '@semantic-components/ui';

/** In a right-to-left page: the checkboxes at the right, the parent first. */
@Component({
  selector: 'app-rtl-checkbox-group-demo',
  imports: [Dir, ScCheckbox, ScCheckboxField, ScCheckboxGroup],
  template: `
    <div dir="rtl" lang="ar">
      <div
        scCheckboxGroup
        aria-label="التفاح"
        [allValues]="allApples"
        [(value)]="apples"
      >
        <label scCheckboxField>
          <input scCheckbox parent />
          التفاح
        </label>
        <div class="flex flex-col gap-3 ps-6">
          <label scCheckboxField>
            <input scCheckbox value="fuji-apple" />
            فوجي
          </label>
          <label scCheckboxField>
            <input scCheckbox value="gala-apple" />
            غالا
          </label>
          <label scCheckboxField>
            <input scCheckbox value="granny-smith-apple" />
            غراني سميث
          </label>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlCheckboxGroupDemo {
  protected readonly allApples = [
    'fuji-apple',
    'gala-apple',
    'granny-smith-apple',
  ];
  protected readonly apples = signal(['fuji-apple']);
}
