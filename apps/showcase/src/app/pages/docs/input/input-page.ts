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
import { ComponentBadges } from '../../../components/component-badges/component-badges';

import { ScHeading } from '@semantic-components/ui';

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
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Input</h1>
        <p class="text-muted-foreground">
          Displays a form input field or a component that looks like an input
          field.
        </p>
        <app-component-badges path="input" />
      </div>

      <section class="space-y-8">
        <h2 scHeading toc>Examples</h2>
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
export default class InputPage {}
