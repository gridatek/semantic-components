import { Component, ViewEncapsulation } from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { BasicMarkerDemoContainer } from './demos/basic-marker-demo-container';

@Component({
  selector: 'app-marker-page',
  imports: [BasicMarkerDemoContainer, TocHeading, ComponentBadges, ScHeading],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Marker</h1>
        <p class="text-muted-foreground">
          Label a point in a list or feed — a date divider, an unread boundary,
          or a short inline note.
        </p>
        <app-component-badges path="marker" />
      </div>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-basic-marker-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class MarkerPage {}
