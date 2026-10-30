import { Component, ViewEncapsulation } from '@angular/core';
import { ScButton, ScButtonGroup } from '@semantic-components/ui';
import { SiPlusIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-size-button-group-demo',
  imports: [ScButton, ScButtonGroup, SiPlusIcon],
  template: `
    <div class="flex flex-col items-start gap-8">
      <div scButtonGroup aria-label="Small">
        <button scButton variant="outline" size="sm">Small</button>
        <button scButton variant="outline" size="sm">Button</button>
        <button scButton variant="outline" size="sm">Group</button>
        <button scButton variant="outline" size="icon-sm">
          <svg siPlusIcon></svg>
          <span class="sr-only">Add</span>
        </button>
      </div>
      <div scButtonGroup aria-label="Default">
        <button scButton variant="outline">Default</button>
        <button scButton variant="outline">Button</button>
        <button scButton variant="outline">Group</button>
        <button scButton variant="outline" size="icon">
          <svg siPlusIcon></svg>
          <span class="sr-only">Add</span>
        </button>
      </div>
      <div scButtonGroup aria-label="Large">
        <button scButton variant="outline" size="lg">Large</button>
        <button scButton variant="outline" size="lg">Button</button>
        <button scButton variant="outline" size="lg">Group</button>
        <button scButton variant="outline" size="icon-lg">
          <svg siPlusIcon></svg>
          <span class="sr-only">Add</span>
        </button>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SizeButtonGroupDemo {}
