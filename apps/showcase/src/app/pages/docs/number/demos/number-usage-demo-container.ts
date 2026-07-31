import { Component, ViewEncapsulation, inject } from '@angular/core';
import {
  ScCodeViewer,
  ScCodeViewerContent,
  ScCodeViewerHeader,
  ScCodeViewerLabel,
} from '@semantic-components/code';
import { ScButton, ScCopyToClipboard } from '@semantic-components/ui';
import { SiCheckIcon, SiCopyIcon } from '@semantic-icons/lucide-icons';
import { ConfigService } from '../../../../services/config.service';
import { NumberUsageDemo } from './number-usage-demo';

@Component({
  selector: 'app-number-usage-demo-container',
  imports: [
    ScCodeViewer,
    ScCodeViewerHeader,
    ScCodeViewerLabel,
    ScCodeViewerContent,
    ScButton,
    ScCopyToClipboard,
    SiCheckIcon,
    SiCopyIcon,
    NumberUsageDemo,
  ],
  template: `
    <div scCodeViewer>
      <div scCodeViewerHeader>
        <span scCodeViewerLabel>angular-ts</span>
        <button
          scButton
          variant="ghost"
          size="icon"
          [scCopyToClipboard]="code"
          #copy="scCopyToClipboard"
          aria-label="Copy to clipboard"
        >
          @if (copy.copied()) {
            <svg siCheckIcon></svg>
          } @else {
            <svg siCopyIcon></svg>
          }
        </button>
      </div>
      <div scCodeViewerContent [code]="code" language="angular-ts"></div>
    </div>

    @if (devMode()) {
      <app-number-usage-demo />
    }
  `,
  host: { class: 'block w-full space-y-4' },
  encapsulation: ViewEncapsulation.None,
})
export class NumberUsageDemoContainer {
  private readonly config = inject(ConfigService);

  protected readonly devMode = this.config.devMode;

  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScButtonGroup,
  ScLabel,
  ScNumber,
  ScNumberDecrement,
  ScNumberIncrement,
  ScNumberInput,
  ScNumberScrubArea,
} from '@semantic-components/ui';

@Component({
  selector: 'app-number-usage-demo',
  imports: [
    ScNumber,
    ScNumberScrubArea,
    ScButtonGroup,
    ScNumberDecrement,
    ScNumberInput,
    ScNumberIncrement,
    ScLabel,
  ],
  template: \`
    <div scNumber [(value)]="quantity" [min]="1" [max]="10">
      <div scNumberScrubArea>
        <label scLabel>Quantity</label>
      </div>

      <div scButtonGroup>
        <button scNumberDecrement></button>
        <input scNumberInput aria-label="Quantity" />
        <button scNumberIncrement></button>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class NumberUsageDemo {
  readonly quantity = signal<number | null>(5);
}`;
}
