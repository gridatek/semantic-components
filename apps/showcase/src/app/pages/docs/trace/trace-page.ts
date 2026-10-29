import { Component, ViewEncapsulation } from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { BasicTraceDemoContainer } from './demos/basic-trace-demo-container';
import { CollapsibleTraceDemoContainer } from './demos/collapsible-trace-demo-container';
import { DescriptionTraceDemoContainer } from './demos/description-trace-demo-container';
import { LinkTraceDemoContainer } from './demos/link-trace-demo-container';
import { RtlTraceDemoContainer } from './demos/rtl-trace-demo-container';
import { StatusTraceDemoContainer } from './demos/status-trace-demo-container';

@Component({
  selector: 'app-trace-page',
  imports: [
    BasicTraceDemoContainer,
    StatusTraceDemoContainer,
    DescriptionTraceDemoContainer,
    CollapsibleTraceDemoContainer,
    LinkTraceDemoContainer,
    RtlTraceDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Trace</h1>
        <p class="text-muted-foreground">
          The steps of a run — an agent's searches, reads and commands — a line
          each, with a status, a detail, and the output it opens on. A line is
          text on its own; inside a link or a button, it becomes one. Its title
          says what happened, its status too: the color and the shimmer aren't
          read out.
        </p>
        <app-component-badges path="trace" />
      </div>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-basic-trace-demo-container />
        <app-status-trace-demo-container />
        <app-description-trace-demo-container />
        <app-collapsible-trace-demo-container />
        <app-link-trace-demo-container />
        <app-rtl-trace-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class TracePage {}
