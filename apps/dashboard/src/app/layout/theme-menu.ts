import { Component, ViewEncapsulation, inject } from '@angular/core';
import {
  ScButton,
  ScMenu,
  ScMenuContent,
  ScMenuItemIndicator,
  ScMenuPortal,
  ScMenuProvider,
  ScMenuRadioGroup,
  ScMenuRadioItem,
  ScMenuTrigger,
  ScThemeManager,
  type ScThemeMode,
} from '@semantic-components/ui';
import {
  SiCheckIcon,
  SiMoonIcon,
  SiSunIcon,
} from '@semantic-icons/lucide-icons';

/** Light, dark or the system's: the library's theme manager (saved, a cookie). */
@Component({
  selector: 'app-theme-menu',
  imports: [
    ScButton,
    ScMenu,
    ScMenuContent,
    ScMenuItemIndicator,
    ScMenuPortal,
    ScMenuProvider,
    ScMenuRadioGroup,
    ScMenuRadioItem,
    ScMenuTrigger,
    SiCheckIcon,
    SiMoonIcon,
    SiSunIcon,
  ],
  template: `
    <div scMenuProvider alignment="end">
      <button scButton scMenuTrigger variant="ghost" size="icon">
        @if (theme.isDark()) {
          <svg siMoonIcon></svg>
        } @else {
          <svg siSunIcon></svg>
        }
        <span class="sr-only">Theme</span>
      </button>
      <ng-template scMenuPortal>
        <div scMenu class="w-36">
          <ng-template scMenuContent>
            <div
              scMenuRadioGroup
              [value]="theme.mode()"
              (valueChange)="setMode($event)"
            >
              @for (mode of modes; track mode.value) {
                <div scMenuRadioItem closeOnClick [value]="mode.value">
                  <span scMenuItemIndicator><svg siCheckIcon></svg></span>
                  {{ mode.label }}
                </div>
              }
            </div>
          </ng-template>
        </div>
      </ng-template>
    </div>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
})
export class ThemeMenu {
  protected readonly theme = inject(ScThemeManager);
  protected readonly modes: { value: ScThemeMode; label: string }[] = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
    { value: 'system', label: 'System' },
  ];

  protected setMode(mode: string | null): void {
    if (mode === 'light' || mode === 'dark' || mode === 'system')
      this.theme.setMode(mode);
  }
}
