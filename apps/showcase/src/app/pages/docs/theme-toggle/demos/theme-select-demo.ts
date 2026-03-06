import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScThemeField, ScThemeSelect } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-theme-select-demo',
  imports: [ScThemeField, ScThemeSelect],
  template: `
    <div class="space-y-4">
      <div scThemeField class="max-w-xs">
        <label class="text-sm font-medium">Theme</label>
        <select scThemeSelect>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="system">System</option>
        </select>
      </div>
      <p class="text-muted-foreground text-sm">
        Select includes system preference option
      </p>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeSelectDemo {}
