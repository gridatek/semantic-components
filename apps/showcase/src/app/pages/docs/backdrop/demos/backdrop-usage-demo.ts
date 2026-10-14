import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScBackdrop, ScButton } from '@semantic-components/ui';

@Component({
  selector: 'app-backdrop-usage-demo',
  imports: [ScBackdrop, ScButton],
  template: `
    <button scButton variant="outline" (click)="open.set(!open())">
      Backdrop
    </button>
    @if (open()) {
      <div scBackdrop></div>
    }
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class BackdropUsageDemo {
  protected readonly open = signal(false);
}
