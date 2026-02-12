import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicThemeToggleDemo } from './basic-theme-toggle-demo';

@Component({
  selector: 'app-basic-theme-toggle-demo-container',
  imports: [DemoContainer, BasicThemeToggleDemo],
  template: `
    <app-demo-container
      title="Basic"
      demoUrl="/demos/theme-toggle/basic-theme-toggle-demo"
      [code]="code"
    >
      <app-basic-theme-toggle-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicThemeToggleDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { ScTheme, ScThemeToggle } from '@semantic-components/ui-lab';
import { SiMoonIcon, SiSunIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-basic-theme-toggle-demo',
  imports: [ScThemeToggle, SiSunIcon, SiMoonIcon],
  template: \`
    <div class="flex items-center gap-4">
      <button sc-theme-toggle #toggle="scThemeToggle">
        @if (toggle.isDark()) {
          <svg si-sun-icon></svg>
        } @else {
          <svg si-moon-icon></svg>
        }
      </button>
      <span class="text-sm text-muted-foreground">
        Current: {{ themeService.resolvedTheme() }}
      </span>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicThemeToggleDemo {
  protected readonly themeService = inject(ScTheme);
}`;
}
