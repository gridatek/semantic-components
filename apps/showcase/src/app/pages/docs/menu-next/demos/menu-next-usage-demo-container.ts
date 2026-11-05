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
import { MenuNextUsageDemo } from './menu-next-usage-demo';

@Component({
  selector: 'app-menu-next-usage-demo-container',
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
    MenuNextUsageDemo,
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
        <app-menu-next-usage-demo />
      </app-dev-only>
    }
  `,
  host: { class: 'block w-full space-y-4' },
  encapsulation: ViewEncapsulation.None,
})
export class MenuNextUsageDemoContainer {
  private readonly config = inject(ConfigService);

  protected readonly devMode = this.config.devMode;

  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScMenuNext,
  ScMenuNextContent,
  ScMenuNextGroup,
  ScMenuNextItem,
  ScMenuNextLabel,
  ScMenuNextPortal,
  ScMenuNextProvider,
  ScMenuNextSeparator,
  ScMenuNextTrigger,
} from '@semantic-components/ui';

@Component({
  selector: 'app-menu-next-usage-demo',
  imports: [
    ScButton,
    ScMenuNext,
    ScMenuNextContent,
    ScMenuNextGroup,
    ScMenuNextItem,
    ScMenuNextLabel,
    ScMenuNextPortal,
    ScMenuNextProvider,
    ScMenuNextSeparator,
    ScMenuNextTrigger,
  ],
  template: \`
    <div scMenuNextProvider>
      <button scButton scMenuNextTrigger variant="outline">Open</button>
      <ng-template scMenuNextPortal>
        <div scMenuNext>
          <ng-template scMenuNextContent>
            <div scMenuNextGroup>
              <div scMenuNextLabel>My Account</div>
              <div scMenuNextItem value="Profile">Profile</div>
              <div scMenuNextItem value="Billing">Billing</div>
              <div scMenuNextItem value="Settings">Settings</div>
            </div>
            <div scMenuNextSeparator></div>
            <div scMenuNextItem value="Log out" variant="destructive">
              Log out
            </div>
          </ng-template>
        </div>
      </ng-template>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class MenuNextUsageDemo {}`;
}
