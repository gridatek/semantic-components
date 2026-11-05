import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScMarker,
  ScMarkerContent,
  ScMarkerIcon,
} from '@semantic-components/ui';
import {
  SiBookOpenCheckIcon,
  SiGitBranchIcon,
  SiSearchIcon,
} from '@semantic-icons/lucide-icons';

/** scMarkerIcon beside the content — or above it, with flex-col. */
@Component({
  selector: 'app-icon-marker-demo',
  imports: [
    ScMarker,
    ScMarkerIcon,
    ScMarkerContent,
    SiGitBranchIcon,
    SiSearchIcon,
    SiBookOpenCheckIcon,
  ],
  template: `
    <div class="flex w-full max-w-sm flex-col gap-12 py-6">
      <div scMarker>
        <span scMarkerIcon><svg siGitBranchIcon></svg></span>
        <span scMarkerContent>Switched to a new branch</span>
      </div>
      <div scMarker variant="separator">
        <span scMarkerIcon><svg siSearchIcon></svg></span>
        <span scMarkerContent>Explored 4 files</span>
      </div>
      <div scMarker class="flex-col">
        <span scMarkerIcon><svg siBookOpenCheckIcon></svg></span>
        <span scMarkerContent>Syncing completed</span>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class IconMarkerDemo {}
