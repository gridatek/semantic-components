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
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeSelectDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScThemeField, ScThemeSelect } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-theme-select-demo',
  imports: [ScThemeField, ScThemeSelect],
  template: \`
    <div class="space-y-4">
      <div sc-theme-field class="max-w-xs">
        <label class="text-sm font-medium">Theme</label>
        <select sc-theme-select>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="system">System</option>
        </select>
      </div>
      <p class="text-sm text-muted-foreground">
        Select includes system preference option
      </p>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeSelectDemo {}`;
}
