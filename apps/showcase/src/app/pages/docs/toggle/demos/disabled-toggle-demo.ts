import { Component, ViewEncapsulation } from '@angular/core';
import { ScToggle } from '@semantic-components/ui';
import { SiBoldIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-disabled-toggle-demo',
  imports: [ScToggle, SiBoldIcon],
  template: `
    <div class="flex items-center gap-2">
      <button scToggle [disabled]="true">
        <svg siBoldIcon></svg>
        <span class="sr-only">Toggle disabled</span>
      </button>
      <button scToggle [pressed]="true" [disabled]="true">
        <svg siBoldIcon></svg>
        <span class="sr-only">Toggle disabled pressed</span>
      </button>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledToggleDemo {}
