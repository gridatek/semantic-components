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

  protected readonly code = `<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
  <div>
    <label sc-label for="no-toggle-combobox" class="mb-2">Without toggle button</label>
    <sc-combobox
      [(ngModel)]="customConfig1"
      [items]="fruits"
      [showToggleButton]="false"
      [inputId]="'no-toggle-combobox'"
      placeholder="Type to search..."
    />
  </div>
  <div>
    <label sc-label for="no-status-combobox" class="mb-2">Without status display</label>
    <sc-combobox
      [(ngModel)]="customConfig2"
      [items]="fruits"
      [showStatus]="false"
      [inputId]="'no-status-combobox'"
      placeholder="Type to search..."
    />
  </div>
</div>`;
}
