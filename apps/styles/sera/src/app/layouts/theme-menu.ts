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
  type ScMode,
  ScPresetManager,
} from '@semantic-components/ui';
import {
  SiCheckIcon,
  SiMoonIcon,
  SiSunIcon,
} from '@semantic-icons/lucide-icons';

/** Light, dark or the system's: the library's preset manager (saved, a cookie). */
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
        @if (preset.isDark()) {
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
              [value]="preset.mode()"
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
  private readonly preset = inject(ScPresetManager);
  private readonly modes: { value: ScMode; label: string }[] = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
    { value: 'system', label: 'System' },
  ];

  private setMode(mode: string | null): void {
    if (mode === 'light' || mode === 'dark' || mode === 'system')
      this.preset.setMode(mode);
  }
}
