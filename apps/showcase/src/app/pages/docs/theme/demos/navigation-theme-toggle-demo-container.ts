import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { NavigationThemeToggleDemo } from './navigation-theme-toggle-demo';

@Component({
  selector: 'app-navigation-theme-toggle-demo-container',
  imports: [DemoContainer, NavigationThemeToggleDemo],
  template: `
    <app-demo-container
      title="In Navigation Context"
      demoUrl="/demos/theme-toggle/navigation-theme-toggle-demo"
      [code]="code"
    >
      <app-navigation-theme-toggle-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationThemeToggleDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScButton, ScThemeModeToggle } from '@semantic-components/ui';
import { SiMoonIcon, SiSunIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-navigation-theme-toggle-demo',
  imports: [ScButton, ScThemeModeToggle, SiSunIcon, SiMoonIcon],
  template: \`
    <div class="flex items-center justify-between rounded-lg border p-4">
      <div class="space-y-0.5">
        <span class="text-base font-medium">Appearance</span>
        <p class="text-muted-foreground text-sm">
          Customize how the app looks on your device
        </p>
      </div>
      <button
        scButton
        scThemeModeToggle
        variant="outline"
        size="icon"
        #toggle="scThemeModeToggle"
      >
        @if (toggle.isDark()) {
          <svg siSunIcon></svg>
          <span class="sr-only">Switch to light theme</span>
        } @else {
          <svg siMoonIcon></svg>
          <span class="sr-only">Switch to dark theme</span>
        }
      </button>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationThemeToggleDemo {}`;
}
