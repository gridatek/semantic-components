import { Component, ViewEncapsulation } from '@angular/core';
import { UsageCode } from '../../../../components/usage-code/usage-code';
import { MarkerUsageDemo } from './marker-usage-demo';

@Component({
  selector: 'app-marker-usage-demo-container',
  imports: [UsageCode, MarkerUsageDemo],
  template: `
    <app-usage-code [code]="code">
      <ng-template><app-marker-usage-demo /></ng-template>
    </app-usage-code>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class MarkerUsageDemoContainer {
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
