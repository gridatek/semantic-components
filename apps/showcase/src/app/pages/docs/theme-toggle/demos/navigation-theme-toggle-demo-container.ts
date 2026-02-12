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
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationThemeToggleDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScThemeToggle } from '@semantic-components/ui-lab';
import { SiMoonIcon, SiSunIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-navigation-theme-toggle-demo',
  imports: [ScThemeToggle, SiSunIcon, SiMoonIcon],
  template: \`
    <div class="flex items-center justify-between rounded-lg border p-4">
      <div class="space-y-0.5">
        <span class="text-base font-medium">Appearance</span>
        <p class="text-sm text-muted-foreground">
          Customize how the app looks on your device
        </p>
      </div>
      <button sc-theme-toggle variant="outline" #toggle="scThemeToggle">
        @if (toggle.isDark()) {
          <svg si-sun-icon></svg>
        } @else {
          <svg si-moon-icon></svg>
        }
      </button>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationThemeToggleDemo {}`;
}
