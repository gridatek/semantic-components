import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { BasicTagInputDemoContainer } from './demos/basic-tag-input-demo-container';
import { BlurTagInputDemoContainer } from './demos/blur-tag-input-demo-container';
import { ClearableTagInputDemoContainer } from './demos/clearable-tag-input-demo-container';
import { DelimitersTagInputDemoContainer } from './demos/delimiters-tag-input-demo-container';
import { DisabledTagInputDemoContainer } from './demos/disabled-tag-input-demo-container';
import { DuplicatesTagInputDemoContainer } from './demos/duplicates-tag-input-demo-container';
import { EmailTagInputDemoContainer } from './demos/email-tag-input-demo-container';
import { FormFieldTagInputDemoContainer } from './demos/form-field-tag-input-demo-container';
import { MaxTagsTagInputDemoContainer } from './demos/max-tags-tag-input-demo-container';
import { OutputTagInputDemoContainer } from './demos/output-tag-input-demo-container';
import { ValidationTagInputDemoContainer } from './demos/validation-tag-input-demo-container';
import { VariantsTagInputDemoContainer } from './demos/variants-tag-input-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentStatusBadge } from '../../../components/component-status-badge/component-status-badge';
import { COMPONENTS } from '../../../data/components';

@Component({
  selector: 'app-tag-input-page',
  imports: [
    BasicTagInputDemoContainer,
    ClearableTagInputDemoContainer,
    MaxTagsTagInputDemoContainer,
    VariantsTagInputDemoContainer,
    DuplicatesTagInputDemoContainer,
    DelimitersTagInputDemoContainer,
    BlurTagInputDemoContainer,
    DisabledTagInputDemoContainer,
    ValidationTagInputDemoContainer,
    FormFieldTagInputDemoContainer,
    EmailTagInputDemoContainer,
    OutputTagInputDemoContainer,
    TocHeading,
    ComponentStatusBadge,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">TagInput</h1>
        <p class="text-muted-foreground">
          A multi-tag input component with chips for adding and removing tags.
        </p>
        <app-component-status-badge [status]="componentStatus" />
      </div>

      <section class="space-y-8">
        <h2 toc class="text-xl font-semibold tracking-tight">Examples</h2>
        <app-basic-tag-input-demo-container />
        <app-clearable-tag-input-demo-container />
        <app-max-tags-tag-input-demo-container />
        <app-variants-tag-input-demo-container />
        <app-duplicates-tag-input-demo-container />
        <app-delimiters-tag-input-demo-container />
        <app-blur-tag-input-demo-container />
        <app-disabled-tag-input-demo-container />
        <app-validation-tag-input-demo-container />
        <app-form-field-tag-input-demo-container />
        <app-email-tag-input-demo-container />
        <app-output-tag-input-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TagInputPage {
  readonly componentStatus = COMPONENTS.find((c) => c.path === 'tag-input')!
    .status;
}
