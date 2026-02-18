import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScToggle } from '@semantic-components/ui';
import { SiBoldIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-disabled-toggle-demo',
  imports: [ScToggle, SiBoldIcon],
  template: `
    <div class="flex items-center gap-2">
      <button scToggle [disabled]="true" aria-label="Toggle disabled">
        <svg siBoldIcon></svg>
      </button>
      <button
        scToggle
        [pressed]="true"
        [disabled]="true"
        aria-label="Toggle disabled pressed"
      >
        <svg siBoldIcon></svg>
      </button>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledToggleDemo {}
