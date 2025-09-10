import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';

import { PreviewCodeTabs } from '../../../components/preview-code-tabs/preview-code-tabs';
import { InputGroupDemo } from './input-group-demo';

@Component({
  selector: 'app-input-group-demo-section',
  imports: [PreviewCodeTabs, InputGroupDemo],
  template: `
    <app-preview-code-tabs [code]="code" [title]="title()" [level]="level()">
      <app-input-group-demo />
    </app-preview-code-tabs>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputGroupDemoSection {
  readonly title = input<string>('');
  readonly level = input<'2' | '3'>('2');

  protected readonly code = `<!-- Basic input group with left icon -->
<sc-input-group>
  <si-search-icon data-slot="icon" />
  <input sc-input placeholder="Search..." data-slot="control" />
</sc-input-group>

<!-- Input group with right icon -->
<sc-input-group>
  <input sc-input placeholder="Enter email" data-slot="control" />
  <si-mail-icon data-slot="icon" />
</sc-input-group>

<!-- Input group with both icons -->
<sc-input-group>
  <si-search-icon data-slot="icon" />
  <input sc-input placeholder="Search emails..." data-slot="control" />
  <si-mail-icon data-slot="icon" />
</sc-input-group>`;
}
