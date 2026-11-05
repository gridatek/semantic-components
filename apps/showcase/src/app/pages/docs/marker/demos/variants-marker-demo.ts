import { Component, ViewEncapsulation } from '@angular/core';
import { ScMarker, ScMarkerContent } from '@semantic-components/ui';

/** variant: default (inline notes), separator (a label between lines), border (a row with a line under it). */
@Component({
  selector: 'app-variants-marker-demo',
  imports: [ScMarker, ScMarkerContent],
  template: `
    <div class="flex w-full max-w-sm flex-col gap-8 py-6">
      <div scMarker>
        <span scMarkerContent>A default marker for inline notes.</span>
      </div>
      <div scMarker variant="separator">
        <span scMarkerContent>A separator marker</span>
      </div>
      <div scMarker variant="border">
        <span scMarkerContent>A border marker for row boundaries.</span>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class VariantsMarkerDemo {}
