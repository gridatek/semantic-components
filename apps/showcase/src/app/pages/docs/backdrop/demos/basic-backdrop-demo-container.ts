import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicBackdropDemo } from './basic-backdrop-demo';

@Component({
  selector: 'app-basic-backdrop-demo-container',
  imports: [DemoContainer, BasicBackdropDemo],
  template: `
    <app-demo-container
      title="Over a card"
      demoUrl="/demos/backdrop/basic-backdrop-demo"
      [code]="code"
    >
      <app-basic-backdrop-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export default class BasicBackdropDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScBackdrop, ScButton } from '@semantic-components/ui';

/**
 * The backdrop over a card (kept inside it: \`absolute\` instead of the
 * overlay's \`fixed\`): it fades in when shown and out when it goes.
 */
@Component({
  selector: 'app-basic-backdrop-demo',
  imports: [ScBackdrop, ScButton],
  template: \`
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
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicBackdropDemo {
  protected readonly open = signal(false);
}`;
}
