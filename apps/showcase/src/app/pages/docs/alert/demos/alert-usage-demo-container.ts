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
import { AlertUsageDemo } from './alert-usage-demo';

@Component({
  selector: 'app-alert-usage-demo-container',
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
    AlertUsageDemo,
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
        <app-alert-usage-demo />
      </app-dev-only>
    }
  `,
  host: { class: 'block w-full space-y-4' },
  encapsulation: ViewEncapsulation.None,
})
export class AlertUsageDemoContainer {
  private readonly config = inject(ConfigService);

  protected readonly devMode = this.config.devMode;

  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScAlert,
  ScAlertDescription,
  ScAlertTitle,
} from '@semantic-components/ui';
import { SiCircleCheckIcon, SiInfoIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-alert-usage-demo',
  imports: [
    ScAlert,
    ScAlertDescription,
    ScAlertTitle,
    SiCircleCheckIcon,
    SiInfoIcon,
  ],
  template: \`
    <div class="grid w-full max-w-md items-start gap-4">
      <div scAlert>
        <svg siCircleCheckIcon></svg>
        <div scAlertTitle>Payment successful</div>
        <div scAlertDescription>
          Your payment of $29.99 has been processed. A receipt has been sent to
          your email address.
        </div>
      </div>
      <div scAlert>
        <svg siInfoIcon></svg>
        <div scAlertTitle>New feature available</div>
        <div scAlertDescription>
          We&apos;ve added dark mode support. You can enable it in your account
          settings.
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class AlertUsageDemo {}`;
}
