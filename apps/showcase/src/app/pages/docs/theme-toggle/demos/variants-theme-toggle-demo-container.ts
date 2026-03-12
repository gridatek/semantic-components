import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { VariantsThemeToggleDemo } from './variants-theme-toggle-demo';

@Component({
  selector: 'app-variants-theme-toggle-demo-container',
  imports: [DemoContainer, VariantsThemeToggleDemo],
  template: `
    <app-demo-container
      title="Variants"
      demoUrl="/demos/theme-toggle/variants-theme-toggle-demo"
      [code]="code"
    >
      <app-variants-theme-toggle-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VariantsThemeToggleDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScButton } from '@semantic-components/ui';
import { ScThemeToggle } from '@semantic-components/ui-lab';
import { SiMoonIcon, SiSunIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-variants-theme-toggle-demo',
  imports: [ScButton, ScThemeToggle, SiSunIcon, SiMoonIcon],
  template: \`
    <div class="flex items-center gap-4">
      <div class="flex flex-col items-center gap-2">
        <button scButton scThemeToggle #toggle1="scThemeToggle" size="icon">
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
          scThemeToggle
          variant="outline"
          #toggle2="scThemeToggle"
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
          scThemeToggle
          variant="ghost"
          #toggle3="scThemeToggle"
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
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VariantsThemeToggleDemo {}`;
}
