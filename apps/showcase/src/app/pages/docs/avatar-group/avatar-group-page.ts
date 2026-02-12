import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { BasicAvatarGroupDemoContainer } from './demos/basic-avatar-group-demo-container';
import { FallbackAvatarGroupDemoContainer } from './demos/fallback-avatar-group-demo-container';
import { MaxCountAvatarGroupDemoContainer } from './demos/max-count-avatar-group-demo-container';
import { SizesAvatarGroupDemoContainer } from './demos/sizes-avatar-group-demo-container';
import { SpacingAvatarGroupDemoContainer } from './demos/spacing-avatar-group-demo-container';
import { TeamAvatarGroupDemoContainer } from './demos/team-avatar-group-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentStatusBadge } from '../../../components/component-status-badge/component-status-badge';
import { COMPONENTS } from '../../../data/components';

@Component({
  selector: 'app-avatar-group-page',
  imports: [
    BasicAvatarGroupDemoContainer,
    SizesAvatarGroupDemoContainer,
    SpacingAvatarGroupDemoContainer,
    MaxCountAvatarGroupDemoContainer,
    FallbackAvatarGroupDemoContainer,
    TeamAvatarGroupDemoContainer,
    TocHeading,
    ComponentStatusBadge,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">AvatarGroup</h1>
        <p class="text-muted-foreground">
          Display a group of avatars with stacked/overlapping layout and
          overflow indicator.
        </p>
        <app-component-status-badge [status]="componentStatus" />
      </div>

      <section class="space-y-8">
        <h2 toc class="text-xl font-semibold tracking-tight">Examples</h2>
        <app-basic-avatar-group-demo-container />
        <app-sizes-avatar-group-demo-container />
        <app-spacing-avatar-group-demo-container />
        <app-max-count-avatar-group-demo-container />
        <app-fallback-avatar-group-demo-container />
        <app-team-avatar-group-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AvatarGroupPage {
  readonly componentStatus = COMPONENTS.find((c) => c.path === 'avatar-group')!
    .status;
}
