import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScButton } from '@semantic-components/ui';
import { ScThemeModeToggle } from '@semantic-components/ui-lab';
import { SiMoonIcon, SiSunIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-sizes-theme-toggle-demo',
  imports: [ScButton, ScThemeModeToggle, SiSunIcon, SiMoonIcon],
  template: `
    <div class="flex items-center gap-4">
      <div class="flex flex-col items-center gap-2">
        <button
          scButton
          scThemeModeToggle
          variant="outline"
          size="sm"
          #toggle1="scThemeModeToggle"
        >
          @if (toggle1.isDark()) {
            <svg siSunIcon></svg>
            <span class="sr-only">Switch to light theme</span>
          } @else {
            <svg siMoonIcon></svg>
            <span class="sr-only">Switch to dark theme</span>
          }
        </button>
        <span class="text-muted-foreground text-xs">Small</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <button
          scButton
          scThemeModeToggle
          variant="outline"
          #toggle2="scThemeModeToggle"
        >
          @if (toggle2.isDark()) {
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
          size="lg"
          #toggle3="scThemeModeToggle"
        >
          @if (toggle3.isDark()) {
            <svg siSunIcon></svg>
            <span class="sr-only">Switch to light theme</span>
          } @else {
            <svg siMoonIcon></svg>
            <span class="sr-only">Switch to dark theme</span>
          }
        </button>
        <span class="text-muted-foreground text-xs">Large</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <button
          scButton
          scThemeModeToggle
          variant="outline"
          size="icon"
          #toggle4="scThemeModeToggle"
        >
          @if (toggle4.isDark()) {
            <svg siSunIcon></svg>
            <span class="sr-only">Switch to light theme</span>
          } @else {
            <svg siMoonIcon></svg>
            <span class="sr-only">Switch to dark theme</span>
          }
        </button>
        <span class="text-muted-foreground text-xs">Icon</span>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SizesThemeToggleDemo {}
