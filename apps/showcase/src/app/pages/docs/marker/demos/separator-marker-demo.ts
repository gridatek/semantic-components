import { Component, ViewEncapsulation } from '@angular/core';
import { ScMarker, ScMarkerContent } from '@semantic-components/ui';

/** A labeled divider — a date, a section — in a conversation. No role="separator": its label would be lost. */
@Component({
  selector: 'app-separator-marker-demo',
  imports: [ScMarker, ScMarkerContent],
  template: `
    <div class="flex w-full max-w-sm flex-col gap-8 py-6">
      <div scMarker variant="separator">
        <span scMarkerContent>Today</span>
      </div>
      <div scMarker variant="separator">
        <span scMarkerContent>Worked for 42s</span>
      </div>
      <div scMarker variant="separator">
        <span scMarkerContent>Conversation compacted</span>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SeparatorMarkerDemo {}
