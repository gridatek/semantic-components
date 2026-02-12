import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { BasicCopyButtonDemoContainer } from './demos/basic-copy-button-demo-container';
import { VariantsCopyButtonDemoContainer } from './demos/variants-copy-button-demo-container';
import { SizesCopyButtonDemoContainer } from './demos/sizes-copy-button-demo-container';
import { WithtextCopyButtonDemoContainer } from './demos/withtext-copy-button-demo-container';
import { InputCopyButtonDemoContainer } from './demos/input-copy-button-demo-container';
import { CodeCopyButtonDemoContainer } from './demos/code-copy-button-demo-container';
import { InlineCopyButtonDemoContainer } from './demos/inline-copy-button-demo-container';
import { TimeoutCopyButtonDemoContainer } from './demos/timeout-copy-button-demo-container';
import { DisabledCopyButtonDemoContainer } from './demos/disabled-copy-button-demo-container';
import { UsecasesCopyButtonDemoContainer } from './demos/usecases-copy-button-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentStatusBadge } from '../../../components/component-status-badge/component-status-badge';
import { COMPONENTS } from '../../../data/components';

@Component({
  selector: 'app-copy-button-page',
  imports: [
    BasicCopyButtonDemoContainer,
    VariantsCopyButtonDemoContainer,
    SizesCopyButtonDemoContainer,
    WithtextCopyButtonDemoContainer,
    InputCopyButtonDemoContainer,
    CodeCopyButtonDemoContainer,
    InlineCopyButtonDemoContainer,
    TimeoutCopyButtonDemoContainer,
    DisabledCopyButtonDemoContainer,
    UsecasesCopyButtonDemoContainer,
    TocHeading,
    ComponentStatusBadge,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">CopyButton</h1>
        <p class="text-muted-foreground">
          A button component that copies text to clipboard with visual feedback.
        </p>
        <app-component-status-badge [status]="componentStatus" />
      </div>

      <section class="space-y-8">
        <h2 toc class="text-xl font-semibold tracking-tight">Examples</h2>
        <app-basic-copy-button-demo-container />
        <app-variants-copy-button-demo-container />
        <app-sizes-copy-button-demo-container />
        <app-withtext-copy-button-demo-container />
        <app-input-copy-button-demo-container />
        <app-code-copy-button-demo-container />
        <app-inline-copy-button-demo-container />
        <app-timeout-copy-button-demo-container />
        <app-disabled-copy-button-demo-container />
        <app-usecases-copy-button-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CopyButtonPage {
  readonly componentStatus = COMPONENTS.find((c) => c.path === 'copy-button')!
    .status;
}
