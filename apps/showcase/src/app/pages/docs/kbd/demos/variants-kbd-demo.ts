import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScKbd } from '@semantic-components/ui';

@Component({
  selector: 'app-variants-kbd-demo',
  imports: [ScKbd],
  template: `
    <div class="flex items-center gap-4">
      <kbd scKbd>⌘</kbd>
      <kbd scKbd>K</kbd>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VariantsKbdDemo {}
