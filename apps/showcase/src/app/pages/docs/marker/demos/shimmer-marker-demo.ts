import { Component, ViewEncapsulation } from '@angular/core';
import { ScMarker, ScMarkerContent } from '@semantic-components/ui';

/** Streaming text: the shimmer utility on the content — stopped when motion is reduced. */
@Component({
  selector: 'app-shimmer-marker-demo',
  imports: [ScMarker, ScMarkerContent],
  template: `
    <div class="flex w-full max-w-sm flex-col gap-8 py-6">
      <div scMarker role="status">
        <span scMarkerContent class="shimmer motion-reduce:shimmer-none"
          >Thinking...</span
        >
      </div>
      <div scMarker variant="separator" role="status">
        <span scMarkerContent class="shimmer motion-reduce:shimmer-none"
          >Reading 4 files</span
        >
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ShimmerMarkerDemo {}
