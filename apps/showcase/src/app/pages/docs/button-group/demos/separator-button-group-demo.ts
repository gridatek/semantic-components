import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScButtonGroup,
  ScButtonGroupSeparator,
} from '@semantic-components/ui';

@Component({
  selector: 'app-separator-button-group-demo',
  imports: [ScButton, ScButtonGroup, ScButtonGroupSeparator],
  template: `
    <div scButtonGroup aria-label="Clipboard">
      <button scButton variant="secondary" size="sm">Copy</button>
      <div scButtonGroupSeparator></div>
      <button scButton variant="secondary" size="sm">Paste</button>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SeparatorButtonGroupDemo {}
