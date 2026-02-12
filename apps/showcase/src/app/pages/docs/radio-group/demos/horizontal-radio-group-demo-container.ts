import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { HorizontalRadioGroupDemo } from './horizontal-radio-group-demo';

@Component({
  selector: 'app-horizontal-radio-group-demo-container',
  imports: [DemoContainer, HorizontalRadioGroupDemo],
  template: `
    <app-demo-container title="Horizontal" [code]="code">
      <app-horizontal-radio-group-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HorizontalRadioGroupDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { ScRadioGroup, ScRadioField, ScRadio } from '@semantic-components/ui-lab';

interface FilterFormModel {
  filter: string;
}

@Component({
  selector: 'app-horizontal-radio-group-demo',
  imports: [ScRadioGroup, ScRadioField, ScRadio, FormField],
  template: \`
    <div sc-radio-group class="flex flex-row gap-4">
      <label sc-radio-field>
        <input
          type="radio"
          sc-radio
          value="all"
          [formField]="filterForm.filter"
          id="h1"
        />
        <span class="text-sm font-medium">All</span>
      </label>
      <label sc-radio-field>
        <input
          type="radio"
          sc-radio
          value="unread"
          [formField]="filterForm.filter"
          id="h2"
        />
        <span class="text-sm font-medium">Unread</span>
      </label>
      <label sc-radio-field>
        <input
          type="radio"
          sc-radio
          value="archived"
          [formField]="filterForm.filter"
          id="h3"
        />
        <span class="text-sm font-medium">Archived</span>
      </label>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HorizontalRadioGroupDemo {
  readonly formModel = signal<FilterFormModel>({
    filter: 'all',
  });

  readonly filterForm = form(this.formModel);
}`;
}
