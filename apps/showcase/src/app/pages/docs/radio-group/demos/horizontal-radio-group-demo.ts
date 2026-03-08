import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScLabel,
  ScRadio,
  ScRadioField,
  ScRadioGroup,
} from '@semantic-components/ui';

interface FilterFormModel {
  filter: string;
}

@Component({
  selector: 'app-horizontal-radio-group-demo',
  imports: [ScRadioGroup, ScRadioField, ScRadio, ScLabel, FormField],
  template: `
    <div scRadioGroup class="flex flex-row gap-4">
      <label scRadioField>
        <input
          type="radio"
          scRadio
          value="all"
          [formField]="filterForm.filter"
        />
        <label scLabel>All</label>
      </label>
      <label scRadioField>
        <input
          type="radio"
          scRadio
          value="unread"
          [formField]="filterForm.filter"
        />
        <label scLabel>Unread</label>
      </label>
      <label scRadioField>
        <input
          type="radio"
          scRadio
          value="archived"
          [formField]="filterForm.filter"
        />
        <label scLabel>Archived</label>
      </label>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HorizontalRadioGroupDemo {
  readonly formModel = signal<FilterFormModel>({
    filter: 'all',
  });

  readonly filterForm = form(this.formModel);
}
