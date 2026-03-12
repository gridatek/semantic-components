import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScButton, ScThemeModeToggle } from '@semantic-components/ui';
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
            <span class="sr-only">Switch to light theme</span>
          } @else {
            <svg siMoonIcon></svg>
            <span class="sr-only">Switch to dark theme</span>
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
            <span class="sr-only">Switch to light theme</span>
          } @else {
            <svg siMoonIcon></svg>
            <span class="sr-only">Switch to dark theme</span>
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
            <span class="sr-only">Switch to light theme</span>
          } @else {
            <svg siMoonIcon></svg>
            <span class="sr-only">Switch to dark theme</span>
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
