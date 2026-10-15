import { Component, ViewEncapsulation } from '@angular/core';
import { ScToggle } from '@semantic-components/ui';
import { SiBoldIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-sizes-toggle-demo',
  imports: [ScToggle, SiBoldIcon],
  template: `
    <div class="flex items-center gap-2">
      <button scToggle size="sm">
        <svg siBoldIcon></svg>
        <span class="sr-only">Toggle small</span>
      </button>
      <button scToggle size="default">
        <svg siBoldIcon></svg>
        <span class="sr-only">Toggle default</span>
      </button>
      <button scToggle size="lg">
        <svg siBoldIcon></svg>
        <span class="sr-only">Toggle large</span>
      </button>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SizesToggleDemo {}
