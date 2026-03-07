import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { CustomThemeCheckboxDemo } from './custom-theme-checkbox-demo';

@Component({
  selector: 'app-custom-theme-checkbox-demo-container',
  imports: [DemoContainer, CustomThemeCheckboxDemo],
  template: `
    <app-demo-container
      title="Custom Theme"
      demoUrl="/demos/checkbox/custom-theme-checkbox-demo"
      [code]="code"
    >
      <app-custom-theme-checkbox-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomThemeCheckboxDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { ScCheckbox, ScCheckboxField, ScLabel } from '@semantic-components/ui';

@Component({
  selector: 'app-custom-theme-checkbox-demo',
  imports: [ScCheckboxField, ScCheckbox, ScLabel],
  template: \`
    <div
      class="space-y-3"
      style="--primary: oklch(0.6 0.25 280); --primary-foreground: oklch(0.985 0 0);"
    >
      <div scCheckboxField>
        <input type="checkbox" scCheckbox [(checked)]="checked" />
        <label scLabel>Purple color scheme</label>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomThemeCheckboxDemo {
  readonly checked = signal(true);
}`;
}
