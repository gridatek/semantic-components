import { Component, ViewEncapsulation, inject } from '@angular/core';
import {
  ScCodeBlock,
  ScCodeBlockActions,
  ScCodeBlockContent,
  ScCodeBlockCopy,
  ScCodeBlockHeader,
  ScCodeBlockTitle,
} from '@semantic-components/ui/code-block';
import { SiCheckIcon, SiCopyIcon } from '@semantic-icons/lucide-icons';
import { DevOnly } from '../../../../components/dev-only/dev-only';
import { ConfigService } from '../../../../services/config-service';
import { BackdropUsageDemo } from './backdrop-usage-demo';

@Component({
  selector: 'app-backdrop-usage-demo-container',
  imports: [
    DevOnly,
    ScCodeBlock,
    ScCodeBlockHeader,
    ScCodeBlockTitle,
    ScCodeBlockActions,
    ScCodeBlockCopy,
    ScCodeBlockContent,
    SiCheckIcon,
    SiCopyIcon,
    BackdropUsageDemo,
  ],
  template: `
    <div scCodeBlock>
      <div scCodeBlockHeader>
        <div scCodeBlockTitle>angular-ts</div>
        <div scCodeBlockActions>
          <button [scCodeBlockCopy]="code" #copy="scCodeBlockCopy">
            @if (copy.copied()) {
              <svg siCheckIcon></svg>
            } @else {
              <svg siCopyIcon></svg>
            }
            <span class="sr-only">Copy to clipboard</span>
          </button>
        </div>
      </div>
      <pre scCodeBlockContent [code]="code" language="angular-ts"></pre>
    </div>

    @if (devMode()) {
      <app-dev-only>
        <app-backdrop-usage-demo />
      </app-dev-only>
    }
  `,
  host: { class: 'block w-full space-y-4' },
  encapsulation: ViewEncapsulation.None,
})
export class BackdropUsageDemoContainer {
  private readonly config = inject(ConfigService);

  protected readonly devMode = this.config.devMode;

  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScBackdrop, ScButton } from '@semantic-components/ui';

/**
 * Over a card here (absolute, in a positioned box); in an overlay it covers
 * the window. It fades in when shown and out when it goes.
 */
@Component({
  selector: 'app-backdrop-usage-demo',
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
export class BackdropUsageDemo {
  protected readonly open = signal(false);
}`;
}
