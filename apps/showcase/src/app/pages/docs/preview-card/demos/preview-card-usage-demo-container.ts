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
import { PreviewCardUsageDemo } from './preview-card-usage-demo';

@Component({
  selector: 'app-preview-card-usage-demo-container',
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
    PreviewCardUsageDemo,
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
        <app-preview-card-usage-demo />
      </app-dev-only>
    }
  `,
  host: { class: 'block w-full space-y-4' },
  encapsulation: ViewEncapsulation.None,
})
export class PreviewCardUsageDemoContainer {
  private readonly config = inject(ConfigService);

  protected readonly devMode = this.config.devMode;

  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScLink,
  ScPreviewCard,
  ScPreviewCardPortal,
  ScPreviewCardProvider,
  ScPreviewCardTrigger,
} from '@semantic-components/ui';

@Component({
  selector: 'app-preview-card-usage-demo',
  imports: [
    ScPreviewCard,
    ScPreviewCardPortal,
    ScPreviewCardProvider,
    ScPreviewCardTrigger,
    ScLink,
  ],
  template: \`
    <div scPreviewCardProvider>
      <a
        scLink
        variant="link"
        href="https://nextjs.org"
        scPreviewCardTrigger
        [delay]="10"
        [closeDelay]="100"
      >
        Hover Here
      </a>
      <ng-template scPreviewCardPortal>
        <div scPreviewCard class="flex w-64 flex-col gap-0.5">
          <div class="font-semibold">@nextjs</div>
          <div>The React Framework – created and maintained by @vercel.</div>
          <div class="text-muted-foreground mt-1 text-xs">
            Joined December 2021
          </div>
        </div>
      </ng-template>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class PreviewCardUsageDemo {}`;
}
