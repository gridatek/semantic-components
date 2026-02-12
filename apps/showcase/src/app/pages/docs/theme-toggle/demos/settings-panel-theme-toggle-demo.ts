import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScThemeSelect } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-settings-panel-theme-toggle-demo',
  imports: [ScThemeSelect],
  template: `
    <div class="w-[400px] rounded-lg border p-4">
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <div class="space-y-0.5">
            <label for="settings-theme" class="text-sm font-medium">
              Theme
            </label>
            <p class="text-sm text-muted-foreground">
              Select your preferred theme
            </p>
          </div>
          <select sc-theme-select id="settings-theme" class="w-32">
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system">System</option>
          </select>
        </div>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsPanelThemeToggleDemo {}
