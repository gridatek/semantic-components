import { Component, ViewEncapsulation } from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { BasicAttachmentDemoContainer } from './demos/basic-attachment-demo-container';

@Component({
  selector: 'app-attachment-page',
  imports: [
    BasicAttachmentDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Attachment</h1>
        <p class="text-muted-foreground">
          Show a file alongside its upload state, on its own or in a scrollable
          row.
        </p>
        <app-component-badges path="attachment" />
      </div>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-basic-attachment-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class AttachmentPage {}
