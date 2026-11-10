import { Component, ViewEncapsulation } from '@angular/core';
import { ScToggle } from '@semantic-components/ui';

/** size: sm, default, lg. */
@Component({
  selector: 'app-sizes-toggle-demo',
  imports: [ScToggle],
  template: `
    <div class="flex flex-wrap items-center gap-2">
      <button scToggle variant="outline" size="sm">Small</button>
      <button scToggle variant="outline" size="default">Default</button>
      <button scToggle variant="outline" size="lg">Large</button>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SizesToggleDemo {}
