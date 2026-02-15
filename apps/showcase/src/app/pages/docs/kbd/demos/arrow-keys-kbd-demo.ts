import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScKbd } from '@semantic-components/ui';

@Component({
  selector: 'app-arrow-keys-kbd-demo',
  imports: [ScKbd],
  template: `
    <div class="flex flex-col items-center gap-1">
      <kbd sc-kbd>↑</kbd>
      <div class="flex gap-1">
        <kbd sc-kbd>←</kbd>
        <kbd sc-kbd>↓</kbd>
        <kbd sc-kbd>→</kbd>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArrowKeysKbdDemo {}
