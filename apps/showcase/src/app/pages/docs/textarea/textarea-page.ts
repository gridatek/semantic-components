import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { BasicTextareaDemoContainer } from './demos/basic-textarea-demo-container';
import { DisabledTextareaDemoContainer } from './demos/disabled-textarea-demo-container';
import { FormTextareaDemoContainer } from './demos/form-textarea-demo-container';
import { HelperTextTextareaDemoContainer } from './demos/helper-text-textarea-demo-container';
import { LabelTextareaDemoContainer } from './demos/label-textarea-demo-container';
import { MaxlengthTextareaDemoContainer } from './demos/maxlength-textarea-demo-container';
import { RowsTextareaDemoContainer } from './demos/rows-textarea-demo-container';

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
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Textarea</h1>
        <p class="text-muted-foreground">
          Displays a form textarea or a component that looks like a textarea.
        </p>
        <app-component-badges path="textarea" />
      </div>

      <section class="space-y-8">
        <h2 scHeading toc>Examples</h2>
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
export default class TextareaPage {}
