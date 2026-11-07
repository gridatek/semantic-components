import { Component, ViewEncapsulation } from '@angular/core';
import { ScInputButton } from '@semantic-components/ui';
import { SiSearchIcon } from '@semantic-icons/lucide-icons';

/** Its icon alone (a collapsed sidebar): named in sr-only text. */
@Component({
  selector: 'app-icon-input-button-demo',
  imports: [ScInputButton, SiSearchIcon],
  template: `
    <button scInputButton class="size-8 justify-center p-0">
      <svg siSearchIcon></svg>
      <span class="sr-only">Search</span>
    </button>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class IconInputButtonDemo {}
