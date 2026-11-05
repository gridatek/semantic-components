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
import { MarkerUsageDemo } from './marker-usage-demo';

@Component({
  selector: 'app-marker-usage-demo-container',
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
    MarkerUsageDemo,
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
        <app-marker-usage-demo />
      </app-dev-only>
    }
  `,
  host: { class: 'block w-full space-y-4' },
  encapsulation: ViewEncapsulation.None,
})
export class MarkerUsageDemoContainer {
  private readonly config = inject(ConfigService);

  protected readonly devMode = this.config.devMode;

  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScMarker,
  ScMarkerContent,
  ScMarkerIcon,
  ScSpinner,
} from '@semantic-components/ui';
import {
  SiGitBranchIcon,
  SiLoaderCircleIcon,
  SiSearchIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-marker-usage-demo',
  imports: [
    ScMarker,
    ScMarkerIcon,
    ScMarkerContent,
    ScSpinner,
    SiGitBranchIcon,
    SiLoaderCircleIcon,
    SiSearchIcon,
  ],
  template: \`
    <div class="flex w-full max-w-sm flex-col gap-8 py-6">
      <div scMarker>
        <span scMarkerIcon><svg siGitBranchIcon></svg></span>
        <span scMarkerContent>Switched to a new branch</span>
      </div>
      <div scMarker role="status">
        <span scMarkerIcon
          ><svg scSpinner siLoaderCircleIcon aria-label="Thinking"></svg
        ></span>
        <span scMarkerContent class="shimmer motion-reduce:shimmer-none"
          >Thinking...</span
        >
      </div>
      <div scMarker variant="separator">
        <span scMarkerContent>Conversation compacted</span>
      </div>
      <div scMarker>
        <span scMarkerIcon><svg siSearchIcon></svg></span>
        <span scMarkerContent>Explored 4 files</span>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class MarkerUsageDemo {}`;
}
