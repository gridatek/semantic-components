import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import {
  ScButton,
  ScThemeManager,
  ScThemeModeToggle,
} from '@semantic-components/ui';
import { SiMoonIcon, SiSunIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-basic-theme-toggle-demo',
  imports: [ScButton, ScThemeModeToggle, SiSunIcon, SiMoonIcon],
  template: `
    <div class="flex items-center gap-4">
      <button
        scButton
        scThemeModeToggle
        variant="outline"
        size="icon"
        #toggle="scThemeModeToggle"
      >
        @if (toggle.isDark()) {
          <svg siSunIcon></svg>
          <span class="sr-only">Switch to light theme</span>
        } @else {
          <svg siMoonIcon></svg>
          <span class="sr-only">Switch to dark theme</span>
        }
      </button>
      <span class="text-muted-foreground text-sm">
        Current: {{ themeManager.resolvedMode() }}
      </span>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicThemeToggleDemo {
  protected readonly themeManager = inject(ScThemeManager);
}
