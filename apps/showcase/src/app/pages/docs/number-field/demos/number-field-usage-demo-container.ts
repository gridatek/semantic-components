import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import {
  ScCodeViewer,
  ScCodeViewerContent,
  ScCodeViewerHeader,
  ScCodeViewerLabel,
} from '@semantic-components/code';
import { ScButton, ScCopyToClipboard } from '@semantic-components/ui';
import { SiCheckIcon, SiCopyIcon } from '@semantic-icons/lucide-icons';
import { ConfigService } from '../../../../services/config.service';
import { NumberFieldUsageDemo } from './number-field-usage-demo';

@Component({
  selector: 'app-number-field-usage-demo-container',
  imports: [
    ScCodeViewer,
    ScCodeViewerHeader,
    ScCodeViewerLabel,
    ScCodeViewerContent,
    ScButton,
    ScCopyToClipboard,
    SiCheckIcon,
    SiCopyIcon,
    NumberFieldUsageDemo,
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
      <div
        class="mt-4 flex min-h-40 items-center justify-center rounded-md border p-6"
      >
        <app-number-field-usage-demo />
      </div>
    }
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumberFieldUsageDemoContainer {
  private readonly config = inject(ConfigService);

  protected readonly devMode = this.config.devMode;

  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import {
  ScLabel,
  ScNumberField,
  ScNumberFieldDecrement,
  ScNumberFieldIncrement,
  ScNumberFieldInput,
  ScNumberFieldInputGroup,
  ScNumberFieldScrubArea,
} from '@semantic-components/ui';

@Component({
  selector: 'app-number-field-usage-demo',
  imports: [
    ScNumberField,
    ScNumberFieldScrubArea,
    ScNumberFieldInputGroup,
    ScNumberFieldDecrement,
    ScNumberFieldInput,
    ScNumberFieldIncrement,
    ScLabel,
  ],
  template: \`
    <div scNumberField [(value)]="quantity" [min]="1" [max]="10">
      <div scNumberFieldScrubArea>
        <label scLabel>Quantity</label>
      </div>

      <div scNumberFieldGroup>
        <button scNumberFieldDecrement></button>
        <input scNumberFieldInput aria-label="Quantity" />
        <button scNumberFieldIncrement></button>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumberFieldUsageDemo {
  readonly quantity = signal<number | null>(5);
}`;
}
