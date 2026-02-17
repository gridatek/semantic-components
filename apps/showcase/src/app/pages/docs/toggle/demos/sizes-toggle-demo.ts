import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScToggle } from '@semantic-components/ui';
import { SiBoldIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-sizes-toggle-demo',
  imports: [ScToggle, SiBoldIcon],
  template: `
    <div class="flex items-center gap-2">
      <button scToggle size="sm" aria-label="Toggle small">
        <svg si-bold-icon></svg>
      </button>
      <button scToggle size="default" aria-label="Toggle default">
        <svg si-bold-icon></svg>
      </button>
      <button scToggle size="lg" aria-label="Toggle large">
        <svg si-bold-icon></svg>
      </button>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SizesToggleDemo {}
