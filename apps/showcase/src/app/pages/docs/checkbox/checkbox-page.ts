import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { BasicCheckboxDemoContainer } from './demos/basic-checkbox-demo-container';
import { CustomThemeCheckboxDemoContainer } from './demos/custom-theme-checkbox-demo-container';
import { DisabledCheckboxDemoContainer } from './demos/disabled-checkbox-demo-container';
import { FormCheckboxDemoContainer } from './demos/form-checkbox-demo-container';
import { IndeterminateCheckboxDemoContainer } from './demos/indeterminate-checkbox-demo-container';
import { LabelCheckboxDemoContainer } from './demos/label-checkbox-demo-container';
import { SignalFormsCheckboxDemoContainer } from './demos/signal-forms-checkbox-demo-container';
import { WithDescriptionCheckboxDemoContainer } from './demos/with-description-checkbox-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentStatusBadge } from '../../../components/component-status-badge/component-status-badge';
import { COMPONENTS } from '../../../data/components';

@Component({
  selector: 'app-checkbox-page',
  imports: [
    BasicCheckboxDemoContainer,
    WithDescriptionCheckboxDemoContainer,
    LabelCheckboxDemoContainer,
    DisabledCheckboxDemoContainer,
    IndeterminateCheckboxDemoContainer,
    FormCheckboxDemoContainer,
    SignalFormsCheckboxDemoContainer,
    CustomThemeCheckboxDemoContainer,
    TocHeading,
    ComponentStatusBadge,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">Checkbox</h1>
        <p class="text-muted-foreground">
          A control that allows the user to toggle between checked and not
          checked.
        </p>
        <app-component-status-badge [status]="componentStatus" />
      </div>

      <section class="space-y-8">
        <h2 toc class="text-xl font-semibold tracking-tight">Examples</h2>
        <app-basic-checkbox-demo-container />
        <app-with-description-checkbox-demo-container />
        <app-label-checkbox-demo-container />
        <app-disabled-checkbox-demo-container />
        <app-indeterminate-checkbox-demo-container />
        <app-form-checkbox-demo-container />
        <app-signal-forms-checkbox-demo-container />
        <app-custom-theme-checkbox-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CheckboxPage {
  readonly componentStatus = COMPONENTS.find((c) => c.path === 'checkbox')!
    .status;
}
