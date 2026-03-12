import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ThemeSelectDemo } from './theme-select-demo';

@Component({
  selector: 'app-theme-select-demo-container',
  imports: [DemoContainer, ThemeSelectDemo],
  template: `
    <app-demo-container
      title="Theme Select"
      demoUrl="/demos/theme-toggle/theme-select-demo"
      [code]="code"
    >
      <app-theme-select-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeSelectDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { ScLabel, ScNativeSelect } from '@semantic-components/ui';
import { ScTheme, ScThemeManager } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-theme-select-demo',
  imports: [ScLabel, ScNativeSelect],
  template: \`
    <div class="space-y-4">
      <div class="max-w-xs space-y-2">
        <label scLabel for="theme-select">Theme</label>
        <select
          scNativeSelect
          id="theme-select"
          [value]="theme.theme()"
          (change)="onThemeChange($event)"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="system">System</option>
        </select>
      </div>
      <p class="text-muted-foreground text-sm">
        Select includes system preference option
      </p>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeSelectDemo {
  protected readonly theme = inject(ScThemeManager);

  protected onThemeChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.theme.setTheme(target.value as ScTheme);
  }
}`;
}
