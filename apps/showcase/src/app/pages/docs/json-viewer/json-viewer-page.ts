import { Component, ViewEncapsulation } from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { BasicJsonViewerDemoContainer } from './demos/basic-json-viewer-demo-container';
import { ControlsJsonViewerDemoContainer } from './demos/controls-json-viewer-demo-container';
import { LargeJsonViewerDemoContainer } from './demos/large-json-viewer-demo-container';
import { RtlJsonViewerDemoContainer } from './demos/rtl-json-viewer-demo-container';
import { SummaryJsonViewerDemoContainer } from './demos/summary-json-viewer-demo-container';
import { TypesJsonViewerDemoContainer } from './demos/types-json-viewer-demo-container';

@Component({
  selector: 'app-json-viewer-page',
  imports: [
    BasicJsonViewerDemoContainer,
    SummaryJsonViewerDemoContainer,
    LargeJsonViewerDemoContainer,
    ControlsJsonViewerDemoContainer,
    TypesJsonViewerDemoContainer,
    RtlJsonViewerDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>JSON Viewer</h1>
        <p class="text-muted-foreground">
          A JSON value as a tree: keys and values coloured by type, objects and
          arrays that open and close, long arrays split into ranges. One Tab
          stop, then the arrow keys; type a key to jump to it, Ctrl/⌘+C copies
          the focused value.
        </p>
        <app-component-badges path="json-viewer" />
      </div>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-basic-json-viewer-demo-container />
        <app-summary-json-viewer-demo-container />
        <app-large-json-viewer-demo-container />
        <app-controls-json-viewer-demo-container />
        <app-types-json-viewer-demo-container />
        <app-rtl-json-viewer-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class JsonViewerPage {}
