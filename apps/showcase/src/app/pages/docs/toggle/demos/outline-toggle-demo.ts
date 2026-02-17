import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ScToggle } from '@semantic-components/ui';
import { SiItalicIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-outline-toggle-demo',
  imports: [ScToggle, SiItalicIcon],
  template: `
    <button
      scToggle
      variant="outline"
      [(pressed)]="italic"
      aria-label="Toggle italic"
    >
      <svg si-italic-icon></svg>
    </button>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OutlineToggleDemo {
  readonly italic = signal(false);
}
