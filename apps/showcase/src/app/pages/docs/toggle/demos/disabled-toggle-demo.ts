import { Component, ViewEncapsulation } from '@angular/core';
import { ScToggle } from '@semantic-components/ui';

/** Disabled: dimmed, out of the Tab order. */
@Component({
  selector: 'app-disabled-toggle-demo',
  imports: [ScToggle],
  template: `
    <div class="flex flex-wrap items-center gap-2">
      <button scToggle disabled>Disabled</button>
      <button scToggle variant="outline" disabled>Disabled outline</button>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledToggleDemo {}
