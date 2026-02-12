import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { BadgeNoIconTimezoneDemoContainer } from './demos/badge-no-icon-timezone-demo-container';
import { BadgeTimezoneDemoContainer } from './demos/badge-timezone-demo-container';
import { BasicSelectTimezoneDemoContainer } from './demos/basic-select-timezone-demo-container';
import { ButtonOffsetTimezoneDemoContainer } from './demos/button-offset-timezone-demo-container';
import { ButtonTimezoneDemoContainer } from './demos/button-timezone-demo-container';
import { CurrentTimeTimezoneDemoContainer } from './demos/current-time-timezone-demo-container';
import { DisplayOffsetTimezoneDemoContainer } from './demos/display-offset-timezone-demo-container';
import { DisplayTimezoneDemoContainer } from './demos/display-timezone-demo-container';
import { IconOnlyTimezoneDemoContainer } from './demos/icon-only-timezone-demo-container';
import { NavigationTimezoneDemoContainer } from './demos/navigation-timezone-demo-container';
import { NoAbbrTimezoneDemoContainer } from './demos/no-abbr-timezone-demo-container';
import { NoOffsetTimezoneDemoContainer } from './demos/no-offset-timezone-demo-container';
import { SettingsPanelTimezoneDemoContainer } from './demos/settings-panel-timezone-demo-container';
import { SizesTimezoneDemoContainer } from './demos/sizes-timezone-demo-container';
import { VariantsTimezoneDemoContainer } from './demos/variants-timezone-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentStatusBadge } from '../../../components/component-status-badge/component-status-badge';
import { COMPONENTS } from '../../../data/components';

@Component({
  selector: 'app-timezone-page',
  imports: [
    BasicSelectTimezoneDemoContainer,
    NoAbbrTimezoneDemoContainer,
    NoOffsetTimezoneDemoContainer,
    DisplayTimezoneDemoContainer,
    DisplayOffsetTimezoneDemoContainer,
    IconOnlyTimezoneDemoContainer,
    VariantsTimezoneDemoContainer,
    SizesTimezoneDemoContainer,
    ButtonTimezoneDemoContainer,
    ButtonOffsetTimezoneDemoContainer,
    BadgeTimezoneDemoContainer,
    BadgeNoIconTimezoneDemoContainer,
    NavigationTimezoneDemoContainer,
    SettingsPanelTimezoneDemoContainer,
    CurrentTimeTimezoneDemoContainer,
    TocHeading,
    ComponentStatusBadge,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">Timezone</h1>
        <p class="text-muted-foreground">
          A component for selecting and displaying timezones. Supports
          persisting user preferences and formatting dates/times in the selected
          timezone.
        </p>
        <app-component-status-badge [status]="componentStatus" />
      </div>

      <section class="space-y-8">
        <h2 toc class="text-xl font-semibold tracking-tight">Examples</h2>
        <app-basic-select-timezone-demo-container />
        <app-no-abbr-timezone-demo-container />
        <app-no-offset-timezone-demo-container />
        <app-display-timezone-demo-container />
        <app-display-offset-timezone-demo-container />
        <app-icon-only-timezone-demo-container />
        <app-variants-timezone-demo-container />
        <app-sizes-timezone-demo-container />
        <app-button-timezone-demo-container />
        <app-button-offset-timezone-demo-container />
        <app-badge-timezone-demo-container />
        <app-badge-no-icon-timezone-demo-container />
        <app-navigation-timezone-demo-container />
        <app-settings-panel-timezone-demo-container />
        <app-current-time-timezone-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TimezonePage {
  readonly componentStatus = COMPONENTS.find((c) => c.path === 'timezone')!
    .status;
}
