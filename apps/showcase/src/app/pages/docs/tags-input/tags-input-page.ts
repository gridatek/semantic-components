import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { BasicTagsInputDemoContainer } from './demos/basic-tags-input-demo-container';
import { BlurTagsInputDemoContainer } from './demos/blur-tags-input-demo-container';
import { ClearableTagsInputDemoContainer } from './demos/clearable-tags-input-demo-container';
import { DelimitersTagsInputDemoContainer } from './demos/delimiters-tags-input-demo-container';
import { DisabledTagsInputDemoContainer } from './demos/disabled-tags-input-demo-container';
import { DuplicatesTagsInputDemoContainer } from './demos/duplicates-tags-input-demo-container';
import { EmailTagsInputDemoContainer } from './demos/email-tags-input-demo-container';
import { FormFieldTagsInputDemoContainer } from './demos/form-field-tags-input-demo-container';
import { MaxTagsTagsInputDemoContainer } from './demos/max-tags-tags-input-demo-container';
import { OutputTagsInputDemoContainer } from './demos/output-tags-input-demo-container';
import { ValidationTagsInputDemoContainer } from './demos/validation-tags-input-demo-container';
import { VariantsTagsInputDemoContainer } from './demos/variants-tags-input-demo-container';

@Component({
  selector: 'app-tags-input-page',
  imports: [
    BasicTagsInputDemoContainer,
    ClearableTagsInputDemoContainer,
    MaxTagsTagsInputDemoContainer,
    VariantsTagsInputDemoContainer,
    DuplicatesTagsInputDemoContainer,
    DelimitersTagsInputDemoContainer,
    BlurTagsInputDemoContainer,
    DisabledTagsInputDemoContainer,
    ValidationTagsInputDemoContainer,
    FormFieldTagsInputDemoContainer,
    EmailTagsInputDemoContainer,
    OutputTagsInputDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Tag Input</h1>
        <p class="text-muted-foreground">
          A multi-tag input component with chips for adding and removing tags.
        </p>
        <app-component-badges path="tags-input" />
      </div>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-basic-tags-input-demo-container />
        <app-clearable-tags-input-demo-container />
        <app-max-tags-tags-input-demo-container />
        <app-variants-tags-input-demo-container />
        <app-duplicates-tags-input-demo-container />
        <app-delimiters-tags-input-demo-container />
        <app-blur-tags-input-demo-container />
        <app-disabled-tags-input-demo-container />
        <app-validation-tags-input-demo-container />
        <app-form-field-tags-input-demo-container />
        <app-email-tags-input-demo-container />
        <app-output-tags-input-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TagsInputPage {}
