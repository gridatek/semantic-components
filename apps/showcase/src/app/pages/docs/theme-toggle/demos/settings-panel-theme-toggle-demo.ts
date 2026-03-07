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
        <label class="flex items-center justify-between">
          <div class="space-y-0.5">
            <span class="text-sm font-medium">Theme</span>
            <p class="text-muted-foreground text-sm">
              Select your preferred theme
            </p>
          </div>
          <select scThemeSelect class="w-32">
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system">System</option>
          </select>
        </label>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsPanelThemeToggleDemo {}
