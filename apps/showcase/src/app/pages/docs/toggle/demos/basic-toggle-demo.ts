import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScToggle } from '@semantic-components/ui';
import { SiBoldIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-basic-toggle-demo',
  imports: [ScToggle, SiBoldIcon],
  template: `
    <button scToggle [(pressed)]="bold">
      <svg siBoldIcon></svg>
      <span class="sr-only">Toggle bold</span>
    </button>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicToggleDemo {
  readonly bold = signal(false);
}
