import { Component, ViewEncapsulation, inject } from '@angular/core';
import {
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
    ScNativeSelect,
    ScNativeSelectContainer,
    ScNativeSelectIcon,
    ScNativeSelectOption,
    SiChevronDownIcon,
  ],
  template: `
    <div class="w-[400px] rounded-lg border p-4">
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
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SettingsPanelThemeToggleDemo {
  protected readonly themeManager = inject(ScThemeManager);

  protected onThemeChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.themeManager.setMode(target.value as ScThemeMode);
  }
}
