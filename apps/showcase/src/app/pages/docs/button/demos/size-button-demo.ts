import { Component, ViewEncapsulation } from '@angular/core';
import { ScButton } from '@semantic-components/ui';
import { SiArrowUpRightIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-size-button-demo',
  imports: [ScButton, SiArrowUpRightIcon],
  template: `
    <div class="flex flex-col items-start gap-6">
      <div class="flex items-center gap-2">
        <button scButton variant="outline" size="xs">Extra Small</button>
        <button scButton variant="outline" size="icon-xs">
          <svg siArrowUpRightIcon></svg>
          <span class="sr-only">Submit</span>
        </button>
      </div>
      <div class="flex items-center gap-2">
        <button scButton variant="outline" size="sm">Small</button>
        <button scButton variant="outline" size="icon-sm">
          <svg siArrowUpRightIcon></svg>
          <span class="sr-only">Submit</span>
        </button>
      </div>
      <div class="flex items-center gap-2">
        <button scButton variant="outline">Default</button>
        <button scButton variant="outline" size="icon">
          <svg siArrowUpRightIcon></svg>
          <span class="sr-only">Submit</span>
        </button>
      </div>
      <div class="flex items-center gap-2">
        <button scButton variant="outline" size="lg">Large</button>
        <button scButton variant="outline" size="icon-lg">
          <svg siArrowUpRightIcon></svg>
          <span class="sr-only">Submit</span>
        </button>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SizeButtonDemo {}
