import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import {
  ScNativeSelect,
  ScThemeManager,
  ScThemeMode,
} from '@semantic-components/ui';

@Component({
  selector: 'app-settings-panel-theme-toggle-demo',
  imports: [ScNativeSelect],
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
          <select
            scNativeSelect
            class="w-32"
            [value]="themeManager.mode()"
            (change)="onThemeChange($event)"
          >
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
export class SettingsPanelThemeToggleDemo {
  protected readonly themeManager = inject(ScThemeManager);

  protected onThemeChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.themeManager.setMode(target.value as ScThemeMode);
  }
}
