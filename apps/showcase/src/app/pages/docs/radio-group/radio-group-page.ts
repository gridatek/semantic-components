import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { BasicRadioGroupDemoContainer } from './demos/basic-radio-group-demo-container';
import { DescriptionsRadioGroupDemoContainer } from './demos/descriptions-radio-group-demo-container';
import { DisabledRadioGroupDemoContainer } from './demos/disabled-radio-group-demo-container';
import { HorizontalRadioGroupDemoContainer } from './demos/horizontal-radio-group-demo-container';
import { FormRadioGroupDemoContainer } from './demos/form-radio-group-demo-container';
import { CustomThemeRadioGroupDemoContainer } from './demos/custom-theme-radio-group-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentStatusBadge } from '../../../components/component-status-badge/component-status-badge';
import { COMPONENTS } from '../../../data/components';

@Component({
  selector: 'app-radio-group-page',
  imports: [
    BasicRadioGroupDemoContainer,
    DescriptionsRadioGroupDemoContainer,
    DisabledRadioGroupDemoContainer,
    HorizontalRadioGroupDemoContainer,
    FormRadioGroupDemoContainer,
    CustomThemeRadioGroupDemoContainer,
    TocHeading,
    ComponentStatusBadge,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">RadioGroup</h1>
        <p class="text-muted-foreground">
          A set of checkable buttons where only one button can be checked at a
          time.
        </p>
        <app-component-status-badge [status]="componentStatus" />
      </div>

      <section class="space-y-8">
        <h2 toc class="text-xl font-semibold tracking-tight">Examples</h2>
        <app-basic-radio-group-demo-container />
        <app-descriptions-radio-group-demo-container />
        <app-disabled-radio-group-demo-container />
        <app-horizontal-radio-group-demo-container />
        <app-form-radio-group-demo-container />
        <app-custom-theme-radio-group-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RadioGroupPage {
  readonly componentStatus = COMPONENTS.find((c) => c.path === 'radio-group')!
    .status;
}
