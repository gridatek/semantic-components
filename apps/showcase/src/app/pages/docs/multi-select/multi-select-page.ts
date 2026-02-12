import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { BasicMultiSelectDemoContainer } from './demos/basic-multi-select-demo-container';
import { CountMultiSelectDemoContainer } from './demos/count-multi-select-demo-container';
import { DisabledMultiSelectDemoContainer } from './demos/disabled-multi-select-demo-container';
import { DisabledOptionsMultiSelectDemoContainer } from './demos/disabled-options-multi-select-demo-container';
import { FormMultiSelectDemoContainer } from './demos/form-multi-select-demo-container';
import { NosearchMultiSelectDemoContainer } from './demos/nosearch-multi-select-demo-container';
import { SelectallMultiSelectDemoContainer } from './demos/selectall-multi-select-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentStatusBadge } from '../../../components/component-status-badge/component-status-badge';
import { COMPONENTS } from '../../../data/components';

@Component({
  selector: 'app-multi-select-page',
  imports: [
    BasicMultiSelectDemoContainer,
    SelectallMultiSelectDemoContainer,
    CountMultiSelectDemoContainer,
    DisabledOptionsMultiSelectDemoContainer,
    NosearchMultiSelectDemoContainer,
    DisabledMultiSelectDemoContainer,
    FormMultiSelectDemoContainer,
    TocHeading,
    ComponentStatusBadge,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">MultiSelect</h1>
        <p class="text-muted-foreground">
          Select multiple options from a dropdown with chips, search, and
          select-all functionality.
        </p>
        <app-component-status-badge [status]="componentStatus" />
      </div>

      <section class="space-y-8">
        <h2 toc class="text-xl font-semibold tracking-tight">Examples</h2>
        <app-basic-multi-select-demo-container />
        <app-selectall-multi-select-demo-container />
        <app-count-multi-select-demo-container />
        <app-disabled-options-multi-select-demo-container />
        <app-nosearch-multi-select-demo-container />
        <app-disabled-multi-select-demo-container />
        <app-form-multi-select-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class MultiSelectPage {
  readonly componentStatus = COMPONENTS.find((c) => c.path === 'multi-select')!
    .status;
}
