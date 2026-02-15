import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScKbd } from '@semantic-components/ui';

@Component({
  selector: 'app-function-keys-kbd-demo',
  imports: [ScKbd],
  template: `
    <div class="flex flex-wrap items-center gap-2">
      <kbd sc-kbd>F1</kbd>
      <kbd sc-kbd>F2</kbd>
      <kbd sc-kbd>F3</kbd>
      <kbd sc-kbd>F4</kbd>
      <kbd sc-kbd>F5</kbd>
      <kbd sc-kbd>F6</kbd>
      <kbd sc-kbd>F7</kbd>
      <kbd sc-kbd>F8</kbd>
      <kbd sc-kbd>F9</kbd>
      <kbd sc-kbd>F10</kbd>
      <kbd sc-kbd>F11</kbd>
      <kbd sc-kbd>F12</kbd>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FunctionKeysKbdDemo {}
