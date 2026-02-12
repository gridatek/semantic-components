import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { BasicMentionInputDemoContainer } from './demos/basic-mention-input-demo-container';
import { AvatarsMentionInputDemoContainer } from './demos/avatars-mention-input-demo-container';
import { CustomTriggerMentionInputDemoContainer } from './demos/custom-trigger-mention-input-demo-container';
import { DisabledMentionInputDemoContainer } from './demos/disabled-mention-input-demo-container';
import { FormMentionInputDemoContainer } from './demos/form-mention-input-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentStatusBadge } from '../../../components/component-status-badge/component-status-badge';
import { COMPONENTS } from '../../../data/components';

@Component({
  selector: 'app-mention-input-page',
  imports: [
    BasicMentionInputDemoContainer,
    AvatarsMentionInputDemoContainer,
    CustomTriggerMentionInputDemoContainer,
    DisabledMentionInputDemoContainer,
    FormMentionInputDemoContainer,
    TocHeading,
    ComponentStatusBadge,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">MentionInput</h1>
        <p class="text-muted-foreground">
          Text input with &#64;mention support for users, channels, or custom
          entities.
        </p>
        <app-component-status-badge [status]="componentStatus" />
      </div>

      <section class="space-y-8">
        <h2 toc class="text-xl font-semibold tracking-tight">Examples</h2>
        <app-basic-mention-input-demo-container />
        <app-avatars-mention-input-demo-container />
        <app-custom-trigger-mention-input-demo-container />
        <app-disabled-mention-input-demo-container />
        <app-form-mention-input-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class MentionInputPage {
  readonly componentStatus = COMPONENTS.find((c) => c.path === 'mention-input')!
    .status;
}
