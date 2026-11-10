import { Component, ViewEncapsulation } from '@angular/core';
import { UsageCode } from '../../../../components/usage-code/usage-code';
import { BackdropUsageDemo } from './backdrop-usage-demo';

@Component({
  selector: 'app-backdrop-usage-demo-container',
  imports: [UsageCode, BackdropUsageDemo],
  template: `
    <app-usage-code [code]="code">
      <ng-template><app-backdrop-usage-demo /></ng-template>
    </app-usage-code>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class BackdropUsageDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScBackdrop, ScButton, ScFrame } from '@semantic-components/ui';

/**
 * Over a card here (absolute, in a positioned box); in an overlay it covers
 * the window. It fades in when shown and out when it goes.
 */
@Component({
  selector: 'app-backdrop-usage-demo',
  imports: [ScBackdrop, ScButton, ScFrame],
  template: \`
    <div class="flex flex-col items-center gap-4">
      <div
        scFrame
        class="relative grid h-40 w-72 place-items-center overflow-hidden"
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
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class BackdropUsageDemo {
  protected readonly open = signal(false);
}`;
}
