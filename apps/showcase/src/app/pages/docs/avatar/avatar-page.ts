import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { BasicAvatarDemoContainer } from './demos/basic-avatar-demo-container';
import { FallbackAvatarDemoContainer } from './demos/fallback-avatar-demo-container';
import { SizesAvatarDemoContainer } from './demos/sizes-avatar-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentStatusBadge } from '../../../components/component-status-badge/component-status-badge';
import { COMPONENTS } from '../../../data/components';

@Component({
  selector: 'app-avatar-page',
  imports: [
    BasicAvatarDemoContainer,
    FallbackAvatarDemoContainer,
    SizesAvatarDemoContainer,
    TocHeading,
    ComponentStatusBadge,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">Avatar</h1>
        <p class="text-muted-foreground">
          An image element with a fallback for representing the user.
        </p>
        <app-component-status-badge [status]="componentStatus" />
      </div>

      <section class="space-y-8">
        <h2 toc class="text-xl font-semibold tracking-tight">Examples</h2>
        <app-basic-avatar-demo-container />
        <app-fallback-avatar-demo-container />
        <app-sizes-avatar-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AvatarPage {
  readonly componentStatus = COMPONENTS.find((c) => c.path === 'avatar')!
    .status;
}
