import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';

import { PreviewCodeTabs } from '../../../components/preview-code-tabs/preview-code-tabs';
import { FieldFloatingDemo } from './field-floating-demo';

@Component({
  selector: 'app-field-floating-section',
  imports: [PreviewCodeTabs, FieldFloatingDemo],
  template: `
    <app-preview-code-tabs [code]="code" [title]="title()" [level]="level()">
      <app-field-floating-demo />
    </app-preview-code-tabs>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldFloatingSection {
  readonly title = input<string>('');

  readonly level = input<'2' | '3'>('2');

  protected readonly code = `import { ScField, ScInput, ScLabel } from '@semantic-components/ui';

<div sc-field [floatingLabel]="true">
  <label sc-label>Email</label>
  <input sc-input type="email" data-slot="control" />
</div>`;
}
