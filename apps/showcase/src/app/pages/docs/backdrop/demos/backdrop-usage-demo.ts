import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScBackdrop, ScButton } from '@semantic-components/ui';

/**
 * Over a card here (absolute, in a positioned box); in an overlay it covers
 * the window. It fades in when shown and out when it goes.
 */
@Component({
  selector: 'app-backdrop-usage-demo',
  imports: [ScBackdrop, ScButton],
  template: `
    <div class="flex flex-col items-center gap-4">
      <div
        class="relative grid h-40 w-72 place-items-center overflow-hidden rounded-lg border"
      >
        <p class="text-sm">The page behind</p>
        @if (open()) {
          <div scBackdrop class="absolute z-0"></div>
        }
      </div>
      <button
        scButton
        variant="outline"
        [attr.aria-pressed]="open()"
        (click)="open.set(!open())"
      >
        Backdrop
      </button>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class BackdropUsageDemo {
  protected readonly open = signal(false);
}
