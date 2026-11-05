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
import { MessageUsageDemo } from './message-usage-demo';

@Component({
  selector: 'app-message-usage-demo-container',
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
    MessageUsageDemo,
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
        <app-message-usage-demo />
      </app-dev-only>
    }
  `,
  host: { class: 'block w-full space-y-4' },
  encapsulation: ViewEncapsulation.None,
})
export class MessageUsageDemoContainer {
  private readonly config = inject(ConfigService);

  protected readonly devMode = this.config.devMode;

  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScAvatar,
  ScAvatarFallback,
  ScBubble,
  ScBubbleContent,
  ScMessage,
  ScMessageAvatar,
  ScMessageContent,
  ScMessageFooter,
  ScMessageHeader,
} from '@semantic-components/ui';

@Component({
  selector: 'app-message-usage-demo',
  imports: [
    ScAvatar,
    ScAvatarFallback,
    ScBubble,
    ScBubbleContent,
    ScMessage,
    ScMessageAvatar,
    ScMessageContent,
    ScMessageFooter,
    ScMessageHeader,
  ],
  template: \`
    <div class="flex w-full max-w-sm flex-col gap-6 py-6">
      <div scMessage>
        <div scMessageAvatar>
          <span scAvatar><span scAvatarFallback>OM</span></span>
        </div>
        <div scMessageContent>
          <div scMessageHeader>Olivia</div>
          <div scBubble variant="muted">
            <div scBubbleContent>
              The build failed during dependency installation.
            </div>
          </div>
        </div>
      </div>
      <div scMessage align="end">
        <div scMessageAvatar>
          <span scAvatar><span scAvatarFallback>ME</span></span>
        </div>
        <div scMessageContent>
          <div scBubble>
            <div scBubbleContent>Can you share the exact error?</div>
          </div>
          <div scMessageFooter>Read 10:42</div>
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class MessageUsageDemo {}`;
}
