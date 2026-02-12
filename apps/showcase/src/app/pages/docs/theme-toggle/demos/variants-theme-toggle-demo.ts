import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScThemeToggle } from '@semantic-components/ui-lab';
import { SiMoonIcon, SiSunIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-variants-theme-toggle-demo',
  imports: [ScThemeToggle, SiSunIcon, SiMoonIcon],
  template: `
    <div class="flex items-center gap-4">
      <div class="flex flex-col items-center gap-2">
        <button sc-theme-toggle variant="default" #toggle1="scThemeToggle">
          @if (toggle1.isDark()) {
            <svg si-sun-icon></svg>
          } @else {
            <svg si-moon-icon></svg>
          }
        </button>
        <span class="text-xs text-muted-foreground">Default</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <button sc-theme-toggle variant="outline" #toggle2="scThemeToggle">
          @if (toggle2.isDark()) {
            <svg si-sun-icon></svg>
          } @else {
            <svg si-moon-icon></svg>
          }
        </button>
        <span class="text-xs text-muted-foreground">Outline</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <button sc-theme-toggle variant="ghost" #toggle3="scThemeToggle">
          @if (toggle3.isDark()) {
            <svg si-sun-icon></svg>
          } @else {
            <svg si-moon-icon></svg>
          }
        </button>
        <span class="text-xs text-muted-foreground">Ghost</span>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VariantsThemeToggleDemo {}
