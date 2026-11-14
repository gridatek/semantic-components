import { Dir } from '@angular/cdk/bidi';
import { Component, LOCALE_ID, ViewEncapsulation } from '@angular/core';
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
    Dir,
    ScMarker,
    ScMarkerIcon,
    ScMarkerContent,
    SiGitBranchIcon,
    SiSearchIcon,
  ],
  template: `
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
  `,
  providers: [{ provide: LOCALE_ID, useValue: 'ar' }],
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlMarkerDemo {}
