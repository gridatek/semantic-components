import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScKbd } from '@semantic-components/ui';

@Component({
  selector: 'app-inline-kbd-demo',
  imports: [ScKbd],
  template: `
    <div class="space-y-2">
      <p class="text-muted-foreground text-sm">
        Press
        <kbd scKbd>⌘</kbd>
        <kbd scKbd>K</kbd>
        to open the command palette, or
        <kbd scKbd>Esc</kbd>
        to close it.
      </p>
      <p class="text-muted-foreground text-sm">
        Use
        <kbd scKbd>Tab</kbd>
        to navigate between fields and
        <kbd scKbd>Enter</kbd>
        to submit.
      </p>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InlineKbdDemo {}
