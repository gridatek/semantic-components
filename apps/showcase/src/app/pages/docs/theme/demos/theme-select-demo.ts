import { Component, ViewEncapsulation, inject } from '@angular/core';
import {
  ScLabel,
  ScNativeSelect,
  ScNativeSelectContainer,
  ScNativeSelectIcon,
  ScNativeSelectOption,
  ScThemeManager,
  ScThemeMode,
} from '@semantic-components/ui';
import { SiChevronDownIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-theme-select-demo',
  imports: [
    ScLabel,
    ScNativeSelect,
    ScNativeSelectContainer,
    ScNativeSelectIcon,
    ScNativeSelectOption,
    SiChevronDownIcon,
  ],
  template: `
    <div class="space-y-4">
      <div class="max-w-xs space-y-2">
        <label scLabel for="theme-select">Theme</label>
        <div scNativeSelectContainer class="w-full">
          <select
            scNativeSelect
            id="theme-select"
            [value]="themeManager.mode()"
            (change)="onThemeChange($event)"
          >
            <option scNativeSelectOption value="light">Light</option>
            <option scNativeSelectOption value="dark">Dark</option>
            <option scNativeSelectOption value="system">System</option>
          </select>
          <svg siChevronDownIcon scNativeSelectIcon></svg>
        </div>
      </div>
      <p class="text-muted-foreground text-sm">
        Select includes system preference option
      </p>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ThemeSelectDemo {
  protected readonly themeManager = inject(ScThemeManager);

  protected onThemeChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.themeManager.setMode(target.value as ScThemeMode);
  }
}
