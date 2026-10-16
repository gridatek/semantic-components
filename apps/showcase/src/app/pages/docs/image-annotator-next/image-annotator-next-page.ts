import { Component, ViewEncapsulation } from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { EditorImageAnnotatorNextDemoContainer } from './demos/editor-image-annotator-next-demo-container';
import { ReadOnlyImageAnnotatorNextDemoContainer } from './demos/read-only-image-annotator-next-demo-container';
import { ReviewImageAnnotatorNextDemoContainer } from './demos/review-image-annotator-next-demo-container';

@Component({
  selector: 'app-image-annotator-next-page',
  imports: [
    EditorImageAnnotatorNextDemoContainer,
    ReviewImageAnnotatorNextDemoContainer,
    ReadOnlyImageAnnotatorNextDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Image Annotator Next</h1>
        <p class="text-muted-foreground">
          The image annotator, rebuilt: annotations are shapes over your image,
          not pixels — selected, moved, resized, restyled and deleted, with the
          pointer or the keyboard — kept as data, and exported as an image.
        </p>
        <app-component-badges path="image-annotator-next" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Editor</h2>
        <p class="text-muted-foreground">
          Every tool. Select an annotation to move it, resize it by its handles,
          or restyle it with a colour or the width. From the keyboard: Enter on
          the image places a shape; on an annotation, the arrows move it, Alt +
          arrows resize it, Delete removes it. Ctrl+Z undoes.
        </p>
        <app-editor-image-annotator-next-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Review a screenshot</h2>
        <p class="text-muted-foreground">
          A few tools, and annotations given as data — to save, send and show
          again.
        </p>
        <app-review-image-annotator-next-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Read only</h2>
        <p class="text-muted-foreground">
          The same annotations, shown: each one is still named and reached with
          Tab.
        </p>
        <app-read-only-image-annotator-next-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class ImageAnnotatorNextPage {}
