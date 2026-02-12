import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { BasicSplitButtonDemoContainer } from './demos/basic-split-button-demo-container';
import { VariantsSplitButtonDemoContainer } from './demos/variants-split-button-demo-container';
import { SizesSplitButtonDemoContainer } from './demos/sizes-split-button-demo-container';
import { IconsSplitButtonDemoContainer } from './demos/icons-split-button-demo-container';
import { DestructiveSplitButtonDemoContainer } from './demos/destructive-split-button-demo-container';
import { DisabledSplitButtonDemoContainer } from './demos/disabled-split-button-demo-container';
import { FormSplitButtonDemoContainer } from './demos/form-split-button-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentStatusBadge } from '../../../components/component-status-badge/component-status-badge';
import { COMPONENTS } from '../../../data/components';

@Component({
  selector: 'app-split-button-page',
  imports: [
    BasicSplitButtonDemoContainer,
    VariantsSplitButtonDemoContainer,
    SizesSplitButtonDemoContainer,
    IconsSplitButtonDemoContainer,
    DestructiveSplitButtonDemoContainer,
    DisabledSplitButtonDemoContainer,
    FormSplitButtonDemoContainer,
    TocHeading,
    ComponentStatusBadge,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">SplitButton</h1>
        <p class="text-muted-foreground">
          A button with a main action and a dropdown for additional related
          actions.
        </p>
        <app-component-status-badge [status]="componentStatus" />
      </div>

      <section class="space-y-8">
        <h2 toc class="text-xl font-semibold tracking-tight">Examples</h2>
        <app-basic-split-button-demo-container />
        <app-variants-split-button-demo-container />
        <app-sizes-split-button-demo-container />
        <app-icons-split-button-demo-container />
        <app-destructive-split-button-demo-container />
        <app-disabled-split-button-demo-container />
        <app-form-split-button-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SplitButtonPage {
  readonly componentStatus = COMPONENTS.find((c) => c.path === 'split-button')!
    .status;
}
