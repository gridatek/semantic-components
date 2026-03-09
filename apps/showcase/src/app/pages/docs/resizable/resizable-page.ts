import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { HorizontalResizableDemoContainer } from './demos/horizontal-resizable-demo-container';
import { IdeLayoutResizableDemoContainer } from './demos/ide-layout-resizable-demo-container';
import { NestedResizableDemoContainer } from './demos/nested-resizable-demo-container';
import { ThreePanelsResizableDemoContainer } from './demos/three-panels-resizable-demo-container';
import { VerticalResizableDemoContainer } from './demos/vertical-resizable-demo-container';
import { WithHandleResizableDemoContainer } from './demos/with-handle-resizable-demo-container';

@Component({
  selector: 'app-resizable-page',
  imports: [
    HorizontalResizableDemoContainer,
    VerticalResizableDemoContainer,
    WithHandleResizableDemoContainer,
    ThreePanelsResizableDemoContainer,
    NestedResizableDemoContainer,
    IdeLayoutResizableDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Resizable</h1>
        <p class="text-muted-foreground">
          Accessible resizable panel groups and layouts with keyboard support.
        </p>
        <app-component-badges path="resizable" />
      </div>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-horizontal-resizable-demo-container />
        <app-vertical-resizable-demo-container />
        <app-with-handle-resizable-demo-container />
        <app-three-panels-resizable-demo-container />
        <app-nested-resizable-demo-container />
        <app-ide-layout-resizable-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ResizablePage {}
