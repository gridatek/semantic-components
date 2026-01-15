import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { ScOptionLegacy, ScSelectLegacy } from '@semantic-components/ui';

@Component({
  selector: 'app-select-demo',
  imports: [ScSelectLegacy, ScOptionLegacy],
  template: `
    <sc-select-legacy placeholder="Select a fruit">
      <sc-option-legacy value="apple">Apple</sc-option-legacy>
      <sc-option-legacy value="banana">Banana</sc-option-legacy>
      <sc-option-legacy value="blueberry">Blueberry</sc-option-legacy>
      <sc-option-legacy value="grapes">Grapes</sc-option-legacy>
      <sc-option-legacy value="pineapple">Pineapple</sc-option-legacy>
    </sc-select-legacy>
  `,
  host: {
    class: 'block w-[180px]',
  },
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectDemo {}
