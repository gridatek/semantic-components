import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { AvatarsMentionInputDemoContainer } from './demos/avatars-mention-input-demo-container';
import { BasicMentionInputDemoContainer } from './demos/basic-mention-input-demo-container';
import { CustomTriggerMentionInputDemoContainer } from './demos/custom-trigger-mention-input-demo-container';
import { DisabledMentionInputDemoContainer } from './demos/disabled-mention-input-demo-container';
import { FormMentionInputDemoContainer } from './demos/form-mention-input-demo-container';

@Component({
  selector: 'app-mention-input-page',
  imports: [
    BasicMentionInputDemoContainer,
    AvatarsMentionInputDemoContainer,
    CustomTriggerMentionInputDemoContainer,
    DisabledMentionInputDemoContainer,
    FormMentionInputDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>MentionInput</h1>
        <p class="text-muted-foreground">
          Text input with &#64;mention support for users, channels, or custom
          entities.
        </p>
        <app-component-badges path="mention-input" />
      </div>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
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
export default class MentionInputPage {}
