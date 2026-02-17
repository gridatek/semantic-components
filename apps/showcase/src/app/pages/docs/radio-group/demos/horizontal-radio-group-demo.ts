import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { ScRadioGroup, ScRadioField, ScRadio } from '@semantic-components/ui';

interface FilterFormModel {
  filter: string;
}

@Component({
  selector: 'app-horizontal-radio-group-demo',
  imports: [ScRadioGroup, ScRadioField, ScRadio, FormField],
  template: `
    <div scRadioGroup class="flex flex-row gap-4">
      <label scRadioField>
        <input
          type="radio"
          scRadio
          value="all"
          [formField]="filterForm.filter"
          id="h1"
        />
        <span class="text-sm font-medium">All</span>
      </label>
      <label scRadioField>
        <input
          type="radio"
          scRadio
          value="unread"
          [formField]="filterForm.filter"
          id="h2"
        />
        <span class="text-sm font-medium">Unread</span>
      </label>
      <label scRadioField>
        <input
          type="radio"
          scRadio
          value="archived"
          [formField]="filterForm.filter"
          id="h3"
        />
        <span class="text-sm font-medium">Archived</span>
      </label>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HorizontalRadioGroupDemo {
  readonly formModel = signal<FilterFormModel>({
    filter: 'all',
  });

  readonly filterForm = form(this.formModel);
}
