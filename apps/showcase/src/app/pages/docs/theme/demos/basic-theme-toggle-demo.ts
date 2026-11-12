import { Component, ViewEncapsulation, inject } from '@angular/core';
import { ScButton, ScThemeManager } from '@semantic-components/ui';
import { SiMoonIcon, SiSunIcon } from '@semantic-icons/lucide-icons';

/** One click between light and dark: any button calling toggleMode(); its name follows the state. */
@Component({
  selector: 'app-basic-theme-toggle-demo',
  imports: [ScButton, SiSunIcon, SiMoonIcon],
  template: `
    <div class="flex items-center gap-4">
      <button
        scButton
        variant="outline"
        size="icon"
        (click)="themeManager.toggleMode()"
      >
        @if (themeManager.isDark()) {
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
})
export class BasicThemeToggleDemo {
  protected readonly themeManager = inject(ScThemeManager);
}
