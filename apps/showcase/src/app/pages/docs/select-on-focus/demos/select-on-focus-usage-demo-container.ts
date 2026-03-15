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
import { SelectOnFocusUsageDemo } from './select-on-focus-usage-demo';

@Component({
  selector: 'app-select-on-focus-usage-demo-container',
  imports: [
    ScCodeViewer,
    ScCodeViewerHeader,
    ScCodeViewerLabel,
    ScCodeViewerContent,
    ScButton,
    ScCopyToClipboard,
    SiCheckIcon,
    SiCopyIcon,
    SelectOnFocusUsageDemo,
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
        <app-select-on-focus-usage-demo />
      </div>
    }
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectOnFocusUsageDemoContainer {
  private readonly config = inject(ConfigService);

  protected readonly devMode = this.config.devMode;

  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScField,
  ScInput,
  ScLabel,
  ScSelectOnFocus,
} from '@semantic-components/ui';

@Component({
  selector: 'app-select-on-focus-usage-demo',
  imports: [ScSelectOnFocus, ScInput, ScField, ScLabel],
  template: \`
    <div scField>
      <label scLabel>Text</label>
      <input scInput scSelectOnFocus value="Text to select" />
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectOnFocusUsageDemo {}`;
}
