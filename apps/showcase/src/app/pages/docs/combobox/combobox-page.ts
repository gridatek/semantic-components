import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { BasicComboboxDemoContainer } from './demos/basic-combobox-demo-container';
import { CountriesComboboxDemoContainer } from './demos/countries-combobox-demo-container';
import { DisabledComboboxDemoContainer } from './demos/disabled-combobox-demo-container';
import { FormComboboxDemoContainer } from './demos/form-combobox-demo-container';
import { MultipleComboboxDemoContainer } from './demos/multiple-combobox-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentStatusBadge } from '../../../components/component-status-badge/component-status-badge';
import { COMPONENTS } from '../../../data/components';

@Component({
  selector: 'app-combobox-page',
  imports: [
    BasicComboboxDemoContainer,
    DisabledComboboxDemoContainer,
    MultipleComboboxDemoContainer,
    CountriesComboboxDemoContainer,
    FormComboboxDemoContainer,
    TocHeading,
    ComponentStatusBadge,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">Combobox</h1>
        <p class="text-muted-foreground">
          Autocomplete input and command palette with a list of suggestions.
        </p>
        <app-component-status-badge [status]="componentStatus" />
      </div>

      <section class="space-y-8">
        <h2 toc class="text-xl font-semibold tracking-tight">Examples</h2>
        <app-basic-combobox-demo-container />
        <app-disabled-combobox-demo-container />
        <app-multiple-combobox-demo-container />
        <app-countries-combobox-demo-container />
        <app-form-combobox-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ComboboxPage {
  readonly componentStatus = COMPONENTS.find((c) => c.path === 'combobox')!
    .status;
}
