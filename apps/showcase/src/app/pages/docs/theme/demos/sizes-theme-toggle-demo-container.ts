import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SizesThemeToggleDemo } from './sizes-theme-toggle-demo';

@Component({
  selector: 'app-sizes-theme-toggle-demo-container',
  imports: [DemoContainer, SizesThemeToggleDemo],
  template: `
    <app-demo-container
      title="Sizes"
      demoUrl="/demos/theme-toggle/sizes-theme-toggle-demo"
      [code]="code"
    >
      <app-sizes-theme-toggle-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SizesThemeToggleDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScButton } from '@semantic-components/ui';
import { ScThemeToggle } from '@semantic-components/ui-lab';
import { SiMoonIcon, SiSunIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-sizes-theme-toggle-demo',
  imports: [ScButton, ScThemeToggle, SiSunIcon, SiMoonIcon],
  template: \`
    <div class="flex items-center gap-4">
      <div class="flex flex-col items-center gap-2">
        <button
          scButton
          scThemeToggle
          variant="outline"
          size="sm"
          #toggle1="scThemeToggle"
        >
          @if (toggle1.isDark()) {
            <svg siSunIcon></svg>
          } @else {
            <svg siMoonIcon></svg>
          }
        </button>
        <span class="text-muted-foreground text-xs">Small</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <button
          scButton
          scThemeToggle
          variant="outline"
          #toggle2="scThemeToggle"
        >
          @if (toggle2.isDark()) {
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
          scThemeToggle
          variant="outline"
          size="lg"
          #toggle3="scThemeToggle"
        >
          @if (toggle3.isDark()) {
            <svg siSunIcon></svg>
          } @else {
            <svg siMoonIcon></svg>
          }
        </button>
        <span class="text-muted-foreground text-xs">Large</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <button
          scButton
          scThemeToggle
          variant="outline"
          size="icon"
          #toggle4="scThemeToggle"
        >
          @if (toggle4.isDark()) {
            <svg siSunIcon></svg>
          } @else {
            <svg siMoonIcon></svg>
          }
        </button>
        <span class="text-muted-foreground text-xs">Icon</span>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SizesThemeToggleDemo {}`;
}
