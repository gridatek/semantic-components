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
import { TabsUsageDemo } from './tabs-usage-demo';

@Component({
  selector: 'app-tabs-usage-demo-container',
  imports: [
    ScCodeViewer,
    ScCodeViewerHeader,
    ScCodeViewerLabel,
    ScCodeViewerContent,
    ScButton,
    ScCopyToClipboard,
    SiCheckIcon,
    SiCopyIcon,
    TabsUsageDemo,
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
      <app-tabs-usage-demo />
    }
  `,
  host: { class: 'block w-full space-y-4' },
  encapsulation: ViewEncapsulation.None,
})
export class TabsUsageDemoContainer {
  private readonly config = inject(ConfigService);

  protected readonly devMode = this.config.devMode;

  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScTab, ScTabList, ScTabPanel, ScTabs } from '@semantic-components/ui';

@Component({
  selector: 'app-tabs-usage-demo',
  imports: [ScTabs, ScTabPanel, ScTabList, ScTab],
  template: \`
    <div scTabs class="w-[400px]">
      <div scTabList [selectedTab]="'account'" class="grid w-full grid-cols-2">
        <button scTab value="account">Account</button>
        <button scTab value="password">Password</button>
      </div>
      <div scTabPanel value="account">
        <p class="text-muted-foreground p-4 text-sm">
          Make changes to your account here.
        </p>
      </div>
      <div scTabPanel value="password">
        <p class="text-muted-foreground p-4 text-sm">
          Change your password here.
        </p>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class TabsUsageDemo {}`;
}
