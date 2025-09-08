import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';

import { PreviewCodeTabs } from '../../../components/preview-code-tabs/preview-code-tabs';
import { FloatingLabelDemo } from './floating-label-demo';

@Component({
  selector: 'app-floating-label-demo-section',
  imports: [FloatingLabelDemo, PreviewCodeTabs],
  template: `
    <app-preview-code-tabs [code]="code" [title]="title()" [level]="level()">
      <app-floating-label-demo />
    </app-preview-code-tabs>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FloatingLabelDemoSection {
  readonly title = input<string>('Floating Labels with ScField');
  readonly level = input<'2' | '3'>('2');

  protected readonly code = `<!-- Regular labels (default) -->
<sc-field>
  <label sc-label>Full Name</label>
  <input sc-input [(ngModel)]="name" placeholder="Enter your name" />
</sc-field>

<!-- Floating labels -->
<sc-field [floating]="true">
  <label sc-label>Full Name</label>
  <input sc-input [(ngModel)]="name" placeholder=" " />
</sc-field>

<!-- Floating label with combobox -->
<sc-field [floating]="true">
  <label sc-label>Select Country</label>
  <sc-combobox
    [(ngModel)]="country"
    [items]="countries"
    placeholder=" "
  />
</sc-field>

<!-- Floating label with textarea -->
<sc-field [floating]="true">
  <label sc-label>Additional Notes</label>
  <textarea sc-input [(ngModel)]="notes" rows="3" placeholder=" "></textarea>
</sc-field>

<!-- Floating label with multi-select -->
<sc-field [floating]="true">
  <label sc-label>Programming Languages</label>
  <sc-combobox
    [(ngModel)]="languages"
    [items]="programmingLanguages"
    [multiple]="true"
    placeholder=" "
  />
</sc-field>`;
}
