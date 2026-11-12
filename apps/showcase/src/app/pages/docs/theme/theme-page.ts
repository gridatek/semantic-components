import { Component, ViewEncapsulation } from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { BasicThemeToggleDemoContainer } from './demos/basic-theme-toggle-demo-container';
import { MenuThemeDemoContainer } from './demos/menu-theme-demo-container';
import { NavigationThemeToggleDemoContainer } from './demos/navigation-theme-toggle-demo-container';
import { SettingsPanelThemeToggleDemoContainer } from './demos/settings-panel-theme-toggle-demo-container';
import { ThemeSelectDemoContainer } from './demos/theme-select-demo-container';

@Component({
  selector: 'app-theme-page',
  imports: [
    BasicThemeToggleDemoContainer,
    MenuThemeDemoContainer,
    ThemeSelectDemoContainer,
    NavigationThemeToggleDemoContainer,
    SettingsPanelThemeToggleDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Theme</h1>
        <p class="text-muted-foreground">
          Light, dark or the system&apos;s: the theme manager, with a button or
          a menu of your own.
        </p>
        <app-component-badges path="theme" />
      </div>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-basic-theme-toggle-demo-container />
        <app-menu-theme-demo-container />
        <app-theme-select-demo-container />
        <app-navigation-theme-toggle-demo-container />
        <app-settings-panel-theme-toggle-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class ThemePage {}
