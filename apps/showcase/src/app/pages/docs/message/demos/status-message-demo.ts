import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScBubble,
  ScBubbleContent,
  ScMarker,
  ScMarkerContent,
  ScMarkerIcon,
  ScMessage,
  ScMessageContent,
  ScSpinner,
} from '@semantic-components/ui';
import { SiLoaderCircleIcon } from '@semantic-icons/lucide-icons';

/** A message in progress: a Marker with role="status", announced as it appears. */
@Component({
  selector: 'app-status-message-demo',
  imports: [
    ScBubble,
    ScBubbleContent,
    ScMarker,
    ScMarkerContent,
    ScMarkerIcon,
    ScMessage,
    ScMessageContent,
    ScSpinner,
    SiLoaderCircleIcon,
  ],
  template: `
    <div class="flex w-full max-w-sm flex-col gap-8 py-6">
      <div scMessage align="end">
        <div scMessageContent>
          <div scBubble>
            <div scBubbleContent>Why did the deploy fail?</div>
          </div>
        </div>
      </div>
      <div scMessage>
        <div scMarker role="status">
          <span scMarkerIcon>
            <svg scSpinner siLoaderCircleIcon aria-label="Checking"></svg>
          </span>
          <span scMarkerContent>Checking the logs...</span>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class StatusMessageDemo {}
