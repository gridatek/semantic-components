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
import { ConfigService } from '../../../../services/config-service';
import { FocusTrapUsageDemo } from './focus-trap-usage-demo';

@Component({
  selector: 'app-focus-trap-usage-demo-container',
  imports: [
    ScCodeBlock,
    ScCodeBlockHeader,
    ScCodeBlockTitle,
    ScCodeBlockActions,
    ScCodeBlockCopy,
    ScCodeBlockContent,
    SiCheckIcon,
    SiCopyIcon,
    FocusTrapUsageDemo,
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
      <app-focus-trap-usage-demo />
    }
  `,
  host: { class: 'block w-full space-y-4' },
  encapsulation: ViewEncapsulation.None,
})
export class FocusTrapUsageDemoContainer {
  private readonly config = inject(ConfigService);

  protected readonly devMode = this.config.devMode;

  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScButton, ScFocusTrap } from '@semantic-components/ui';

@Component({
  selector: 'app-focus-trap-usage-demo',
  imports: [ScButton, ScFocusTrap],
  template: \`
    <button scButton variant="outline" (click)="open.set(true)">Open</button>
    @if (open()) {
      <div scFocusTrap class="flex gap-2">
        <button scButton>Stay</button>
        <button scButton (click)="open.set(false)">Close</button>
      </div>
    }
  \`,
  host: { class: 'flex w-full justify-center gap-2' },
  encapsulation: ViewEncapsulation.None,
})
export class FocusTrapUsageDemo {
  protected readonly open = signal(false);
}`;
}
