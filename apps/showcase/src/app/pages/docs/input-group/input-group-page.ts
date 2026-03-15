import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { BasicInputGroupDemoContainer } from './demos/basic-input-group-demo-container';
import { BlockEndInputGroupDemoContainer } from './demos/block-end-input-group-demo-container';
import { BlockStartInputGroupDemoContainer } from './demos/block-start-input-group-demo-container';
import { ButtonInputGroupDemoContainer } from './demos/button-input-group-demo-container';
import { DropdownInputGroupDemoContainer } from './demos/dropdown-input-group-demo-container';
import { IconInputGroupDemoContainer } from './demos/icon-input-group-demo-container';
import { InlineEndInputGroupDemoContainer } from './demos/inline-end-input-group-demo-container';
import { KbdInputGroupDemoContainer } from './demos/kbd-input-group-demo-container';
import { LabelInputGroupDemoContainer } from './demos/label-input-group-demo-container';
import { SpinnerInputGroupDemoContainer } from './demos/spinner-input-group-demo-container';
import { TextInputGroupDemoContainer } from './demos/text-input-group-demo-container';
import { TextareaInputGroupDemoContainer } from './demos/textarea-input-group-demo-container';

@Component({
  selector: 'app-input-group-page',
  imports: [
    BasicInputGroupDemoContainer,
    IconInputGroupDemoContainer,
    InlineEndInputGroupDemoContainer,
    BlockStartInputGroupDemoContainer,
    BlockEndInputGroupDemoContainer,
    ButtonInputGroupDemoContainer,
    TextInputGroupDemoContainer,
    KbdInputGroupDemoContainer,
    DropdownInputGroupDemoContainer,
    SpinnerInputGroupDemoContainer,
    LabelInputGroupDemoContainer,
    TextareaInputGroupDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Input Group</h1>
        <p class="text-muted-foreground">
          A composable input group for combining inputs with addons, buttons,
          and text.
        </p>
        <app-component-badges path="input-group" />
      </div>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-basic-input-group-demo-container />
        <app-icon-input-group-demo-container />
        <app-inline-end-input-group-demo-container />
        <app-block-start-input-group-demo-container />
        <app-block-end-input-group-demo-container />
        <app-button-input-group-demo-container />
        <app-text-input-group-demo-container />
        <app-kbd-input-group-demo-container />
        <app-dropdown-input-group-demo-container />
        <app-spinner-input-group-demo-container />
        <app-label-input-group-demo-container />
        <app-textarea-input-group-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class InputGroupPage {}
