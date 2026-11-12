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
  SiMonitorIcon,
  SiMoonIcon,
  SiSunIcon,
} from '@semantic-icons/lucide-icons';

/** Light, Dark or System (the OS's) in a menu: the mode is the radio group's value. */
@Component({
  selector: 'app-menu-theme-demo',
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
    SiMonitorIcon,
    SiMoonIcon,
    SiSunIcon,
  ],
  template: `
    <div scMenuProvider align="end">
      <button scButton scMenuTrigger variant="outline" size="icon">
        @switch (themeManager.mode()) {
          @case ('light') {
            <svg siSunIcon></svg>
          }
          @case ('dark') {
            <svg siMoonIcon></svg>
          }
          @default {
            <svg siMonitorIcon></svg>
          }
        }
        <span class="sr-only">Theme</span>
      </button>
      <ng-template scMenuPortal>
        <div scMenu class="w-36">
          <ng-template scMenuContent>
            <div
              scMenuRadioGroup
              [value]="themeManager.mode()"
              (valueChange)="setMode($event)"
            >
              @for (mode of modes; track mode.value) {
                <div scMenuRadioItem [value]="mode.value">
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
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class MenuThemeDemo {
  protected readonly themeManager = inject(ScThemeManager);

  protected readonly modes: readonly { value: ScThemeMode; label: string }[] = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
    { value: 'system', label: 'System' },
  ];

  protected setMode(value: string | null): void {
    const mode = this.modes.find((m) => m.value === value);
    if (mode) this.themeManager.setMode(mode.value);
  }
}
