import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { BasicToggleLanguageSwitcherDemoContainer } from './demos/basic-toggle-language-switcher-demo-container';
import { ButtonLanguageSwitcherDemoContainer } from './demos/button-language-switcher-demo-container';
import { EnglishLabelsLanguageSwitcherDemoContainer } from './demos/english-labels-language-switcher-demo-container';
import { IconOnlyLanguageSwitcherDemoContainer } from './demos/icon-only-language-switcher-demo-container';
import { NavigationLanguageSwitcherDemoContainer } from './demos/navigation-language-switcher-demo-container';
import { SelectLanguageSwitcherDemoContainer } from './demos/select-language-switcher-demo-container';
import { SettingsPanelLanguageSwitcherDemoContainer } from './demos/settings-panel-language-switcher-demo-container';
import { SizesLanguageSwitcherDemoContainer } from './demos/sizes-language-switcher-demo-container';
import { VariantsLanguageSwitcherDemoContainer } from './demos/variants-language-switcher-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentStatusBadge } from '../../../components/component-status-badge/component-status-badge';
import { COMPONENTS } from '../../../data/components';

@Component({
  selector: 'app-language-switcher-page',
  imports: [
    BasicToggleLanguageSwitcherDemoContainer,
    IconOnlyLanguageSwitcherDemoContainer,
    VariantsLanguageSwitcherDemoContainer,
    SizesLanguageSwitcherDemoContainer,
    SelectLanguageSwitcherDemoContainer,
    EnglishLabelsLanguageSwitcherDemoContainer,
    ButtonLanguageSwitcherDemoContainer,
    NavigationLanguageSwitcherDemoContainer,
    SettingsPanelLanguageSwitcherDemoContainer,
    TocHeading,
    ComponentStatusBadge,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">LanguageSwitcher</h1>
        <p class="text-muted-foreground">
          A component for switching between languages with support for Angular
          localize. Changing the language will refresh the page to load the
          appropriate locale bundle.
        </p>
        <app-component-status-badge [status]="componentStatus" />
      </div>

      <section class="space-y-8">
        <h2 toc class="text-xl font-semibold tracking-tight">Examples</h2>
        <app-basic-toggle-language-switcher-demo-container />
        <app-icon-only-language-switcher-demo-container />
        <app-variants-language-switcher-demo-container />
        <app-sizes-language-switcher-demo-container />
        <app-select-language-switcher-demo-container />
        <app-english-labels-language-switcher-demo-container />
        <app-button-language-switcher-demo-container />
        <app-navigation-language-switcher-demo-container />
        <app-settings-panel-language-switcher-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LanguageSwitcherPage {
  readonly componentStatus = COMPONENTS.find(
    (c) => c.path === 'language-switcher',
  )!.status;
}
