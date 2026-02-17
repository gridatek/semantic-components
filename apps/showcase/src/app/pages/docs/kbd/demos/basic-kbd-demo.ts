import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScKbd } from '@semantic-components/ui';

@Component({
  selector: 'app-basic-kbd-demo',
  imports: [ScKbd],
  template: `
    <div class="flex flex-wrap items-center gap-2">
      <kbd scKbd>⌘</kbd>
      <kbd scKbd>Shift</kbd>
      <kbd scKbd>Alt</kbd>
      <kbd scKbd>Ctrl</kbd>
      <kbd scKbd>Enter</kbd>
      <kbd scKbd>Esc</kbd>
      <kbd scKbd>Tab</kbd>
      <kbd scKbd>Space</kbd>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicKbdDemo {}
