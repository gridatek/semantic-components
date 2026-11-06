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
import { ResizableNextUsageDemo } from './resizable-next-usage-demo';

@Component({
  selector: 'app-resizable-next-usage-demo-container',
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
    ResizableNextUsageDemo,
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
        <app-resizable-next-usage-demo />
      </app-dev-only>
    }
  `,
  host: { class: 'block w-full space-y-4' },
  encapsulation: ViewEncapsulation.None,
})
export class ResizableNextUsageDemoContainer {
  private readonly config = inject(ConfigService);

  protected readonly devMode = this.config.devMode;

  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScFrame,
  ScResizableHandleNext,
  ScResizableHandleNextGrip,
  ScResizablePanelGroupNext,
  ScResizablePanelNext,
} from '@semantic-components/ui';

@Component({
  selector: 'app-resizable-next-usage-demo',
  imports: [
    ScFrame,
    ScResizableHandleNext,
    ScResizableHandleNextGrip,
    ScResizablePanelGroupNext,
    ScResizablePanelNext,
  ],
  template: \`
    <div scResizablePanelGroupNext scFrame class="max-w-sm">
      <div scResizablePanelNext [defaultSize]="50">
        <div class="flex h-[200px] items-center justify-center p-6">
          <span class="font-semibold">One</span>
        </div>
      </div>
      <div scResizableHandleNext aria-label="Resize One">
        <div scResizableHandleNextGrip></div>
      </div>
      <div scResizablePanelNext [defaultSize]="50">
        <div scResizablePanelGroupNext orientation="vertical">
          <div scResizablePanelNext [defaultSize]="25">
            <div class="flex h-full items-center justify-center p-6">
              <span class="font-semibold">Two</span>
            </div>
          </div>
          <div scResizableHandleNext aria-label="Resize Two">
            <div scResizableHandleNextGrip></div>
          </div>
          <div scResizablePanelNext [defaultSize]="75">
            <div class="flex h-full items-center justify-center p-6">
              <span class="font-semibold">Three</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ResizableNextUsageDemo {}`;
}
