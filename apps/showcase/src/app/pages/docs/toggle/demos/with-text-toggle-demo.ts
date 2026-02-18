import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ScToggle } from '@semantic-components/ui';
import { SiUnderlineIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-with-text-toggle-demo',
  imports: [ScToggle, SiUnderlineIcon],
  template: `
    <button scToggle [(pressed)]="underline" aria-label="Toggle underline">
      <svg siUnderlineIcon></svg>
      Underline
    </button>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WithTextToggleDemo {
  readonly underline = signal(false);
}
