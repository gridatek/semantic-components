import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { BasicLabelDemoContainer } from './demos/basic-label-demo-container';
import { CheckboxLabelDemoContainer } from './demos/checkbox-label-demo-container';
import { FieldLabelDemoContainer } from './demos/field-label-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentStatusBadge } from '../../../components/component-status-badge/component-status-badge';
import { COMPONENTS } from '../../../data/components';

@Component({
  selector: 'app-label-page',
  imports: [
    BasicLabelDemoContainer,
    CheckboxLabelDemoContainer,
    FieldLabelDemoContainer,
    TocHeading,
    ComponentStatusBadge,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">Label</h1>
        <p class="text-muted-foreground">
          Renders an accessible label associated with controls.
        </p>
        <app-component-status-badge [status]="componentStatus" />
      </div>

      <section class="space-y-8">
        <h2 toc class="text-xl font-semibold tracking-tight">Examples</h2>
        <app-basic-label-demo-container />
        <app-checkbox-label-demo-container />
        <app-field-label-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LabelPage {
  readonly componentStatus = COMPONENTS.find((c) => c.path === 'label')!.status;
}
