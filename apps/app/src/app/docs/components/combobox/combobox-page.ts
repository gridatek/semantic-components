import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { AsyncComboboxDemoSection } from './async-combobox-demo-section';
import { BasicComboboxDemoSection } from './basic-combobox-demo-section';
import { CustomConfigComboboxDemoSection } from './custom-config-combobox-demo-section';
import { GroupedComboboxDemoSection } from './grouped-combobox-demo-section';
import { MultiSelectComboboxDemoSection } from './multi-select-combobox-demo-section';
import { ReactiveFormsComboboxDemoSection } from './reactive-forms-combobox-demo-section';

@Component({
  selector: 'app-combobox-page',
  imports: [
    BasicComboboxDemoSection,
    MultiSelectComboboxDemoSection,
    AsyncComboboxDemoSection,
    GroupedComboboxDemoSection,
    ReactiveFormsComboboxDemoSection,
    CustomConfigComboboxDemoSection,
  ],
  template: `
    <app-basic-combobox-demo-section />
    <app-multi-select-combobox-demo-section />
    <app-async-combobox-demo-section />
    <app-grouped-combobox-demo-section />
    <app-reactive-forms-combobox-demo-section />
    <app-custom-config-combobox-demo-section />
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ComboboxPage {}
