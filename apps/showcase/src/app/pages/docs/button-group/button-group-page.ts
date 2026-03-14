import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ButtonGroupDemoContainer } from './demos/button-group-demo-container';
import { ButtonGroupInputDemoContainer } from './demos/button-group-input-demo-container';
import { ButtonGroupOrientationDemoContainer } from './demos/button-group-orientation-demo-container';
import { ButtonGroupSeparatorDemoContainer } from './demos/button-group-separator-demo-container';
import { ButtonGroupSizeDemoContainer } from './demos/button-group-size-demo-container';
import { ButtonGroupSplitDemoContainer } from './demos/button-group-split-demo-container';

@Component({
  selector: 'app-button-group-page',
  imports: [
    ButtonGroupDemoContainer,
    ButtonGroupOrientationDemoContainer,
    ButtonGroupSizeDemoContainer,
    ButtonGroupSeparatorDemoContainer,
    ButtonGroupSplitDemoContainer,
    ButtonGroupInputDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Button Group</h1>
        <p class="text-muted-foreground">
          Groups buttons together with merged borders and rounding.
        </p>
        <app-component-badges path="button-group" />
      </div>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-button-group-demo-container />
        <app-button-group-orientation-demo-container />
        <app-button-group-size-demo-container />
        <app-button-group-separator-demo-container />
        <app-button-group-split-demo-container />
        <app-button-group-input-demo-container />
      </section>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ButtonGroupPage {}
