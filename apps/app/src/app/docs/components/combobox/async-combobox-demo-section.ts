import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';

import { PreviewCodeTabs } from '../../../components/preview-code-tabs/preview-code-tabs';
import { AsyncComboboxDemo } from './async-combobox-demo';

@Component({
  selector: 'app-async-combobox-demo-section',
  imports: [AsyncComboboxDemo, PreviewCodeTabs],
  template: `
    <app-preview-code-tabs [code]="code" [title]="title()" [level]="level()">
      <app-async-combobox-demo />
    </app-preview-code-tabs>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AsyncComboboxDemoSection {
  readonly title = input<string>('Async Combobox with Loading');
  readonly level = input<'2' | '3'>('2');

  protected readonly code = `<sc-combobox
  [(ngModel)]="selectedUser"
  [async]="true"
  [asyncSearchFn]="searchUsers"
  (selectionChange)="onUserChange($event)"
  label="Search users"
  placeholder="Start typing to search..."
/>`;
}
