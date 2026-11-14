import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import { ScField, ScRadio, ScRadioGroup } from '@semantic-components/ui';

interface FilterFormModel {
  filter: string;
}

@Component({
  selector: 'app-horizontal-radio-group-demo',
  imports: [ScRadioGroup, ScRadio, FormField, ScField],
  template: `
    <div scRadioGroup [formField]="filterForm.filter" orientation="horizontal">
      <label scField orientation="horizontal">
        <input scRadio value="all" />
        All
      </label>
      <label scField orientation="horizontal">
        <input scRadio value="unread" />
        Unread
      </label>
      <label scField orientation="horizontal">
        <input scRadio value="archived" />
        Archived
      </label>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class HorizontalRadioGroupDemo {
  readonly formModel = signal<FilterFormModel>({
    filter: 'all',
  });

  readonly filterForm = form(this.formModel);
}
