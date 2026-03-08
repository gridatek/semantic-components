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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HorizontalRadioGroupDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import { ScRadio, ScRadioField, ScRadioGroup } from '@semantic-components/ui';

interface FilterFormModel {
  filter: string;
}

@Component({
  selector: 'app-horizontal-radio-group-demo',
  imports: [ScRadioGroup, ScRadioField, ScRadio, FormField],
  template: \`
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
  \`,
  host: { class: 'flex w-full justify-center' },
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
