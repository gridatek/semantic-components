import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { BasicTextareaDemoContainer } from './demos/basic-textarea-demo-container';
import { DisabledTextareaDemoContainer } from './demos/disabled-textarea-demo-container';
import { FormTextareaDemoContainer } from './demos/form-textarea-demo-container';
import { HelperTextTextareaDemoContainer } from './demos/helper-text-textarea-demo-container';
import { LabelTextareaDemoContainer } from './demos/label-textarea-demo-container';
import { MaxlengthTextareaDemoContainer } from './demos/maxlength-textarea-demo-container';
import { RowsTextareaDemoContainer } from './demos/rows-textarea-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentStatusBadge } from '../../../components/component-status-badge/component-status-badge';
import { COMPONENTS } from '../../../data/components';

@Component({
  selector: 'app-textarea-page',
  imports: [
    BasicTextareaDemoContainer,
    LabelTextareaDemoContainer,
    HelperTextTextareaDemoContainer,
    RowsTextareaDemoContainer,
    DisabledTextareaDemoContainer,
    MaxlengthTextareaDemoContainer,
    FormTextareaDemoContainer,
    TocHeading,
    ComponentStatusBadge,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">Textarea</h1>
        <p class="text-muted-foreground">
          Displays a form textarea or a component that looks like a textarea.
        </p>
        <app-component-status-badge [status]="componentStatus" />
      </div>

      <section class="space-y-8">
        <h2 toc class="text-xl font-semibold tracking-tight">Examples</h2>
        <app-basic-textarea-demo-container />
        <app-label-textarea-demo-container />
        <app-helper-text-textarea-demo-container />
        <app-rows-textarea-demo-container />
        <app-disabled-textarea-demo-container />
        <app-maxlength-textarea-demo-container />
        <app-form-textarea-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TextareaPage {
  readonly componentStatus = COMPONENTS.find((c) => c.path === 'textarea')!
    .status;
}
