import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SettingsPanelThemeToggleDemo } from './settings-panel-theme-toggle-demo';

@Component({
  selector: 'app-settings-panel-theme-toggle-demo-container',
  imports: [DemoContainer, SettingsPanelThemeToggleDemo],
  template: `
    <app-demo-container
      title="Settings Panel"
      demoUrl="/demos/theme/settings-panel-theme-toggle-demo"
      [code]="code"
    >
      <app-settings-panel-theme-toggle-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class SettingsPanelThemeToggleDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, inject } from '@angular/core';
import {
  ScFrame,
  ScNativeSelect,
  ScNativeSelectContainer,
  ScNativeSelectIcon,
  ScNativeSelectOption,
  ScThemeManager,
  ScThemeMode,
} from '@semantic-components/ui';
import { SiChevronDownIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-settings-panel-theme-toggle-demo',
  imports: [
    ScFrame,
    ScNativeSelect,
    ScNativeSelectContainer,
    ScNativeSelectIcon,
    ScNativeSelectOption,
    SiChevronDownIcon,
  ],
  template: \`
    <div scFrame class="w-[400px] p-4">
      <div class="space-y-4">
        <label class="flex items-center justify-between">
          <div class="space-y-0.5">
            <span class="text-sm font-medium">Theme</span>
            <p class="text-muted-foreground text-sm">
              Select your preferred theme
            </p>
          </div>
          <div scNativeSelectContainer class="w-32">
            <select
              scNativeSelect
              [value]="themeManager.mode()"
              (change)="onThemeChange($event)"
            >
              <option scNativeSelectOption value="light">Light</option>
              <option scNativeSelectOption value="dark">Dark</option>
              <option scNativeSelectOption value="system">System</option>
            </select>
            <svg siChevronDownIcon scNativeSelectIcon></svg>
          </div>
        </label>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SettingsPanelThemeToggleDemo {
  private readonly themeManager = inject(ScThemeManager);

  private onThemeChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.themeManager.setMode(target.value as ScThemeMode);
  }
}`;
}
