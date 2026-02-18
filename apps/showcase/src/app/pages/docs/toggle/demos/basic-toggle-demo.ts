import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ScToggle } from '@semantic-components/ui';
import { SiBoldIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-basic-toggle-demo',
  imports: [ScToggle, SiBoldIcon],
  template: `
    <button scToggle [(pressed)]="bold" aria-label="Toggle bold">
      <svg siBoldIcon></svg>
    </button>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicToggleDemo {
  readonly bold = signal(false);
}
