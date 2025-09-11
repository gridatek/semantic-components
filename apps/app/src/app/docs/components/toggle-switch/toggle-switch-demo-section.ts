import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';

import { PreviewCodeTabs } from '../../../components/preview-code-tabs/preview-code-tabs';
import { ToggleSwitchDemo } from './toggle-switch-demo';

@Component({
  selector: 'app-toggle-switch-demo-section',
  imports: [PreviewCodeTabs, ToggleSwitchDemo],
  template: `
    <app-preview-code-tabs [code]="code" [title]="title()" [level]="level()">
      <app-toggle-switch-demo />
    </app-preview-code-tabs>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleSwitchDemoSection {
  readonly title = input<string>('');

  readonly level = input<'2' | '3'>('2');

  protected readonly code = `import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { ScToggleSwitch } from '@semantic-components/ui';

@Component({
  selector: 'app-toggle-switch-demo',
  imports: [ScToggleSwitch],
  template: \`
    <button sc-toggle-switch aria-label="Enable notifications"></button>
  \`,
  styles: \`\`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleSwitchDemo {}`;
}
