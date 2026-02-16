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
      <kbd sc-kbd>⌘</kbd>
      <kbd sc-kbd>Shift</kbd>
      <kbd sc-kbd>Alt</kbd>
      <kbd sc-kbd>Ctrl</kbd>
      <kbd sc-kbd>Enter</kbd>
      <kbd sc-kbd>Esc</kbd>
      <kbd sc-kbd>Tab</kbd>
      <kbd sc-kbd>Space</kbd>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicKbdDemo {}
