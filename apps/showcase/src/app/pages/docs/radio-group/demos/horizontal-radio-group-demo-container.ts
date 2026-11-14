import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { HorizontalRadioGroupDemo } from './horizontal-radio-group-demo';

@Component({
  selector: 'app-horizontal-radio-group-demo-container',
  imports: [DemoContainer, HorizontalRadioGroupDemo],
  template: `
    <app-demo-container
      title="Horizontal"
      demoUrl="/demos/radio-group/horizontal-radio-group-demo"
      [code]="code"
    >
      <app-horizontal-radio-group-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class HorizontalRadioGroupDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import { ScField, ScRadio, ScRadioGroup } from '@semantic-components/ui';

interface FilterFormModel {
  filter: string;
}

@Component({
  selector: 'app-horizontal-radio-group-demo',
  imports: [ScRadioGroup, ScRadio, FormField, ScField],
  template: \`
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
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class HorizontalRadioGroupDemo {
  readonly formModel = signal<FilterFormModel>({
    filter: 'all',
  });

  readonly filterForm = form(this.formModel);
}`;
}
