import { Component, ViewEncapsulation } from '@angular/core';
import { ScKbd, ScTypeset } from '@semantic-components/ui';
import { Anatomy } from '../../../components/anatomy/anatomy';
import {
  type ApiInput,
  ApiTable,
} from '../../../components/api-table/api-table';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { PartsTable } from '../../../components/parts-table/parts-table';
import { TocHeading } from '../../../components/toc/toc-heading';
import { AlternateTimelineDemoContainer } from './demos/alternate-timeline-demo-container';
import { DetailsTimelineDemoContainer } from './demos/details-timeline-demo-container';
import { FailureTimelineDemoContainer } from './demos/failure-timeline-demo-container';
import { FeedTimelineDemoContainer } from './demos/feed-timeline-demo-container';
import { HorizontalTimelineDemoContainer } from './demos/horizontal-timeline-demo-container';
import { RtlTimelineDemoContainer } from './demos/rtl-timeline-demo-container';
import { StatusTimelineDemoContainer } from './demos/status-timeline-demo-container';
import { TimelineUsageDemoContainer } from './demos/timeline-usage-demo-container';

@Component({
  selector: 'app-timeline-page',
  imports: [
    ScKbd,
    ScTypeset,
    Anatomy,
    ApiTable,
    PartsTable,
    TocHeading,
    ComponentBadges,
    TimelineUsageDemoContainer,
    HorizontalTimelineDemoContainer,
    AlternateTimelineDemoContainer,
    FailureTimelineDemoContainer,
    StatusTimelineDemoContainer,
    DetailsTimelineDemoContainer,
    FeedTimelineDemoContainer,
    RtlTimelineDemoContainer,
  ],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>Timeline</h1>
        <p class="text-muted-foreground">
          Dated events in order — an activity feed, a changelog, an order&apos;s
          steps: a list for screen readers, one tab stop, the arrow keys between
          events.
        </p>
        <app-component-badges path="timeline" />
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Usage</h2>
        <app-timeline-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Anatomy</h2>
        <p>
          Every part inside an event is optional: a marker on the line, the line
          to the next event, a title, a time, a description — and anything of
          yours (a link, a collapsible).
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Status</h2>
        <p>
          For a process, give each event a
          <code scTypeset>status</code>: <code scTypeset>complete</code>,
          <code scTypeset>current</code>, <code scTypeset>upcoming</code> or
          <code scTypeset>failed</code>. Its marker is filled, ringed, muted or
          in the destructive colour, the line after a complete event is the
          primary colour, and the current event is the step (aria-current) where
          focus starts. Style by state from the item&apos;s data-complete,
          data-current, data-upcoming, data-failed, data-first and data-last;
          --sc-timeline-index numbers the events, --sc-timeline-count counts
          them, --sc-timeline-marker sizes the markers.
        </p>
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Accessibility</h2>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            A list (a feed with <code scTypeset>feed</code>, its events
            articles): name it. Each event is named by its title and described
            by its time and description; markers and lines are hidden.
          </li>
          <li>
            One tab stop: <kbd scKbd>Tab</kbd> enters on the current event, else
            the first, then on the one focused last. <kbd scKbd>↑</kbd>
            <kbd scKbd>↓</kbd> move between events (<kbd scKbd>←</kbd>
            <kbd scKbd>→</kbd> across, mirrored right to left),
            <kbd scKbd>Home</kbd> and <kbd scKbd>End</kbd> to the first and
            last; <kbd scKbd>Tab</kbd> goes on to the links and buttons inside
            an event.
          </li>
          <li>
            In a feed, <kbd scKbd>Page Up</kbd> and
            <kbd scKbd>Page Down</kbd> move between articles from anywhere in
            one; it is busy while more load.
          </li>
          <li>
            A status shown only by the marker is seen, not read: say it in the
            title or description too.
          </li>
          <li>
            Put the time in a <code scTypeset>&lt;time&gt;</code> with its
            datetime: machine-readable, its text in your words.
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scTypeset appToc>Examples</h2>
        <app-horizontal-timeline-demo-container />
        <app-alternate-timeline-demo-container />
        <app-status-timeline-demo-container />
        <app-failure-timeline-demo-container />
        <app-details-timeline-demo-container />
        <app-feed-timeline-demo-container />
        <app-rtl-timeline-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>API reference</h2>
        <p>
          Each part takes
          <code scTypeset>class</code>, merged over its own (cn: a later class
          wins).
        </p>
        <app-parts-table label="Timeline parts" [parts]="parts" />
        <app-api-table label="ScTimeline inputs" [inputs]="rootInputs" />
        <app-api-table label="ScTimelineItem inputs" [inputs]="itemInputs" />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class TimelinePage {
  private readonly anatomy = {
    imports: [
      'import {',
      '  ScTimeline, ScTimelineItem, ScTimelineMarker, ScTimelineConnector,',
      '  ScTimelineOpposite, ScTimelineTitle, ScTimelineTime, ScTimelineDescription,',
      "} from '@semantic-components/ui';",
    ].join('\n'),
    markup: [
      '<div scTimeline aria-label="Activity">',
      '  <div scTimelineItem>',
      '    <span scTimelineMarker></span>',
      '    <span scTimelineConnector></span>',
      '    <div scTimelineOpposite>…</div>',
      '    <h3 scTimelineTitle>Deployed to production</h3>',
      '    <time scTimelineTime [value]="deployedAt"></time>',
      '    <p scTimelineDescription>Version 2.4.1 is live.</p>',
      '  </div>',
      '</div>',
    ].join('\n'),
  };

  private readonly parts = [
    {
      name: 'ScTimeline',
      selector: '[scTimeline]',
      description:
        'A list (a feed with feed), named by you; one tab stop for its events. exportAs scTimeline: focus(value?).',
    },
    {
      name: 'ScTimelineItem',
      selector: '[scTimelineItem]',
      description:
        'An event: a list item (an article in a feed), named by its title, described by its time and description; aria-current="step" when current.',
    },
    {
      name: 'ScTimelineMarker',
      selector: '[scTimelineMarker]',
      description:
        'The dot on the line, or your icon in it: filled, ringed when current, muted when upcoming. Hidden.',
    },
    {
      name: 'ScTimelineConnector',
      selector: '[scTimelineConnector]',
      description:
        'The line to the next event: primary after a complete one, none after the last. Hidden.',
    },
    {
      name: 'ScTimelineOpposite',
      selector: '[scTimelineOpposite]',
      description:
        'Across the line from the content — a date, a year: on the other side (vertical; the line stays straight), above the content (across).',
    },
    {
      name: 'ScTimelineTitle',
      selector: '[scTimelineTitle]',
      description: 'The event’s title, on your heading: names the event.',
    },
    {
      name: 'ScTimelineTime',
      selector: 'time[scTimelineTime]',
      description:
        'Your <time>: [value] a Temporal date or moment, written in the locale (options), its datetime set — or your words with a datetime. Describes the event.',
    },
    {
      name: 'ScTimelineDescription',
      selector: '[scTimelineDescription]',
      description: 'What happened, in more words. Describes the event.',
    },
  ];

  private readonly rootInputs: ApiInput[] = [
    {
      name: 'alignment',
      type: "'start' | 'end' | 'alternate'",
      default: "'start'",
      description:
        'Vertical: the events after the line, before it, or in turn (the line in the middle).',
    },
    {
      name: 'orientation',
      type: "'vertical' | 'horizontal'",
      default: "'vertical'",
      description:
        'Which way the events run, and which arrows move; across, it scrolls when narrow.',
    },
    {
      name: 'loop',
      type: 'boolean',
      default: 'true',
      description: 'The arrows wrap from the last event to the first.',
    },
    {
      name: 'feed',
      type: 'boolean',
      default: 'false',
      description: 'A feed of articles that loads more.',
    },
    {
      name: 'busy',
      type: 'boolean',
      default: 'false',
      description: 'Loading more (aria-busy), in a feed.',
    },
  ];

  private readonly itemInputs: ApiInput[] = [
    {
      name: 'status',
      type: "'complete' | 'current' | 'upcoming' | 'failed'",
      default: 'none',
      description: 'Where it is in a process.',
    },
    {
      name: 'value',
      type: 'string',
      default: 'generated',
      description: 'Names the event for focus(value).',
    },
  ];
}
