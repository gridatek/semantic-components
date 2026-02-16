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
      <p class="text-sm text-muted-foreground">
        Press
        <kbd sc-kbd>⌘</kbd>
        <kbd sc-kbd>K</kbd>
        to open the command palette, or
        <kbd sc-kbd>Esc</kbd>
        to close it.
      </p>
      <p class="text-sm text-muted-foreground">
        Use
        <kbd sc-kbd>Tab</kbd>
        to navigate between fields and
        <kbd sc-kbd>Enter</kbd>
        to submit.
      </p>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InlineKbdDemo {}
