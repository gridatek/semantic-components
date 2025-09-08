import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';

import { PreviewCodeTabs } from '../../../components/preview-code-tabs/preview-code-tabs';
import { CustomConfigComboboxDemo } from './custom-config-combobox-demo';

@Component({
  selector: 'app-custom-config-combobox-demo-section',
  imports: [CustomConfigComboboxDemo, PreviewCodeTabs],
  template: `
    <app-preview-code-tabs [code]="code" [title]="title()" [level]="level()">
      <app-custom-config-combobox-demo />
    </app-preview-code-tabs>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomConfigComboboxDemoSection {
  readonly title = input<string>('Custom Configuration');
  readonly level = input<'2' | '3'>('2');

  protected readonly code = `<sc-combobox
  [(ngModel)]="customConfig1"
  [items]="fruits"
  [showToggleButton]="false"
  label="Without toggle button"
  placeholder="Type to search..."
/>

<sc-combobox
  [(ngModel)]="customConfig2"
  [items]="fruits"
  [showStatus]="false"
  label="Without status display"
  placeholder="Type to search..."
/>`;
}
