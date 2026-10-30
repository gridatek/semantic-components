import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScControlGroup,
  ScControlGroupSeparator,
} from '@semantic-components/ui';

@Component({
  selector: 'app-group-separator-button-demo',
  imports: [ScButton, ScControlGroup, ScControlGroupSeparator],
  template: `
    <div scControlGroup aria-label="Clipboard">
      <button scButton variant="secondary" size="sm">Copy</button>
      <div scControlGroupSeparator></div>
      <button scButton variant="secondary" size="sm">Paste</button>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class GroupSeparatorButtonDemo {}
