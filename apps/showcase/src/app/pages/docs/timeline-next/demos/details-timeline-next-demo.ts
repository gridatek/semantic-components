import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScCollapsible,
  ScCollapsiblePanel,
  ScCollapsibleTrigger,
  ScTimelineNext,
  ScTimelineNextConnector,
  ScTimelineNextItem,
  ScTimelineNextMarker,
  ScTimelineNextTime,
  ScTimelineNextTitle,
} from '@semantic-components/ui';
import { SiChevronDownIcon } from '@semantic-icons/lucide-icons';

/** A changelog, each release with a Collapsible of its changes: Tab reaches the trigger after the event, the arrows still move between events. */
@Component({
  selector: 'app-details-timeline-next-demo',
  imports: [
    ScButton,
    ScCollapsible,
    ScCollapsibleTrigger,
    ScCollapsiblePanel,
    ScTimelineNext,
    ScTimelineNextItem,
    ScTimelineNextMarker,
    ScTimelineNextConnector,
    ScTimelineNextTitle,
    ScTimelineNextTime,
    SiChevronDownIcon,
  ],
  template: `
    <div scTimelineNext aria-label="Changelog" class="w-full max-w-md">
      @for (release of releases; track release.title) {
        <div scTimelineNextItem>
          <span scTimelineNextMarker></span>
          <span scTimelineNextConnector></span>
          <h3 scTimelineNextTitle>{{ release.title }}</h3>
          <time scTimelineNextTime [attr.datetime]="release.datetime">
            {{ release.date }}
          </time>
          <div scCollapsible class="mt-2">
            <button
              scButton
              scCollapsibleTrigger
              variant="ghost"
              size="sm"
              class="group -ms-2"
            >
              What changed
              <svg
                siChevronDownIcon
                class="transition-transform group-aria-expanded:rotate-180"
              ></svg>
            </button>
            <div scCollapsiblePanel>
              <ul class="text-muted-foreground list-disc ps-5 pt-1 text-sm">
                @for (change of release.changes; track change) {
                  <li>{{ change }}</li>
                }
              </ul>
            </div>
          </div>
        </div>
      }
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DetailsTimelineNextDemo {
  private readonly releases = [
    {
      title: 'Version 2.4',
      datetime: '2026-10-28',
      date: 'October 28',
      changes: ['Search results are cached.', 'Faster cold starts.'],
    },
    {
      title: 'Version 2.3',
      datetime: '2026-09-30',
      date: 'September 30',
      changes: ['A dark theme.', 'Keyboard shortcuts in the editor.'],
    },
    {
      title: 'Version 2.2',
      datetime: '2026-08-26',
      date: 'August 26',
      changes: ['Exports to CSV.', 'A fix for long file names.'],
    },
  ];
}
