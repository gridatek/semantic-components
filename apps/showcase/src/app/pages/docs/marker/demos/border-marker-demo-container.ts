import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BorderMarkerDemo } from './border-marker-demo';

@Component({
  selector: 'app-border-marker-demo-container',
  imports: [DemoContainer, BorderMarkerDemo],
  template: `
    <app-demo-container
      title="Border"
      demoUrl="/demos/marker/border-marker-demo"
      [code]="code"
    >
      <app-border-marker-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class BorderMarkerDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScMarker,
  ScMarkerContent,
  ScMarkerIcon,
} from '@semantic-components/ui';
import {
  SiFileTextIcon,
  SiGitBranchIcon,
  SiSearchIcon,
} from '@semantic-icons/lucide-icons';

/** Status rows, each with a line under it. */
@Component({
  selector: 'app-border-marker-demo',
  imports: [
    ScMarker,
    ScMarkerIcon,
    ScMarkerContent,
    SiGitBranchIcon,
    SiSearchIcon,
    SiFileTextIcon,
  ],
  template: \`
    <div class="flex w-full max-w-sm flex-col gap-3 py-6">
      <div scMarker variant="border">
        <span scMarkerIcon><svg siGitBranchIcon></svg></span>
        <span scMarkerContent>Switched to release-candidate</span>
      </div>
      <div scMarker variant="border">
        <span scMarkerIcon><svg siSearchIcon></svg></span>
        <span scMarkerContent>Reviewed 8 related files</span>
      </div>
      <div scMarker variant="border">
        <span scMarkerIcon><svg siFileTextIcon></svg></span>
        <span scMarkerContent>Opened implementation notes</span>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class BorderMarkerDemo {}`;
}
