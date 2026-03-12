import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScButton } from '@semantic-components/ui';
import { ScThemeModeToggle } from '@semantic-components/ui-lab';
import { SiMoonIcon, SiSunIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-variants-theme-toggle-demo',
  imports: [ScButton, ScThemeModeToggle, SiSunIcon, SiMoonIcon],
  template: `
    <div class="flex items-center gap-4">
      <div class="flex flex-col items-center gap-2">
        <button
          scButton
          scThemeModeToggle
          #toggle1="scThemeModeToggle"
          size="icon"
        >
          @if (toggle1.isDark()) {
            <svg siSunIcon></svg>
          } @else {
            <svg siMoonIcon></svg>
          }
        </button>
        <span class="text-muted-foreground text-xs">Default</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <button
          scButton
          scThemeModeToggle
          variant="outline"
          #toggle2="scThemeModeToggle"
          size="icon"
        >
          @if (toggle2.isDark()) {
            <svg siSunIcon></svg>
          } @else {
            <svg siMoonIcon></svg>
          }
        </button>
        <span class="text-muted-foreground text-xs">Outline</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <button
          scButton
          scThemeModeToggle
          variant="ghost"
          #toggle3="scThemeModeToggle"
          size="icon"
        >
          @if (toggle3.isDark()) {
            <svg siSunIcon></svg>
          } @else {
            <svg siMoonIcon></svg>
          }
        </button>
        <span class="text-muted-foreground text-xs">Ghost</span>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VariantsThemeToggleDemo {}
