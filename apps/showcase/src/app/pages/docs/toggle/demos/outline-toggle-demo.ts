import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
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
      <svg siItalicIcon></svg>
    </button>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OutlineToggleDemo {
  readonly italic = signal(false);
}
