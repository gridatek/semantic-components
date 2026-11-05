import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RtlMarkerDemo } from './rtl-marker-demo';

@Component({
  selector: 'app-rtl-marker-demo-container',
  imports: [DemoContainer, RtlMarkerDemo],
  template: `
    <app-demo-container
      title="RTL"
      demoUrl="/demos/marker/rtl-marker-demo"
      [code]="code"
    >
      <app-rtl-marker-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlMarkerDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScMarker,
  ScMarkerContent,
  ScMarkerIcon,
} from '@semantic-components/ui';
import { SiGitBranchIcon, SiSearchIcon } from '@semantic-icons/lucide-icons';

/** In a right-to-left page: the icon on the right, the text after it. */
@Component({
  selector: 'app-rtl-marker-demo',
  imports: [
    ScMarker,
    ScMarkerIcon,
    ScMarkerContent,
    SiGitBranchIcon,
    SiSearchIcon,
  ],
  template: \`
    <div class="flex w-full max-w-sm flex-col gap-8 py-6" dir="rtl" lang="ar">
      <div scMarker>
        <span scMarkerIcon><svg siGitBranchIcon></svg></span>
        <span scMarkerContent>انتقل إلى فرع جديد</span>
      </div>
      <div scMarker variant="separator">
        <span scMarkerContent>اليوم</span>
      </div>
      <div scMarker variant="border">
        <span scMarkerIcon><svg siSearchIcon></svg></span>
        <span scMarkerContent>تمت مراجعة 8 ملفات</span>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlMarkerDemo {}`;
}
