import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { BasicImageAnnotatorDemoContainer } from './demos/basic-image-annotator-demo-container';
import { CustomSizeImageAnnotatorDemoContainer } from './demos/custom-size-image-annotator-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentStatusBadge } from '../../../components/component-status-badge/component-status-badge';
import { COMPONENTS } from '../../../data/components';

@Component({
  selector: 'app-image-annotator-page',
  imports: [
    BasicImageAnnotatorDemoContainer,
    CustomSizeImageAnnotatorDemoContainer,
    TocHeading,
    ComponentStatusBadge,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">ImageAnnotator</h1>
        <p class="text-muted-foreground">
          Draw, mark up, and annotate images with various tools.
        </p>
        <app-component-status-badge [status]="componentStatus" />
      </div>

      <section class="space-y-8">
        <h2 toc class="text-xl font-semibold tracking-tight">Examples</h2>
        <app-basic-image-annotator-demo-container />
        <app-custom-size-image-annotator-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ImageAnnotatorPage {
  readonly componentStatus = COMPONENTS.find(
    (c) => c.path === 'image-annotator',
  )!.status;
}
