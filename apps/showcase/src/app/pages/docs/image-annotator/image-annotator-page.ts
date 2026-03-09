import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { BasicImageAnnotatorDemoContainer } from './demos/basic-image-annotator-demo-container';
import { CustomSizeImageAnnotatorDemoContainer } from './demos/custom-size-image-annotator-demo-container';

@Component({
  selector: 'app-image-annotator-page',
  imports: [
    BasicImageAnnotatorDemoContainer,
    CustomSizeImageAnnotatorDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>ImageAnnotator</h1>
        <p class="text-muted-foreground">
          Draw, mark up, and annotate images with various tools.
        </p>
        <app-component-badges path="image-annotator" />
      </div>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-basic-image-annotator-demo-container />
        <app-custom-size-image-annotator-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ImageAnnotatorPage {}
