import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScControlGroup,
  ScControlGroupSeparator,
} from '@semantic-components/ui';
import { SiPlusIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-split-button-demo',
  imports: [ScButton, ScControlGroup, ScControlGroupSeparator, SiPlusIcon],
  template: `
    <div scControlGroup aria-label="Split button">
      <button scButton variant="secondary">Button</button>
      <div scControlGroupSeparator></div>
      <button scButton variant="secondary" size="icon">
        <svg siPlusIcon></svg>
        <span class="sr-only">Add</span>
      </button>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SplitButtonDemo {}
