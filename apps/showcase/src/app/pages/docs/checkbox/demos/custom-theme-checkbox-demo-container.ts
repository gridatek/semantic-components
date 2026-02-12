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
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomThemeCheckboxDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ScCheckboxField, ScCheckbox, ScLabel } from '@semantic-components/ui-lab';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-custom-theme-checkbox-demo',
  imports: [ScCheckboxField, ScCheckbox, ScLabel, FormsModule],
  template: \`
    <div
      class="space-y-3"
      style="--primary: oklch(0.6 0.25 280); --primary-foreground: oklch(0.985 0 0);"
    >
      <div sc-checkbox-field>
        <input
          type="checkbox"
          sc-checkbox
          [(ngModel)]="checked"
          id="purple-theme"
        />
        <label sc-label for="purple-theme">Purple color scheme</label>
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomThemeCheckboxDemo {
  readonly checked = signal(true);
}`;
}
