import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { BasicThemeToggleDemoContainer } from './demos/basic-theme-toggle-demo-container';
import { NavigationThemeToggleDemoContainer } from './demos/navigation-theme-toggle-demo-container';
import { SettingsPanelThemeToggleDemoContainer } from './demos/settings-panel-theme-toggle-demo-container';
import { SizesThemeToggleDemoContainer } from './demos/sizes-theme-toggle-demo-container';
import { ThemeSelectDemoContainer } from './demos/theme-select-demo-container';
import { VariantsThemeToggleDemoContainer } from './demos/variants-theme-toggle-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentBadges } from '../../../components/component-badges/component-badges';

@Component({
  selector: 'app-theme-toggle-page',
  imports: [
    BasicThemeToggleDemoContainer,
    VariantsThemeToggleDemoContainer,
    SizesThemeToggleDemoContainer,
    ThemeSelectDemoContainer,
    NavigationThemeToggleDemoContainer,
    SettingsPanelThemeToggleDemoContainer,
    TocHeading,
    ComponentBadges,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">ThemeToggle</h1>
        <p class="text-muted-foreground">
          A component for switching between light and dark themes with system
          preference support.
        </p>
        <app-component-badges path="theme-toggle" />
      </div>

      <section class="space-y-8">
        <h2 toc class="text-xl font-semibold tracking-tight">Examples</h2>
        <app-basic-theme-toggle-demo-container />
        <app-variants-theme-toggle-demo-container />
        <app-sizes-theme-toggle-demo-container />
        <app-theme-select-demo-container />
        <app-navigation-theme-toggle-demo-container />
        <app-settings-panel-theme-toggle-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ThemeTogglePage {}
