import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  ViewEncapsulation,
  booleanAttribute,
  inject,
  input,
} from '@angular/core';
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
  ScSidebarMenuButton,
} from '@semantic-components/ui';
import {
  SiCheckIcon,
  SiMonitorIcon,
  SiMoonIcon,
  SiSunIcon,
} from '@semantic-icons/lucide-icons';

/**
 * The theme: Light, Dark or System (the OS's), in a menu. In the header a
 * ghost icon button; in the sidebar's footer its menu button, the menu opening
 * upward.
 */
@Component({
  selector: 'app-theme-menu',
  imports: [
    NgTemplateOutlet,
    ScButton,
    ScMenu,
    ScMenuContent,
    ScMenuItemIndicator,
    ScMenuPortal,
    ScMenuProvider,
    ScMenuRadioGroup,
    ScMenuRadioItem,
    ScMenuTrigger,
    ScSidebarMenuButton,
    SiCheckIcon,
    SiMonitorIcon,
    SiMoonIcon,
    SiSunIcon,
  ],
  template: `
    <div
      scMenuProvider
      [side]="inSidebar() ? 'top' : 'bottom'"
      [alignment]="inSidebar() ? 'start' : 'end'"
    >
      @if (inSidebar()) {
        <button
          scSidebarMenuButton
          scMenuTrigger
          variant="outline"
          class="justify-center"
        >
          <ng-container *ngTemplateOutlet="icon" />
        </button>
      } @else {
        <button scButton scMenuTrigger variant="ghost" size="icon">
          <ng-container *ngTemplateOutlet="icon" />
        </button>
      }
      <ng-template scMenuPortal>
        <div scMenu class="w-36">
          <ng-template scMenuContent>
            <div
              scMenuRadioGroup
              [value]="presetManager.mode()"
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

    <ng-template #icon>
      @switch (presetManager.mode()) {
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
    </ng-template>
  `,
  host: { class: 'contents' },
  encapsulation: ViewEncapsulation.None,
})
export class ThemeMenu {
  /** In the sidebar's footer: its menu button, the menu above. */
  readonly inSidebar = input(false, { transform: booleanAttribute });

  private readonly presetManager = inject(ScPresetManager);

  private readonly modes: readonly { value: ScMode; label: string }[] = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
    { value: 'system', label: 'System' },
  ];

  private setMode(value: string | null): void {
    const mode = this.modes.find((m) => m.value === value);
    if (mode) this.presetManager.setMode(mode.value);
  }
}
