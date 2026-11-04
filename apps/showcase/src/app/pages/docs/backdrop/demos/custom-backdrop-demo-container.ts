import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { CustomBackdropDemo } from './custom-backdrop-demo';

@Component({
  selector: 'app-custom-backdrop-demo-container',
  imports: [DemoContainer, CustomBackdropDemo],
  template: `
    <app-demo-container
      title="Custom Shade"
      demoUrl="/demos/backdrop/custom-backdrop-demo"
      [code]="code"
    >
      <app-custom-backdrop-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class CustomBackdropDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScBackdrop, ScButton } from '@semantic-components/ui';

/**
 * Your own shade: classes over the preset's (cn: a later class wins) — here
 * a tint of the primary color, no blur.
 */
@Component({
  selector: 'app-custom-backdrop-demo',
  imports: [ScBackdrop, ScButton],
  template: \`
    <div class="flex flex-col items-center gap-4">
      <div
        class="relative grid h-40 w-72 place-items-center overflow-hidden rounded-lg border"
      >
        <p class="text-sm">The page behind</p>
        @if (open()) {
          <div
            scBackdrop
            class="bg-primary/20 absolute z-0 supports-backdrop-filter:backdrop-blur-none"
          ></div>
        }
      </div>
      <button
        scButton
        variant="outline"
        [attr.aria-pressed]="open()"
        (click)="open.set(!open())"
      >
        Tinted backdrop
      </button>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class CustomBackdropDemo {
  protected readonly open = signal(false);
}`;
}
