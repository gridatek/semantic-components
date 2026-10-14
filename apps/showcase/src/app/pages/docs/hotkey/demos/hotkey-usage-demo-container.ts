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
import { HotkeyUsageDemo } from './hotkey-usage-demo';

@Component({
  selector: 'app-hotkey-usage-demo-container',
  imports: [
    ScCodeViewer,
    ScCodeViewerHeader,
    ScCodeViewerLabel,
    ScCodeViewerContent,
    ScButton,
    ScCopyToClipboard,
    SiCheckIcon,
    SiCopyIcon,
    HotkeyUsageDemo,
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
      <app-hotkey-usage-demo />
    }
  `,
  host: { class: 'block w-full space-y-4' },
  encapsulation: ViewEncapsulation.None,
})
export class HotkeyUsageDemoContainer {
  private readonly config = inject(ConfigService);

  protected readonly devMode = this.config.devMode;

  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScHotkey, ScKbd } from '@semantic-components/ui';

@Component({
  selector: 'app-hotkey-usage-demo',
  imports: [ScHotkey, ScKbd],
  template: \`
    <p class="text-sm">
      Press
      <kbd
        scKbd
        scHotkey="alt+k"
        #hotkey="scHotkey"
        (scHotkeyPressed)="count.set(count() + 1)"
      >
        {{ hotkey.displayKey() }}
      </kbd>
      : pressed {{ count() }} times.
    </p>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class HotkeyUsageDemo {
  protected readonly count = signal(0);
}`;
}
