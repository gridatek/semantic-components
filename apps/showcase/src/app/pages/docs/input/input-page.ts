import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { BasicInputDemoContainer } from './demos/basic-input-demo-container';
import { ButtonInputDemoContainer } from './demos/button-input-demo-container';
import { DisabledInputDemoContainer } from './demos/disabled-input-demo-container';
import { FileInputDemoContainer } from './demos/file-input-demo-container';
import { FormInputDemoContainer } from './demos/form-input-demo-container';
import { LabelInputDemoContainer } from './demos/label-input-demo-container';
import { TypesInputDemoContainer } from './demos/types-input-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentStatusBadge } from '../../../components/component-status-badge/component-status-badge';
import { COMPONENTS } from '../../../data/components';

@Component({
  selector: 'app-input-page',
  imports: [
    BasicInputDemoContainer,
    LabelInputDemoContainer,
    TypesInputDemoContainer,
    FileInputDemoContainer,
    DisabledInputDemoContainer,
    ButtonInputDemoContainer,
    FormInputDemoContainer,
    TocHeading,
    ComponentStatusBadge,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">Input</h1>
        <p class="text-muted-foreground">
          Displays a form input field or a component that looks like an input
          field.
        </p>
        <app-component-status-badge [status]="componentStatus" />
      </div>

      <section class="space-y-8">
        <h2 toc class="text-xl font-semibold tracking-tight">Examples</h2>
        <app-basic-input-demo-container />
        <app-label-input-demo-container />
        <app-types-input-demo-container />
        <app-file-input-demo-container />
        <app-disabled-input-demo-container />
        <app-button-input-demo-container />
        <app-form-input-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class InputPage {
  readonly componentStatus = COMPONENTS.find((c) => c.path === 'input')!.status;
}
