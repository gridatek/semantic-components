import { Component, ViewEncapsulation } from '@angular/core';
import { ScKbd, ScKbdGroup } from '@semantic-components/ui';

/** Keys together in a scKbdGroup, here in a sentence. */
@Component({
  selector: 'app-group-kbd-demo',
  imports: [ScKbd, ScKbdGroup],
  template: `
    <p class="text-muted-foreground text-sm">
      Use
      <kbd scKbdGroup>
        <kbd scKbd>Ctrl + B</kbd>
        <kbd scKbd>Ctrl + K</kbd>
      </kbd>
      to open the command palette
    </p>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class GroupKbdDemo {}
