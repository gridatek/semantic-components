import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScButton, ScFocusTrap } from '@semantic-components/ui';

@Component({
  selector: 'app-focus-trap-usage-demo',
  imports: [ScButton, ScFocusTrap],
  template: `
    <button scButton variant="outline" (click)="open.set(true)">Open</button>
    @if (open()) {
      <div scFocusTrap class="flex gap-2">
        <button scButton>Stay</button>
        <button scButton (click)="open.set(false)">Close</button>
      </div>
    }
  `,
  host: { class: 'flex w-full justify-center gap-2' },
  encapsulation: ViewEncapsulation.None,
})
export class FocusTrapUsageDemo {
  protected readonly open = signal(false);
}
