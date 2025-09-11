import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';

import { PreviewCodeTabs } from '../../../components/preview-code-tabs/preview-code-tabs';
import { FieldDemo } from './field-demo';

@Component({
  selector: 'app-field-demo-section',
  imports: [PreviewCodeTabs, FieldDemo],
  template: `
    <app-preview-code-tabs [code]="code" [title]="title()" [level]="level()">
      <app-field-demo />
    </app-preview-code-tabs>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldDemoSection {
  readonly title = input<string>('');

  readonly level = input<'2' | '3'>('2');

  protected readonly code = `import { ScField, ScInput, ScLabel } from '@semantic-components/ui';

<div sc-field controlId="user-email">
  <label sc-label>Email</label>
  <input sc-input type="email" placeholder="Enter your email" data-slot="control" />
</div>`;
}
