import { Component, ViewEncapsulation } from '@angular/core';
import { ScButton, ScKbd } from '@semantic-components/ui';

/** A key at a button’s end (data-icon="inline-end": the button’s padding follows). */
@Component({
  selector: 'app-button-kbd-demo',
  imports: [ScButton, ScKbd],
  template: `
    <button scButton variant="outline">
      Accept
      <kbd scKbd data-icon="inline-end" class="translate-x-0.5">
        ⏎<span class="sr-only"> Enter</span>
      </kbd>
    </button>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ButtonKbdDemo {}
