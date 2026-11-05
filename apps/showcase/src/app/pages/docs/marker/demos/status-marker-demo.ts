import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScMarker,
  ScMarkerContent,
  ScMarkerIcon,
  ScSpinner,
} from '@semantic-components/ui';
import { SiLoaderCircleIcon } from '@semantic-icons/lucide-icons';

/** Something in progress: role="status", so it is announced as it appears; a spinner as its icon. */
@Component({
  selector: 'app-status-marker-demo',
  imports: [
    ScMarker,
    ScMarkerIcon,
    ScMarkerContent,
    ScSpinner,
    SiLoaderCircleIcon,
  ],
  template: `
    <div class="flex w-full max-w-sm flex-col gap-8 py-6">
      <div scMarker role="status">
        <span scMarkerIcon
          ><svg scSpinner siLoaderCircleIcon aria-label="Compacting"></svg
        ></span>
        <span scMarkerContent>Compacting conversation</span>
      </div>
      <div scMarker variant="separator" role="status">
        <span scMarkerIcon
          ><svg scSpinner siLoaderCircleIcon aria-label="Running"></svg
        ></span>
        <span scMarkerContent>Running tests</span>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class StatusMarkerDemo {}
